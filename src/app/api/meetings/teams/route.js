import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

async function getAppToken() {
  const tenant = requireEnv('MS_TENANT_ID');
  const params = new URLSearchParams();
  params.append('client_id', requireEnv('MS_CLIENT_ID'));
  params.append('client_secret', requireEnv('MS_CLIENT_SECRET'));
  params.append('grant_type', 'client_credentials');
  params.append('scope', 'https://graph.microsoft.com/.default');

  const res = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Token error ${res.status}: ${text}`);
  return JSON.parse(text);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name = 'Guest', startISO, durationMinutes = 30 } = body || {};
    if (!startISO) {
      return NextResponse.json({ error: 'Missing startISO' }, { status: 400 });
    }

    const start = new Date(startISO);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    const { access_token } = await getAppToken();

    const organizer = requireEnv('MS_TEAMS_ORGANIZER'); // must be a UPN/email in your tenant
    const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(organizer)}/onlineMeetings`;

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: `Meeting with ${name}`,
        startDateTime: start.toISOString(), // UTC
        endDateTime: end.toISOString()
      })
    });

    const raw = await resp.text();
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch { data = { raw }; }

    if (!resp.ok) {
      const hint =
        data?.error?.message ||
        data?.message ||
        data?.raw ||
        `Graph error ${resp.status}`;
      // return full payload so the client can display it
      return NextResponse.json({ error: 'Teams API error', detail: hint, graph: data }, { status: resp.status });
    }

    return NextResponse.json({
      joinUrl: data.joinWebUrl,
      startISO: data.startDateTime,
      endISO: data.endDateTime
    });
  } catch (err) {
    console.error('Teams create error:', err);
    return NextResponse.json({ error: 'Teams API error', detail: `${err.message}` }, { status: 500 });
  }
}

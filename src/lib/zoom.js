// /lib/zoom.js
export async function getZoomAccessToken() {
  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error('Missing Zoom credentials in env');
  }

  const basic = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

  const body = new URLSearchParams({
    grant_type: 'account_credentials',
    account_id: ZOOM_ACCOUNT_ID,
  }).toString();

  const res = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Zoom token error: ${res.status} ${t}`);
  }
  const data = await res.json();
  return data.access_token; // ~3600s
}

function toZoomStartTime(iso) {
  // Zoom milliseconds পছন্দ করে না
  const d = new Date(iso);
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export async function createZoomMeeting({ topic, startISO, durationMinutes = 30, timezone = 'UTC' }) {
  const token = await getZoomAccessToken();

  const body = {
    topic,
    type: 2, // scheduled
    start_time: toZoomStartTime(startISO),
    duration: durationMinutes,
    timezone,
    settings: {
      join_before_host: true,
      approval_type: 2,
      waiting_room: false,
      mute_upon_entry: true,
    },
  };

  const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Zoom create error: ${res.status} ${t}`);
  }
  const data = await res.json();
  return {
    meetingId: data.id,
    joinUrl: data.join_url,   // user link
    startUrl: data.start_url, // owner/host link
    password: data.password || '',
    startISO: new Date(startISO).toISOString(),
  };
}

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

function getOAuth2Client() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return oAuth2Client;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name = 'Guest',
      email,
      startISO,        // UTC ISO string (e.g. "2025-08-21T10:00:00.000Z")
      timeZone = 'UTC',// IANA tz from client (e.g. "Asia/Dhaka")
      durationMinutes = 30,
      notes = ''
    } = body || {};

    if (!email || !startISO) {
      return NextResponse.json({ error: 'Missing email or startISO' }, { status: 400 });
    }

    const start = new Date(startISO);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    const auth = getOAuth2Client();
    const calendar = google.calendar({ version: 'v3', auth });

    const eventRequest = {
      summary: `Meeting with ${name}`,
      description: `Booked from website contact form.\n\nName: ${name}\nEmail: ${email}\n${notes ? `Notes: ${notes}\n` : ''}`,
      attendees: [{ email }],
      start: { dateTime: start.toISOString(), timeZone },
      end: { dateTime: end.toISOString(), timeZone },
      conferenceData: {
        createRequest: {
          requestId: uuidv4(),
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    };

    const insert = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      conferenceDataVersion: 1,
      requestBody: eventRequest
    });

    const ev = insert.data;
    const joinUrl =
      ev.hangoutLink ||
      ev?.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri;

    return NextResponse.json({
      joinUrl,
      startISO: ev.start?.dateTime,
      endISO: ev.end?.dateTime,
      timeZone,
      eventId: ev.id
    });
  } catch (err) {
    console.error('Google Meet create error:', err?.response?.data || err);
    return NextResponse.json(
      { error: 'Google Meet API error', detail: err?.message || 'Unknown' },
      { status: 500 }
    );
  }
}

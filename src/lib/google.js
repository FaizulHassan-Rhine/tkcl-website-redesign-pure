// lib/google.js
import { google } from 'googleapis';

function addMinutes(iso, mins) {
  return new Date(new Date(iso).getTime() + mins * 60000).toISOString();
}
function pickMeetUrl(event) {
  const ep = event?.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video');
  return ep?.uri || event?.hangoutLink || '';
}

function oauthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = process.env;
  const o = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
  o.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return o;
}

export async function createGoogleMeet({
  topic,
  startISO,
  durationMinutes = 30,
  attendeeEmail,
  timezone = 'UTC',
}) {
  const auth = oauthClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: topic || 'Meeting',
    start: { dateTime: startISO, timeZone: timezone },
    end:   { dateTime: addMinutes(startISO, durationMinutes), timeZone: timezone },
    attendees: attendeeEmail ? [{ email: attendeeEmail }] : undefined,
    conferenceData: {
      createRequest: {
        requestId: String(Date.now()),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: event,
  });

  const ev = res.data;
  return {
    eventId: ev.id,
    meetUrl: pickMeetUrl(ev),   // ইউজারের Meet URL
    htmlLink: ev.htmlLink,      // ক্যালেন্ডার ইভেন্ট লিংক (owner দেখার জন্য)
    startISO,
    endISO: ev.end?.dateTime,
  };
}

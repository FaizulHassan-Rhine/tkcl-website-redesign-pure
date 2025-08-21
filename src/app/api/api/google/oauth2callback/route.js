import { NextResponse } from 'next/server';
import { google } from 'googleapis';
export const runtime = 'nodejs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'no_code' }, { status: 400 });

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  const oauth2 = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
  const { tokens } = await oauth2.getToken(code);
  console.log('OAuth tokens:', tokens); // এখানে refresh_token পাবেন
  return NextResponse.json({ ok: true, tokens });
}

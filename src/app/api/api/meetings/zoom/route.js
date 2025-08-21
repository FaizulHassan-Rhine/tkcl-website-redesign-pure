// /app/api/meetings/zoom/route.js
export const runtime = 'nodejs'; // Buffer লাগে, Edge নয়
import { createZoomMeeting } from '@/lib/zoom';
import { NextResponse } from 'next/server';

// ✅ যদি আপনার প্রজেক্টে src/ আছে: import { createZoomMeeting } from '@/lib/zoom';
// ❗️অ্যালিয়াস কাজ না করলে রিলেটিভ ব্যবহার করুন (src আছে/নেই অনুযায়ী ঠিক করুন):
// import { createZoomMeeting } from '../../../lib/zoom';

export async function POST(req) {
  try {
    const { name, email, startISO, durationMinutes = 30 } = await req.json();
    if (!startISO) {
      return NextResponse.json({ error: 'startISO required' }, { status: 400 });
    }

    const topic = `Meeting with ${name || 'Guest'}`;
    const m = await createZoomMeeting({ topic, startISO, durationMinutes });
    return NextResponse.json(m);
  } catch (e) {
    console.error('zoom route error:', e);
    return NextResponse.json(
      { error: 'zoom_error', detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}

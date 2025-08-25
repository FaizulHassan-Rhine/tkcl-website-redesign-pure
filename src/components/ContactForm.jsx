// 'use client';
// import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
 
// export default function ContactForm() {
//   const [isOpen, setIsOpen] = useState(false);      // for Solution select placeholder
//   const [sending, setSending] = useState(false);    // button state
//   const [modal, setModal] = useState({              // modal state
//     show: false,
//     type: 'success', // 'success' | 'error'
//     title: '',
//     message: '',
//   });
 
//   function openModal({ type, title, message }) {
//     setModal({ show: true, type, title, message });
//   }
//   function closeModal() {
//     setModal((m) => ({ ...m, show: false }));
//   }
 
//   async function sendEmail(e) {
//     e.preventDefault();
//     if (sending) return;
//     setSending(true);
 
//     try {
//       await emailjs.sendForm(
//         'service_1zfatsb',           // EmailJS Service ID
//         'template_0ciuxfr',          // EmailJS Template ID
//         e.target,                    // form element
//         'user_3TcS4pRKMgpo7fArsKmSf' // EmailJS Public key
//       );
 
//       openModal({
//         type: 'success',
//         title: 'Message sent',
//         message:
//           'Thanks! Your message has been sent. We’ll get back to you shortly.',
//       });
//       e.target.reset();
//     } catch (err) {
//       console.error('EmailJS error:', err);
//       openModal({
//         type: 'error',
//         title: 'Send failed',
//         message: 'Sorry, failed to send. Please try again.',
//       });
//     } finally {
//       setSending(false);
//     }
//   }
 
//   return (
//     <>
//       {/* Form */}
//       <form onSubmit={sendEmail} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name*"
//           className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
//           required
//         />
 
//         <input
//           type="email"
//           name="email"
//           placeholder="Email*"
//           className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
//           required
//         />
 
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone*"
//           className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
//           required
//         />
 
//         {/* Solution Select */}
//         <div className="relative">
//           <select
//             name="solution"
//             className="dark:bg-black dark:text-white border-b dark:border-white border-gray-700 focus:outline-none py-2 pr-8 appearance-none w-full"
//             required
//             onFocus={() => setIsOpen(true)}
//             onBlur={() => setIsOpen(false)}
//           >
//             {!isOpen && <option value="">Services</option>}
//             <option value="Image Editing Services">Image Editing</option>
//             <option value="Video Editing Services">Video Editing</option>
//             <option value="3D Modelling & Rendering Service">3D Modelling & Rendering</option>
//             <option value="AI Services">AI Services</option>
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>
//         </div>
 
//         <textarea
//           name="message"
//           placeholder="Message*"
//           className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2 md:col-span-2"
//           rows={4}
//           required
//         />
 
//         <button
//           type="submit"
//           disabled={sending}
//           className="group relative mt-4 md:col-span-2 overflow-hidden bg-[#4FA59B] text-white dark:bg-white dark:text-black font-semibold px-6 lg:px-12 py-3 lg:py-6 rounded-full w-fit disabled:opacity-60"
//         >
//           <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
//             {sending ? 'Sending…' : 'Send Message'}
//           </span>
//           <span className="absolute inset-0 bg-[#3B837B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
//         </button>
//       </form>
 
//       {/* Modal */}
//       {modal.show && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center px-4"
//           aria-modal="true"
//           role="dialog"
//         >
//           {/* backdrop */}
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeModal}
//           />
 
//           {/* dialog */}
//           <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl">
//             <div className="p-6">
//               <div className="flex items-start gap-3">
//                 {/* icon */}
//                 <div
//                   className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
//                     modal.type === 'success'
//                       ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
//                       : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
//                   }`}
//                 >
//                   {modal.type === 'success' ? (
//                     <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   ) : (
//                     <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   )}
//                 </div>
 
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-black dark:text-white">
//                     {modal.title}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
//                     {modal.message}
//                   </p>
//                 </div>
//               </div>
 
//               <div className="mt-6 flex justify-end gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




'use client';
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 
// NEW
import TimezoneSelect from 'react-timezone-select';
import { DateTime } from 'luxon';
 
export default function ContactForm() {
  const formRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
 
  // Meeting UI
  const [needMeeting, setNeedMeeting] = useState(false);
  const [meetingPlatform, setMeetingPlatform] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState(null);
 
  // NEW: choose a time zone (default to user’s)
  const defaultTz = typeof window !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'UTC';
  const [timeZone, setTimeZone] = useState(defaultTz);
  const [durationMinutes, setDurationMinutes] = useState(30);
 
  const [modal, setModal] = useState({ show: false, type: 'success', title: '', message: '' });
  const openModal = ({ type, title, message }) => setModal({ show: true, type, title, message });
  const closeModal = () => setModal((m) => ({ ...m, show: false }));
 
  // Demo generator for Teams/Zoom (unchanged)
  const generateMeetingLink = (platform) => {
    if (!platform) return '';
    if (platform === 'Teams') return `https://teams.microsoft.com/l/meetup-join/${Date.now().toString(36)}`;
    if (platform === 'Zoom') return `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;
    // Google Meet fallback (demo only - real API below)
    return `https://meet.google.com/${Math.random().toString(36).slice(2,6)}-${Math.random().toString(36).slice(2,6)}-${Math.random().toString(36).slice(2,6)}`;
  };
 
  async function sendEmail(e) {
    e.preventDefault();
    if (sending) return;
 
    const form = formRef.current;
    if (!form.checkValidity()) { form.reportValidity(); return; }
 
    if (needMeeting && (!meetingPlatform || !meetingDateTime)) {
      openModal({ type: 'error', title: 'Missing info', message: 'দয়া করে প্ল্যাটফর্ম ও সময় দিন।' });
      return;
    }
 
    setSending(true);
 
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const msgBody = (fd.get('message') || '').toString().trim();
 
    // Convert picked time (in chosen tz) -> UTC ISO for server
    const startISO = meetingDateTime
      ? DateTime.fromJSDate(meetingDateTime, { zone: timeZone }).toUTC().toISO()
      : null;
 
    let meeting_platform = needMeeting ? meetingPlatform : 'Not requested';
    let meeting_datetime = needMeeting ? (startISO || '') : 'Not requested';
    let meeting_link = 'Not generated';
    let host_link = 'N/A';
 
    try {
      // ---- Zoom: your existing real API (unchanged)
      if (needMeeting && meetingPlatform === 'Zoom') {
        const resp = await fetch('/api/meetings/zoom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, startISO, durationMinutes })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data?.detail || data?.error || 'Zoom error');
        meeting_link = data.joinUrl;
        meeting_datetime = data.startISO;
        host_link = data.startUrl || 'N/A';
      }
 
      // ---- Google Meet: real API (Calendar)
      else if (needMeeting && meetingPlatform === 'Google Meet') {
        const resp = await fetch('/api/meetings/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            startISO,         // UTC time
            timeZone,         // original tz to store in calendar
            durationMinutes,
            notes: msgBody?.slice(0, 2000) || ''
          })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data?.detail || data?.error || 'Google Meet error');
        meeting_link = data.joinUrl;
        meeting_datetime = data.startISO; // when the event starts (RFC3339)
      }
else if (needMeeting && meetingPlatform === 'Teams') {
  const resp = await fetch('/api/meetings/teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      startISO,          // UTC
      durationMinutes
    })
  });
 
  // Read body safely both when ok and when error
  const raw = await resp.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { raw }; }
 
  console.log('Teams API resp:', resp.status, data); // <-- see exact error here
 
  if (!resp.ok) {
    const msg = data?.detail || data?.error || data?.message || data?.raw || 'Teams error';
    throw new Error(msg);
  }
 
  meeting_link = data.joinUrl;
  meeting_datetime = data.startISO;
}
      // ---- Teams / Fallback demo
      else if (needMeeting) {
        meeting_link = generateMeetingLink(meetingPlatform);
      }
 
      // OWNER: hidden fields for your EmailJS template
      const h1 = document.createElement('input');
      h1.type = 'hidden'; h1.name = 'meeting_platform'; h1.value = meeting_platform;
      const h2 = document.createElement('input');
      h2.type = 'hidden'; h2.name = 'meeting_datetime'; h2.value = meeting_datetime;
      const h3 = document.createElement('input');
      h3.type = 'hidden'; h3.name = 'meeting_link'; h3.value = meeting_link;
      const h4 = document.createElement('input');
      h4.type = 'hidden'; h4.name = 'meeting_host_link'; h4.value = host_link;
 
      form.appendChild(h1); form.appendChild(h2); form.appendChild(h3); form.appendChild(h4);
 
      await emailjs.sendForm('service_z3wbodr', 'template_awcxio8', form, 'AwNLlzGbeWYY7uevZ');
 
      h1.remove(); h2.remove(); h3.remove(); h4.remove();
 
      // USER auto-reply
      await emailjs.send(
        'service_z3wbodr',
        'template_6ty3nxi',
        {
          to_email: email,
          to_name: name,
          reply_message: msgBody,
          meeting_platform,
          meeting_datetime,
          meeting_link
        },
        'AwNLlzGbeWYY7uevZ'
      );
 
      openModal({
        type: 'success',
        title: 'Message sent',
        message: needMeeting
          ? `Thanks ${meeting_platform} Meeting: ${meeting_link}`
          : 'Thank ! Please check your inbox'
      });
 
      form.reset();
      setNeedMeeting(false); setMeetingPlatform(''); setMeetingDateTime(null);
      setTimeZone(defaultTz);
      setDurationMinutes(30);
    } catch (err) {
      console.error('EmailJS/Meeting error:', err);
      openModal({ type: 'error', title: 'Send failed', message: 'Sorry try for after some times' });
    } finally {
      setSending(false);
    }
  }
 
  return (
    <>
      <form ref={formRef} onSubmit={sendEmail} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="name" placeholder="Name*" className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2" required />
        <input type="email" name="email" placeholder="Email*" className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2" required />
        <input type="text" name="phone" placeholder="Phone*" className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2" required />
 
        <div className="relative">
          <select name="solution" className="border-b border-gray-700 focus:outline-none py-2 pr-8 appearance-none w-full" required onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)}>
            {!isOpen && <option value="">Services</option>}
            <option value="Image Editing Services">Image Editing</option>
            <option value="Video Editing Services">Video Editing</option>
            <option value="3D Modelling & Rendering Service">3D Modelling & Rendering</option>
            <option value="AI Services">AI Services</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
 
        <textarea name="message" placeholder="Message*" className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2 md:col-span-2" rows={4} required />
 
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={needMeeting}
              onChange={(e) => {
                setNeedMeeting(e.target.checked);
                if (!e.target.checked) {
                  setMeetingPlatform('');
                  setMeetingDateTime(null);
                }
              }}
            />
            Do you need meeting?
          </label>
        </div>
 
        {needMeeting && (
          <div className="flex gap-3 flex-wrap md:col-span-2">
            {['Zoom','Google Meet'].map(p => (
              <button key={p} type="button" onClick={() => setMeetingPlatform(p)}
                className={`px-4 py-2 rounded-full border transition ${meetingPlatform === p ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`}>
                {p} Meeting
              </button>
            ))}
          </div>
        )}
 
        {needMeeting && meetingPlatform && (
          <>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">Select Date & Time</label>
              <DatePicker
                selected={meetingDateTime}
                onChange={(d) => setMeetingDateTime(d)}
                showTimeSelect
                timeIntervals={15}
                dateFormat="PPpp"
                minDate={new Date()}
                placeholderText="Pick date & time"
                className="w-full bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
              />
              <p className="mt-2 text-xs opacity-70">
                Your selected time will be saved in <strong>{timeZone}</strong> and converted safely for all attendees.
              </p>
            </div>
 
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">Time Zone</label>
              <div className="border-b dark:border-white border-gray-700 pb-2">
                <TimezoneSelect
                  value={timeZone}
                  onChange={(val) => setTimeZone(typeof val === 'string' ? val : val.value)}
                />
              </div>
            </div>
 
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">Duration (minutes)</label>
              <input
                type="number"
                min={15}
                step={15}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value || '30', 10))}
                className="w-40 bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
              />
            </div>
          </>
        )}
 
        <button type="submit" disabled={sending} className="group relative mt-4 md:col-span-2 overflow-hidden bg-[#4FA59B] text-white font-semibold px-6 lg:px-12 py-3 lg:py-6 rounded-full w-fit disabled:opacity-60">
          <span className="relative z-10 transition-colors duration-300 ">
            {sending ? 'Sending…' : 'Send Message'}
          </span>
          <span className="absolute inset-0 bg-[#3B837B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
        </button>
      </form>
 
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${modal.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                  {modal.type === 'success'
                    ? <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black dark:text-white">{modal.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{modal.message}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={closeModal} className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
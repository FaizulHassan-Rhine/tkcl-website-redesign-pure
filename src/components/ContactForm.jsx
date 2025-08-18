'use client';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
 
export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);      // for Solution select placeholder
  const [sending, setSending] = useState(false);    // button state
  const [modal, setModal] = useState({              // modal state
    show: false,
    type: 'success', // 'success' | 'error'
    title: '',
    message: '',
  });
 
  function openModal({ type, title, message }) {
    setModal({ show: true, type, title, message });
  }
  function closeModal() {
    setModal((m) => ({ ...m, show: false }));
  }
 
  async function sendEmail(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
 
    try {
      await emailjs.sendForm(
        'service_1zfatsb',           // EmailJS Service ID
        'template_0ciuxfr',          // EmailJS Template ID
        e.target,                    // form element
        'user_3TcS4pRKMgpo7fArsKmSf' // EmailJS Public key
      );
 
      openModal({
        type: 'success',
        title: 'Message sent',
        message:
          'Thanks! Your message has been sent. We’ll get back to you shortly.',
      });
      e.target.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      openModal({
        type: 'error',
        title: 'Send failed',
        message: 'Sorry, failed to send. Please try again.',
      });
    } finally {
      setSending(false);
    }
  }
 
  return (
    <>
      {/* Form */}
      <form onSubmit={sendEmail} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Name*"
          className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
          required
        />
 
        <input
          type="email"
          name="email"
          placeholder="Email*"
          className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
          required
        />
 
        <input
          type="text"
          name="phone"
          placeholder="Phone*"
          className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
          required
        />
 
        {/* Solution Select */}
        <div className="relative">
          <select
            name="solution"
            className="dark:bg-black dark:text-white border-b dark:border-white border-gray-700 focus:outline-none py-2 pr-8 appearance-none w-full"
            required
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            {!isOpen && <option value="">Solution</option>}
            <option value="Image Editing Services">Image Editing</option>
            <option value="Video Editing Services">Video Editing</option>
            <option value="3D Modelling & Rendering Service">3D Modelling & Rendering</option>
            <option value="AI Services">AI Services</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
 
        <textarea
          name="message"
          placeholder="Message*"
          className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2 md:col-span-2"
          rows={4}
          required
        />
 
        <button
          type="submit"
          disabled={sending}
          className="group relative mt-4 md:col-span-2 overflow-hidden bg-[#4FA59B] text-white dark:bg-white dark:text-black font-semibold px-6 lg:px-12 py-3 lg:py-6 rounded-full w-fit disabled:opacity-60"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
            {sending ? 'Sending…' : 'Send Message'}
          </span>
          <span className="absolute inset-0 bg-[#3B837B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
        </button>
      </form>
 
      {/* Modal */}
      {modal.show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
 
          {/* dialog */}
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl">
            <div className="p-6">
              <div className="flex items-start gap-3">
                {/* icon */}
                <div
                  className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                    modal.type === 'success'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                  }`}
                >
                  {modal.type === 'success' ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
 
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {modal.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    {modal.message}
                  </p>
                </div>
              </div>
 
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
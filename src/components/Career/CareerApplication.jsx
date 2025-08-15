'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const positions = [
  'Senior Image Editor',
  'Video Editor',
  '3D Artist',
  'AI Solutions Developer',
  'Project Manager',
  'Junior Graphic Designer',
  'Other'
];

const experienceLevels = [
  'Entry Level (0-1 years)',
  'Junior (1-3 years)',
  'Mid Level (3-5 years)',
  'Senior (5-8 years)',
  'Lead/Principal (8+ years)'
];

export default function CareerApplication() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    portfolio: '',
    coverLetter: '',
    resume: null,
    linkedIn: '',
    availability: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current, 
      { y: 30, opacity: 0 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your application! We\'ll be in touch soon.');
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        location: '',
        portfolio: '',
        coverLetter: '',
        resume: null,
        linkedIn: '',
        availability: ''
      });
    }, 2000);
  };

  return (
    <div ref={sectionRef} className="bg-gray-50 text-black px-6 md:px-20 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="text-4xl lg:text-[80px] title font-semibold mb-6" style={{fontFamily: 'Rosaline, serif'}}>
            Apply Now
          </h2>
          <p className="text-xl lg:text-2xl sub-title max-w-3xl mx-auto">
            Ready to join our creative team? Fill out the application below and let's start 
            building something amazing together.
          </p>
        </div>

        {/* Application Form */}
        <div ref={formRef} className="bg-white rounded-lg p-8 lg:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-2xl font-semibold title mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-2xl font-semibold title mb-6">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Position of Interest *
                  </label>
                  <div className="relative">
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 pr-8 appearance-none text-body"
                      required
                      onFocus={() => setIsDropdownOpen(true)}
                      onBlur={() => setIsDropdownOpen(false)}
                    >
                      {!isDropdownOpen && <option value="">Select a position</option>}
                      {positions.map(position => (
                        <option key={position} value={position} className="bg-white dark:bg-black">
                          {position}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Experience Level *
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 pr-8 appearance-none text-body"
                      required
                      onFocus={() => setIsExperienceDropdownOpen(true)}
                      onBlur={() => setIsExperienceDropdownOpen(false)}
                    >
                      {!isExperienceDropdownOpen && <option value="">Select experience level</option>}
                      {experienceLevels.map(level => (
                        <option key={level} value={level} className="bg-white dark:bg-black">
                          {level}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="e.g., Immediate, 2 weeks notice"
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                  />
                </div>
              </div>
            </div>

            {/* Portfolio & Links */}
            <div>
              <h3 className="text-2xl font-semibold title mb-6">Portfolio & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://your-portfolio.com"
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500 py-3 text-body"
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-2xl font-semibold title mb-6">Documents</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-body mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="text-4xl mb-4">📄</div>
                      <p className="text-body mb-2">
                        {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h3 className="text-2xl font-semibold title mb-6">Cover Letter</h3>
              <div>
                <label className="block text-sm font-medium text-body mb-2">
                  Tell us why you'd be a great fit *
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Share your passion for creative work, relevant experience, and why you want to join TKCL..."
                  className="w-full bg-transparent border border-gray-300 focus:outline-none focus:border-green-500 p-4 rounded-lg text-body resize-vertical"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden bg-black text-white font-semibold px-12 py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </span>
                <span className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
              </button>
              
              <p className="text-sm text-body mt-4">
                We review all applications carefully and will contact qualified candidates within 1-2 weeks.
              </p>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold title mb-4">Have Questions?</h3>
          <p className="text-body mb-6">
            If you have any questions about the application process or our open positions, 
            feel free to reach out to our HR team.
          </p>
          <div className="space-y-2">
            <p className="text-body">
              <strong>Email:</strong> 
              <a href="mailto:careers@thekowcompany.com" className="text-green-500 hover:underline ml-2">
                careers@thekowcompany.com
              </a>
            </p>
            <p className="text-body">
              <strong>Response Time:</strong> Within 48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const jobListings = [
  {
    id: 1,
    title: 'Senior Image Editor',
    department: 'Creative',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Join our creative team as a Senior Image Editor specializing in e-commerce photography, product retouching, and background removal.',
    skills: ['Photoshop', 'Lightroom', 'Color Grading', 'Background Removal', 'Product Photography'],
    urgent: true
  },
  {
    id: 2,
    title: 'Video Editor',
    department: 'Creative',
    location: 'Remote',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Create compelling video content for our clients including promotional videos, social media content, and educational materials.',
    skills: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Motion Graphics', 'Color Correction'],
    urgent: false
  },
  {
    id: 3,
    title: '3D Artist',
    department: 'Creative',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Develop stunning 3D visualizations and product renderings for various industries including architecture and product design.',
    skills: ['Blender', '3ds Max', 'Cinema 4D', 'V-Ray', 'KeyShot', 'Product Visualization'],
    urgent: true
  },
  {
    id: 4,
    title: 'AI Solutions Developer',
    department: 'Technology',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build and implement AI-powered tools for automated image processing and enhancement workflows.',
    skills: ['Python', 'TensorFlow', 'OpenCV', 'Machine Learning', 'Computer Vision'],
    urgent: false
  },
  {
    id: 5,
    title: 'Project Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead cross-functional teams to deliver creative projects on time and within budget while maintaining highest quality standards.',
    skills: ['Project Management', 'Agile', 'Client Communication', 'Team Leadership', 'Workflow Optimization'],
    urgent: false
  },
  {
    id: 6,
    title: 'Junior Graphic Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Part-time',
    experience: '1+ years',
    description: 'Support our design team in creating visual assets for marketing campaigns and client projects.',
    skills: ['Illustrator', 'Photoshop', 'InDesign', 'Brand Design', 'Layout Design'],
    urgent: false
  }
];

const departments = ['All', 'Creative', 'Technology', 'Operations'];
const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract'];
const locations = ['All', 'Remote', 'On-site', 'Hybrid'];

export default function CareerJobs() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const jobsRef = useRef(null);

  useEffect(() => {
    // Filter jobs based on selected criteria
    let filtered = jobListings;
    
    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }
    
    if (selectedType !== 'All') {
      filtered = filtered.filter(job => job.type === selectedType);
    }
    
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }
    
    setFilteredJobs(filtered);
  }, [selectedDepartment, selectedType, selectedLocation]);

  useEffect(() => {
    // Animate on scroll
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

    gsap.fromTo(filtersRef.current, 
      { y: 30, opacity: 0 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  useEffect(() => {
    // Animate job cards when filtered jobs change
    if (jobsRef.current) {
      gsap.fromTo(jobsRef.current.children, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [filteredJobs]);

  return (
    <div id="open-positions" ref={sectionRef} className="bg-white text-black px-6 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16">
          <h2 className="text-4xl lg:text-[80px] title font-semibold mb-6" style={{fontFamily: 'Rosaline, serif'}}>
            Open Positions
          </h2>
          <p className="text-xl lg:text-2xl sub-title max-w-3xl">
            Discover exciting opportunities to grow your career and make an impact in the creative industry.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-body mb-2">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-2 text-body"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-white dark:bg-black">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-body mb-2">Job Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-2 text-body"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type} className="bg-white dark:bg-black">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-body mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none py-2 text-body"
              >
                {locations.map(location => (
                  <option key={location} value={location} className="bg-white dark:bg-black">
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* Job Listings */}
        <div ref={jobsRef} className="space-y-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl title mb-4">No positions found</h3>
              <p className="text-body">Try adjusting your filters to see more opportunities.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="border border-gray-300 rounded-lg p-8 hover:border-green-500 transition-colors duration-300 group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <h3 className="text-2xl lg:text-3xl font-semibold title group-hover:text-green-500 transition-colors">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-body">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.experience}
                      </span>
                    </div>
                    
                    <p className="text-body mb-6 leading-relaxed">
                      {job.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-body px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="lg:flex-shrink-0">
                    <button className="group relative overflow-hidden bg-black text-white font-semibold px-6 py-3 rounded-full w-full lg:w-auto transition-all duration-300">
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Apply Now
                      </span>
                      <span className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        <div className="mt-12 text-center">
          <p className="text-body">
            Showing {filteredJobs.length} of {jobListings.length} positions
          </p>
        </div>
      </div>
    </div>
  );
}

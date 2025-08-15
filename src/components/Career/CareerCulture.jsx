'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cultureValues = [
  {
    id: 1,
    title: 'Creative Excellence',
    description: 'We push the boundaries of creativity and innovation in every project, always striving for visual perfection.',
    icon: '✨',
    color: '#B8D65C'
  },
  {
    id: 2,
    title: 'Collaborative Spirit',
    description: 'We believe the best results come from diverse minds working together towards a common goal.',
    icon: '🤝',
    color: '#4DB3B3'
  },
  {
    id: 3,
    title: 'Growth Mindset',
    description: 'We encourage continuous learning and provide opportunities for professional and personal development.',
    icon: '🚀',
    color: '#FFC839'
  },
  {
    id: 4,
    title: 'Work-Life Balance',
    description: 'We prioritize mental health and well-being with flexible schedules and remote-first culture.',
    icon: '⚖️',
    color: '#D3E7D9'
  },
  {
    id: 5,
    title: 'Client Success',
    description: 'We are committed to delivering exceptional results that exceed our clients\' expectations.',
    icon: '🎯',
    color: '#206035'
  },
  {
    id: 6,
    title: 'Innovation First',
    description: 'We embrace new technologies and methodologies to stay ahead in the digital creative industry.',
    icon: '💡',
    color: '#B8D65C'
  }
];

const teamTestimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Image Editor',
    image: '/images/image-2.webp',
    quote: 'Working at TKCL has been transformative for my career. The creative freedom and supportive team environment have allowed me to grow beyond what I thought possible.',
    joinedYear: '2022'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: '3D Artist',
    image: '/images/image-3.webp',
    quote: 'The diversity of projects and cutting-edge tools available here keep me motivated every day. Plus, the remote-first culture gives me the flexibility I need.',
    joinedYear: '2021'
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'Video Editor',
    image: '/images/image-4.webp',
    quote: 'I love how TKCL invests in our professional development. The learning opportunities and mentorship programs have been invaluable for my growth.',
    joinedYear: '2023'
  }
];

export default function CareerCulture() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const valuesRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 1 }, 
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

    // Values animation
    gsap.fromTo(valuesRef.current?.children, 
      { y: 30, opacity: 1 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Testimonials animation
    gsap.fromTo(testimonialsRef.current?.children, 
      { x: 50, opacity: 1 }, 
      {
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-50 text-black px-6 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="text-4xl lg:text-[80px] title font-semibold mb-6" style={{fontFamily: 'Rosaline, serif'}}>
            Our Culture
          </h2>
          <p className="text-xl lg:text-2xl sub-title max-w-3xl mx-auto">
            We're more than just a creative agency. We're a community of passionate individuals 
            who believe in the power of collaboration and innovation.
          </p>
        </div>

        {/* Culture Values Grid */}
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {cultureValues.map((value) => (
            <div key={value.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-semibold title mb-4">{value.title}</h3>
              <p className="text-body leading-relaxed">{value.description}</p>
              <div 
                className="w-full h-1 rounded-full mt-6" 
                style={{backgroundColor: value.color}}
              ></div>
            </div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-300 my-16"></div>

        {/* Team Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl lg:text-[60px] title font-semibold mb-12 text-center" style={{fontFamily: 'Rosaline, serif'}}>
            Hear From Our Team
          </h3>
          
          <div ref={testimonialsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teamTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold title text-lg">{testimonial.name}</h4>
                    <p className="text-body text-sm">{testimonial.role}</p>
                    <p className="text-body text-xs">Joined {testimonial.joinedYear}</p>
                  </div>
                </div>
                
                <blockquote className="text-body italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Work Environment Stats */}
        <div className="bg-white rounded-lg p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-semibold title mb-8 text-center">
            Why Our Team Loves Working Here
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold title mb-2">95%</div>
              <div className="text-body">Employee Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold title mb-2">4.8/5</div>
              <div className="text-body">Work-Life Balance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold title mb-2">100%</div>
              <div className="text-body">Remote Flexibility</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold title mb-2">25+</div>
              <div className="text-body">Learning Programs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

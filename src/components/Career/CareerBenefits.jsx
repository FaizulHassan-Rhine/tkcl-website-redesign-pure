'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    id: 1,
    category: 'Health & Wellness',
    items: [
      'Comprehensive health insurance',
      'Mental health support & counseling',
      'Fitness & wellness allowance',
      'Annual health check-ups'
    ],
    icon: '🏥',
    color: '#4DB3B3'
  },
  {
    id: 2,
    category: 'Work-Life Balance',
    items: [
      'Flexible working hours',
      '100% remote work options',
      'Unlimited PTO policy',
      '4-day work week options'
    ],
    icon: '⚖️',
    color: '#B8D65C'
  },
  {
    id: 3,
    category: 'Professional Growth',
    items: [
      'Annual learning & development budget',
      'Conference attendance support',
      'Mentorship programs',
      'Internal promotion priority'
    ],
    icon: '📚',
    color: '#FFC839'
  },
  {
    id: 4,
    category: 'Financial Benefits',
    items: [
      'Competitive salary packages',
      'Performance-based bonuses',
      'Stock options program',
      'Retirement savings plan'
    ],
    icon: '💰',
    color: '#206035'
  },
  {
    id: 5,
    category: 'Technology & Tools',
    items: [
      'Latest hardware & software',
      'Home office setup allowance',
      'Creative software licenses',
      'Cloud storage & tools access'
    ],
    icon: '💻',
    color: '#D3E7D9'
  },
  {
    id: 6,
    category: 'Team & Culture',
    items: [
      'Regular team building events',
      'Annual company retreats',
      'Recognition & rewards program',
      'Diverse & inclusive workplace'
    ],
    icon: '🎉',
    color: '#B8D65C'
  }
];

const perks = [
  {
    title: 'Creative Freedom',
    description: 'Work on diverse projects and express your creativity without micromanagement',
    icon: '🎨'
  },
  {
    title: 'Global Collaboration',
    description: 'Collaborate with talented team members from around the world',
    icon: '🌍'
  },
  {
    title: 'Cutting-edge Tech',
    description: 'Access to the latest creative software and hardware',
    icon: '⚡'
  },
  {
    title: 'Rapid Growth',
    description: 'Fast-track your career in a rapidly growing company',
    icon: '📈'
  }
];

export default function CareerBenefits() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const benefitsRef = useRef(null);
  const perksRef = useRef(null);

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

    // Benefits animation
    gsap.fromTo(benefitsRef.current?.children, 
      { y: 30, opacity: 0 }, 
      {
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Perks animation
    gsap.fromTo(perksRef.current?.children, 
      { scale: 0.9, opacity: 0 }, 
      {
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: perksRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="bg-white text-black px-6 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="text-4xl lg:text-[80px] title font-semibold mb-6" style={{fontFamily: 'Rosaline, serif'}}>
            Benefits & Perks
          </h2>
          <p className="text-xl lg:text-2xl sub-title max-w-3xl mx-auto">
            We believe in taking care of our team with comprehensive benefits and exciting perks 
            that support both your professional and personal growth.
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{benefit.icon}</div>
                <h3 className="text-xl font-semibold title group-hover:text-green-500 transition-colors">
                  {benefit.category}
                </h3>
              </div>
              
              <ul className="space-y-3">
                {benefit.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-body">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{backgroundColor: benefit.color}}
                    ></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-300 my-16"></div>

        {/* Additional Perks */}
        <div className="mb-16">
          <h3 className="text-3xl lg:text-[60px] title font-semibold mb-12 text-center" style={{fontFamily: 'Rosaline, serif'}}>
            Why You'll Love It Here
          </h3>
          
          <div ref={perksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300">
                <div className="text-4xl mb-4">{perk.icon}</div>
                <h4 className="text-lg font-semibold title mb-3">{perk.title}</h4>
                <p className="text-body text-sm leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compensation Philosophy */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-semibold title mb-6">
              Our Compensation Philosophy
            </h3>
            <p className="text-lg sub-title max-w-3xl mx-auto mb-8">
              We believe in fair, transparent, and competitive compensation that reflects your 
              contributions and market standards. Regular salary reviews ensure you're always 
              fairly compensated for your growing expertise.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold title mb-2">Transparent</h4>
                <p className="text-body text-sm">Clear salary bands and promotion criteria</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold title mb-2">Competitive</h4>
                <p className="text-body text-sm">Market-leading compensation packages</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold title mb-2">Performance-Based</h4>
                <p className="text-body text-sm">Regular reviews and merit increases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

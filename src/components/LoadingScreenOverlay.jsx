'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreenOverlay = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const spinnerRef = useRef(null);
  const animationsRef = useRef({ spinner: null, timeout: null });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initTimeout = setTimeout(() => {
      initializeAnimations();
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      cleanup();
    };
  }, [mounted]);

  const initializeAnimations = () => {
    if (!spinnerRef.current || !leftDoorRef.current || !rightDoorRef.current) {
      setTimeout(initializeAnimations, 100);
      return;
    }

    gsap.set([leftDoorRef.current, rightDoorRef.current], { x: '0%' });
    gsap.set(spinnerRef.current, { rotation: 0 });

    animationsRef.current.spinner = gsap.to(spinnerRef.current, {
      rotation: 360,
      repeat: -1,
      ease: 'linear',
      duration: 1,
    });

    animationsRef.current.timeout = setTimeout(() => {
      openDoors();
    }, 500);
  };

  const openDoors = () => {
    if (animationsRef.current.spinner) {
      animationsRef.current.spinner.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(spinnerRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.4,
      ease: 'power4.out',
    })
    .to(leftDoorRef.current, {
      x: '-100%',
      duration: 1,
      ease: 'power2.inOut',
    }, '+=0.2')
    .to(rightDoorRef.current, {
      x: '100%',
      duration: 1,
      ease: 'power2.inOut',
    }, '<');
  };

  const cleanup = () => {
    if (animationsRef.current.spinner) {
      animationsRef.current.spinner.kill();
    }
    if (animationsRef.current.timeout) {
      clearTimeout(animationsRef.current.timeout);
    }
    gsap.killTweensOf([leftDoorRef.current, rightDoorRef.current, spinnerRef.current]);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900 to-black"
        style={{
          width: 'calc(50% + 2px)',
          transform: 'translateX(0%)',
          willChange: 'transform',
        }}
      />

      {/* Right Door */}
      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-900 to-black"
        style={{
          width: 'calc(50% + 2px)',
          transform: 'translateX(0%)',
          willChange: 'transform',
        }}
      />

      {/* Spinner */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <div
            ref={spinnerRef}
            className="w-40 h-40 border-8 border-white border-t-transparent rounded-full mx-auto mb-8"
            style={{
              transform: 'rotate(0deg)',
              willChange: 'transform',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreenOverlay;

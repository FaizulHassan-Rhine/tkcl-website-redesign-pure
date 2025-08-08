'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useRouter } from 'next/navigation';

const objectsData = [
  { 
    id: 1, 
    label: 'Image Editing', 
    mobileLabel: 'Image Edit', // Shorter text for mobile
    color: '#22c55e', 
    link: '/shape/circle' 
  },
  { 
    id: 2, 
    label: 'Video Editing', 
    mobileLabel: 'Video Edit',
    color: '#3b82f6', // Different color for variety
    link: '/shape/rectangle' 
  },
  { 
    id: 3, 
    label: '3D Modeling', 
    mobileLabel: '3D Model',
    color: '#8b5cf6', // Different color
    link: '/shape/triangle' 
  },
  { 
    id: 4, 
    label: 'CGI Rendering', 
    mobileLabel: 'CGI Render',
    color: '#f59e0b', // Different color
    link: 'https://youtube.com' 
  },
];

const Hero = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const observerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const router = useRouter();

  // Track interaction state
  const interactionStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentBody: null,
    isInteracting: false,
    lastTouchTime: 0
  });

  const createCapsule = (x, y, width, height, options) => {
    const radius = height / 2;
    const rect = Matter.Bodies.rectangle(x, y, width - height, height, options);
    const left = Matter.Bodies.circle(x - (width - height) / 2, y, radius, options);
    const right = Matter.Bodies.circle(x + (width - height) / 2, y, radius, options);
    const capsule = Matter.Body.create({
      parts: [left, rect, right],
      restitution: options.restitution,
      frictionAir: options.frictionAir,
      label: options.label,
    });

    capsule.customColor = options.fillStyle || '#000';
    capsule.customLabel = options.label;
    capsule.fontSize = options.fontSize || 16;
    capsule.textColor = options.textColor || '#fff';
    capsule.customLink = options.customLink || '';
    return capsule;
  };

  // Helper function to get coordinates from mouse or touch event
  const getEventCoordinates = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX, clientY;

    if (event.touches && event.touches[0]) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (event.changedTouches && event.changedTouches[0]) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Find body at coordinates
  const findBodyAtPoint = (x, y) => {
    for (const body of bodiesRef.current) {
      if (
        Matter.Bounds.contains(body.bounds, { x, y }) &&
        Matter.Vertices.contains(body.vertices, { x, y })
      ) {
        return body;
      }
    }
    return null;
  };

  useEffect(() => {
    // Initialize engine
    engineRef.current = Matter.Engine.create();
    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = 0.4;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const baseOptions = { restitution: 0.8, frictionAir: 0.02 };

    const renderBodies = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bodiesRef.current.forEach((body) => {
        const { vertices, position, angle } = body;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let j = 1; j < vertices.length; j++) {
          ctx.lineTo(vertices[j].x, vertices[j].y);
        }
        ctx.closePath();
        ctx.fillStyle = body.customColor;
        ctx.fill();

        // Draw text
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);
        ctx.fillStyle = body.textColor;
        ctx.font = `${body.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(body.customLabel, 0, 5);
        ctx.restore();
      });

      requestAnimationFrame(renderBodies);
    };

    const recreateWorld = () => {
      Matter.Composite.clear(world, false);
      const width = canvas.width;
      const height = canvas.height;
      const spacing = width / (objectsData.length + 1);
      const scale = width / 768;
      
      // Responsive sizing based on screen width
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      
      let capsuleWidth, capsuleHeight, fontSize;
      
      if (isMobile) {
        // Mobile sizing - smaller, more compact
        capsuleWidth = Math.min(240 * scale, width * 2); // Max 35% of screen width
        capsuleHeight = Math.max(50 * scale, 40); // Minimum height of 30px
        fontSize = Math.max(12 * scale, 11); // Minimum font size of 11px
      } else if (isTablet) {
        // Tablet sizing - medium
        capsuleWidth = 170 * scale;
        capsuleHeight = 38 * scale;
        fontSize = 14 * scale;
      } else {
        // Desktop sizing - original
        capsuleWidth = 200 * scale;
        capsuleHeight = 40 * scale;
        fontSize = 16 * scale;
      }

      // Walls
      const wallThickness = 50;
      const walls = [
        Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
        Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      ];
      Matter.Composite.add(world, walls);

      // Capsules with responsive sizing
      bodiesRef.current = objectsData.map((obj, i) => {
        const x = spacing * (i + 1);
        const y = isMobile ? height * 0.1 : 0; // Start lower on mobile for better visibility
        
        // Adjust physics properties for mobile
        const mobileBaseOptions = isMobile ? {
          ...baseOptions,
          restitution: 0.6, // Less bouncy on mobile
          frictionAir: 0.03, // Slightly more air friction
        } : baseOptions;
        
        // Use shorter labels on mobile
        const displayLabel = isMobile && obj.mobileLabel ? obj.mobileLabel : obj.label;
        
        const body = createCapsule(x, y, capsuleWidth, capsuleHeight, {
          ...mobileBaseOptions,
          fillStyle: obj.color,
          label: displayLabel,
          fontSize: fontSize,
          textColor: '#fff',
          customLink: obj.link,
        });

        Matter.Composite.add(world, body);
        return body;
      });
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      recreateWorld();
    };

    // Setup Matter.js mouse constraint for desktop
    const setupMatterMouseConstraint = () => {
      if (mouseConstraintRef.current) {
        Matter.Composite.remove(world, mouseConstraintRef.current);
      }

      const mouse = Matter.Mouse.create(canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      mouse.element = canvas;
      mouse.pixelRatio = window.devicePixelRatio;
      Matter.Composite.add(world, mouseConstraint);
      mouseConstraintRef.current = mouseConstraint;
    };

    // Custom mobile touch handling
    const setupMobileTouch = () => {
      let currentConstraint = null;

      const createTouchConstraint = (body, pointX, pointY) => {
        // Create a static body at the touch point
        const constraintBody = Matter.Bodies.circle(pointX, pointY, 5, {
          isStatic: true,
          render: { visible: false }
        });
        
        Matter.Composite.add(world, constraintBody);

        // Create constraint between touch point and physics body
        const constraint = Matter.Constraint.create({
          bodyA: constraintBody,
          bodyB: body,
          pointB: { x: 0, y: 0 },
          stiffness: 0.8,
          damping: 0.1,
          render: { visible: false }
        });

        Matter.Composite.add(world, constraint);
        
        return { constraint, constraintBody };
      };

      const updateTouchConstraint = (constraintData, pointX, pointY) => {
        if (constraintData && constraintData.constraintBody) {
          Matter.Body.setPosition(constraintData.constraintBody, { x: pointX, y: pointY });
        }
      };

      const removeTouchConstraint = (constraintData) => {
        if (constraintData) {
          if (constraintData.constraint) {
            Matter.Composite.remove(world, constraintData.constraint);
          }
          if (constraintData.constraintBody) {
            Matter.Composite.remove(world, constraintData.constraintBody);
          }
        }
      };

      // Touch start
      const handleTouchStart = (event) => {
        const coords = getEventCoordinates(event);
        const body = findBodyAtPoint(coords.x, coords.y);
        
        interactionStateRef.current.startX = coords.x;
        interactionStateRef.current.startY = coords.y;
        interactionStateRef.current.isDragging = false;
        interactionStateRef.current.currentBody = body;
        interactionStateRef.current.isInteracting = true;
        interactionStateRef.current.lastTouchTime = Date.now();

        if (body) {
          // Create physics constraint for dragging
          currentConstraint = createTouchConstraint(body, coords.x, coords.y);
          event.preventDefault(); // Prevent scrolling only when touching a physics object
        }
      };

      // Touch move
      const handleTouchMove = (event) => {
        if (!interactionStateRef.current.isInteracting) return;

        const coords = getEventCoordinates(event);
        const dx = coords.x - interactionStateRef.current.startX;
        const dy = coords.y - interactionStateRef.current.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          interactionStateRef.current.isDragging = true;
        }

        if (interactionStateRef.current.currentBody && currentConstraint) {
          // Update constraint position
          updateTouchConstraint(currentConstraint, coords.x, coords.y);
          event.preventDefault(); // Prevent scrolling while dragging
        }
      };

      // Touch end
      const handleTouchEnd = (event) => {
        const touchDuration = Date.now() - interactionStateRef.current.lastTouchTime;

        // Handle tap (quick touch without dragging)
        if (!interactionStateRef.current.isDragging && 
            touchDuration < 200 && 
            interactionStateRef.current.currentBody) {
          
          const body = interactionStateRef.current.currentBody;
          if (body.customLink) {
            event.preventDefault();
            setTimeout(() => {
              if (body.customLink.startsWith('http')) {
                window.open(body.customLink, '_blank');
              } else {
                router.push(body.customLink);
              }
            }, 50);
          }
        }

        // Clean up constraint
        if (currentConstraint) {
          removeTouchConstraint(currentConstraint);
          currentConstraint = null;
        }

        // Reset state
        interactionStateRef.current.currentBody = null;
        interactionStateRef.current.isInteracting = false;
        interactionStateRef.current.isDragging = false;
      };

      // Add touch event listeners
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

      // Store cleanup function
      canvas._cleanupTouch = () => {
        if (currentConstraint) {
          removeTouchConstraint(currentConstraint);
        }
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchEnd);
      };
    };

    // Desktop mouse click handling
    const setupMouseClick = () => {
      const handleClick = (event) => {
        const coords = getEventCoordinates(event);
        const body = findBodyAtPoint(coords.x, coords.y);
        
        if (body && body.customLink) {
          if (body.customLink.startsWith('http')) {
            window.open(body.customLink, '_blank');
          } else {
            router.push(body.customLink);
          }
        }
      };

      canvas.addEventListener('click', handleClick);
      
      canvas._cleanupClick = () => {
        canvas.removeEventListener('click', handleClick);
      };
    };

    // Initial setup
    resizeCanvas();
    setupMatterMouseConstraint(); // For desktop mouse drag
    setupMobileTouch(); // For mobile touch
    setupMouseClick(); // For desktop clicks
    
    observerRef.current = new ResizeObserver(() => {
      resizeCanvas();
      setupMatterMouseConstraint();
    });
    observerRef.current.observe(canvas.parentElement);

    // Start the engine
    runnerRef.current = Matter.Runner.create();
    Matter.Runner.run(runnerRef.current, engine);
    renderBodies();

    return () => {
      Matter.Runner.stop(runnerRef.current);
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
      observerRef.current?.disconnect();
      
      // Clean up all event listeners
      if (canvas._cleanupTouch) canvas._cleanupTouch();
      if (canvas._cleanupClick) canvas._cleanupClick();
    };
  }, [router]);

  return (
    <div className="">
      <div className="w-full mt-[-40px] lg:-mt-[450px] mx-auto h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-white dark:bg-black border-2 border-white dark:border-black"
          style={{ 
            touchAction: 'auto', // Allow normal touch behavior
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        />
      </div>
      <div className='h-[1px] mb-[3px] bg-black dark:bg-white'></div>
      <div className='h-[1px] mb-[3px] bg-black dark:bg-white'></div>
      <div className='h-[1px] mb-[3px] bg-black dark:bg-white'></div>
    </div>
  );
};

export default Hero;
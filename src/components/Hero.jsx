'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useRouter } from 'next/navigation';

const objectsData = [
  { 
    id: 1, 
    label: 'CGI Rendering ', 
    mobileLabel: 'Image Edit',
    color: '#B8D65C', 
    link: '/shape/circle' 
  },
  { 
    id: 2, 
    label: 'AI Products ', 
    mobileLabel: 'Video Edit',
    color: '#D3E7D9',
    link: '/shape/rectangle' 
  },
  { 
    id: 3, 
    label: '3D Modelling ', 
    mobileLabel: '3D Model',
    color: '#206035',
    link: '/shape/triangle' 
  },
  { 
    id: 4, 
    label: 'Image Editing ', 
    mobileLabel: 'CGI Render',
    color: '#4DB3B3',
    link: 'https://youtube.com' 
  },
  { 
    id: 5, 
    label: 'Video Editing ', 
    mobileLabel: 'CGI Render',
    color: '#FFC839',
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

  // Track interaction state and hover state
  const interactionStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentBody: null,
    isInteracting: false,
    lastTouchTime: 0,
    hoveredBody: null
  });

  // Helper function to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to darken color for shadows
  const darkenColor = (hex, amount = 0.2) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) * (1 - amount));
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) * (1 - amount));
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) * (1 - amount));
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  };

  // --- Helper: ensure custom font is loaded before we render any text ---
  const ensureFontLoaded = async (familyName = 'customFont') => {
    if (document.fonts && document.fonts.check(`16px "${familyName}"`)) return;
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(`16px "${familyName}"`);
      } catch {
        // swallow – we'll fall back to sans-serif if it fails
      }
    }
  };

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
    capsule.borderColor = options.borderColor || '#000';
    capsule.customLabel = options.label;
    capsule.fontSize = options.fontSize || 16;
    capsule.textColor = '#000000';
    capsule.customLink = options.customLink || '';
    capsule.fontFamily = options.fontFamily || 'customFont';
    capsule.isHovered = false;
    capsule.width = width;
    capsule.height = height;

    return capsule;
  };

  // Draw smooth capsule with rounded corners
  const drawSmoothCapsule = (ctx, x, y, width, height, angle, fillStyle, strokeStyle, isHovered) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const radius = height / 2;
    const rectWidth = width - height;

    // Enable smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Create smooth capsule path
    ctx.beginPath();
    ctx.moveTo(-rectWidth / 2, -radius);
    ctx.lineTo(rectWidth / 2, -radius);
    ctx.arcTo(rectWidth / 2 + radius, -radius, rectWidth / 2 + radius, 0, radius);
    ctx.arcTo(rectWidth / 2 + radius, radius, rectWidth / 2, radius, radius);
    ctx.lineTo(-rectWidth / 2, radius);
    ctx.arcTo(-rectWidth / 2 - radius, radius, -rectWidth / 2 - radius, 0, radius);
    ctx.arcTo(-rectWidth / 2 - radius, -radius, -rectWidth / 2, -radius, radius);
    ctx.closePath();

    // Add subtle shadow for depth
    if (isHovered) {
      ctx.shadowColor = darkenColor(strokeStyle, 0.3);
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
    }

    // Fill background
    ctx.fillStyle = fillStyle;
    ctx.fill();

    // Reset shadow for border
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw smooth border with better line caps
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Add inner highlight for polish
    if (isHovered) {
      ctx.beginPath();
      ctx.moveTo(-rectWidth / 2, -radius + 1);
      ctx.lineTo(rectWidth / 2, -radius + 1);
      ctx.arcTo(rectWidth / 2 + radius - 1, -radius + 1, rectWidth / 2 + radius - 1, 0, radius - 1);
      ctx.strokeStyle = hexToRgba(strokeStyle, 0.3);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
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

    // HiDPI scaling for crisp rendering
    const applyHiDPI = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    const baseOptions = { restitution: 0.8, frictionAir: 0.02 };

    // Enhanced render loop with smooth capsules
    const renderBodies = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bodiesRef.current.forEach((body) => {
        const { position, angle } = body;

        // Determine background color based on hover state
        const backgroundColor = body.isHovered 
          ? hexToRgba(body.customColor, 0.15) 
          : 'transparent';

        // Draw smooth capsule
        drawSmoothCapsule(
          ctx,
          position.x,
          position.y,
          body.width,
          body.height,
          angle,
          backgroundColor,
          body.borderColor,
          body.isHovered
        );

        // Enhanced text rendering
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);
        
        // Text with better antialiasing
        ctx.fillStyle = body.textColor;
        const family = body.fontFamily || 'customFont';
        const size = body.fontSize || 16;
        ctx.font = `${size}px "${family}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add subtle text shadow for better readability
        if (body.isHovered) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 1;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 1;
        }
        
        ctx.fillText(body.customLabel, 0, 0);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.restore();
      });

      requestAnimationFrame(renderBodies);
    };

    const recreateWorld = () => {
      Matter.Composite.clear(world, false);
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const spacing = width / (objectsData.length + 1);
      const scale = width / 768;

      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;

      let capsuleWidth, capsuleHeight, fontSize;

      if (isMobile) {
        capsuleWidth = Math.min(240 * scale, width * 0.8);
        capsuleHeight = Math.max(50 * scale, 45);
        fontSize = Math.max(12 * scale, 12);
      } else if (isTablet) {
        capsuleWidth = 180 * scale;
        capsuleHeight = 42 * scale;
        fontSize = 14 * scale;
      } else {
        capsuleWidth = 140 * scale;
        capsuleHeight = 30 * scale;
        fontSize = 14 * scale;
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

      // Create capsules with enhanced physics
      bodiesRef.current = objectsData.map((obj, i) => {
        const x = spacing * (i + 1);
        const y = isMobile ? height * 0.15 : height * 0.05;
        const mobileBaseOptions = isMobile
          ? { ...baseOptions, restitution: 0.7, frictionAir: 0.025 }
          : { ...baseOptions, restitution: 0.8, frictionAir: 0.02 };

        const displayLabel = isMobile && obj.mobileLabel ? obj.mobileLabel : obj.label;

        const body = createCapsule(x, y, capsuleWidth, capsuleHeight, {
          ...mobileBaseOptions,
          fillStyle: obj.color,
          borderColor: obj.color,
          label: displayLabel,
          fontSize: fontSize,
          textColor: '#000',
          customLink: obj.link,
          fontFamily: 'customFont',
        });

        Matter.Composite.add(world, body);
        return body;
      });
    };

    const resizeCanvas = () => {
      applyHiDPI();
      recreateWorld();
    };

    // Enhanced mouse hover handling with smooth transitions
    const handleMouseMove = (event) => {
      const coords = getEventCoordinates(event);
      const hoveredBody = findBodyAtPoint(coords.x, coords.y);

      // Reset all hover states
      bodiesRef.current.forEach(body => {
        body.isHovered = false;
      });

      // Set hover state for the current body
      if (hoveredBody) {
        hoveredBody.isHovered = true;
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }

      interactionStateRef.current.hoveredBody = hoveredBody;
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
          stiffness: 0.3,
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
        const constraintBody = Matter.Bodies.circle(pointX, pointY, 5, {
          isStatic: true,
          render: { visible: false }
        });
        Matter.Composite.add(world, constraintBody);

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

      const handleTouchStart = (event) => {
        const coords = getEventCoordinates(event);
        const body = findBodyAtPoint(coords.x, coords.y);

        interactionStateRef.current.startX = coords.x;
        interactionStateRef.current.startY = coords.y;
        interactionStateRef.current.isDragging = false;
        interactionStateRef.current.currentBody = body;
        interactionStateRef.current.isInteracting = true;
        interactionStateRef.current.lastTouchTime = Date.now();

        // Set touch hover effect
        bodiesRef.current.forEach(b => b.isHovered = false);
        if (body) {
          body.isHovered = true;
          currentConstraint = createTouchConstraint(body, coords.x, coords.y);
          event.preventDefault();
        }
      };

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
          updateTouchConstraint(currentConstraint, coords.x, coords.y);
          event.preventDefault();
        }
      };

      const handleTouchEnd = (event) => {
        const touchDuration = Date.now() - interactionStateRef.current.lastTouchTime;

        if (
          !interactionStateRef.current.isDragging &&
          touchDuration < 200 &&
          interactionStateRef.current.currentBody
        ) {
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

        // Reset hover effects on touch end
        bodiesRef.current.forEach(b => b.isHovered = false);

        if (currentConstraint) {
          removeTouchConstraint(currentConstraint);
          currentConstraint = null;
        }

        interactionStateRef.current.currentBody = null;
        interactionStateRef.current.isInteracting = false;
        interactionStateRef.current.isDragging = false;
      };

      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
      canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

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
      canvas.addEventListener('mousemove', handleMouseMove);

      canvas._cleanupClick = () => {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    };

    // Initial setup
    applyHiDPI();
    recreateWorld();
    setupMatterMouseConstraint();
    setupMobileTouch();
    setupMouseClick();

    observerRef.current = new ResizeObserver(() => {
      resizeCanvas();
      setupMatterMouseConstraint();
    });
    observerRef.current.observe(canvas.parentElement);

    // Start the engine
    runnerRef.current = Matter.Runner.create();
    ensureFontLoaded('customFont').finally(() => {
      Matter.Runner.run(runnerRef.current, engine);
      renderBodies();
    });

    return () => {
      Matter.Runner.stop(runnerRef.current);
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
      observerRef.current?.disconnect();

      if (canvas._cleanupTouch) canvas._cleanupTouch();
      if (canvas._cleanupClick) canvas._cleanupClick();
    };
  }, [router]);

  return (
    <div className="">
      <div className="w-full lg:-mt-[450px] mx-auto h-[20vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-transparent "
          style={{ 
            touchAction: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        />
      </div>
      {/* <div className='h-[1px] mb-[3px] bg-black dark:bg-white'></div> */}
    </div>
  );
};

export default Hero;
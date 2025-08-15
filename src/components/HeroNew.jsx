'use client';

import React, { useEffect, useRef, useCallback } from 'react';
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

// Helper function to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const HeroNew = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const observerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const router = useRouter();
  const renderRef = useRef(null);
  const worldDimensionsRef = useRef({ width: 0, height: 0 });

  // Track interaction state
  const interactionStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentBody: null,
    isInteracting: false,
    lastTouchTime: 0,
    hoveredBody: null
  });

  // Helper functions
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const darkenColor = (hex, amount = 0.2) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) * (1 - amount));
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) * (1 - amount));
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) * (1 - amount));
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  };

  const ensureFontLoaded = async (familyName = 'customFont') => {
    if (document.fonts && document.fonts.check(`16px "${familyName}"`)) return;
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(`16px "${familyName}"`);
      } catch {
        // Fallback to sans-serif
      }
    }
  };

  // Create capsule body
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

    // Add custom properties
    Object.assign(capsule, {
      customColor: options.fillStyle || '#000',
      borderColor: options.borderColor || '#000',
      customLabel: options.label,
      fontSize: options.fontSize || 16,
      textColor: '#000000',
      customLink: options.customLink || '',
      fontFamily: options.fontFamily || 'customFont',
      isHovered: false,
      width: width,
      height: height
    });

    return capsule;
  };

  // Draw capsule function
  const drawSmoothCapsule = (ctx, x, y, width, height, angle, fillStyle, strokeStyle, isHovered) => {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.rotate(angle);

    const radius = height / 2;
    const rectWidth = width - height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Create capsule path
    ctx.beginPath();
    ctx.moveTo(-rectWidth / 2, -radius);
    ctx.lineTo(rectWidth / 2, -radius);
    ctx.arcTo(rectWidth / 2 + radius, -radius, rectWidth / 2 + radius, 0, radius);
    ctx.arcTo(rectWidth / 2 + radius, radius, rectWidth / 2, radius, radius);
    ctx.lineTo(-rectWidth / 2, radius);
    ctx.arcTo(-rectWidth / 2 - radius, radius, -rectWidth / 2 - radius, 0, radius);
    ctx.arcTo(-rectWidth / 2 - radius, -radius, -rectWidth / 2, -radius, radius);
    ctx.closePath();

    // Add shadow on hover
    if (isHovered) {
      ctx.shadowColor = darkenColor(strokeStyle, 0.3);
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
    }

    // Fill
    if (fillStyle !== 'transparent') {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Stroke
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.restore();
  };

  // Fixed coordinate conversion
  const getPhysicsCoordinates = useCallback((clientX, clientY) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const { width, height } = worldDimensionsRef.current;
    
    // Convert screen coordinates to physics world coordinates
    const x = ((clientX - rect.left) / rect.width) * width;
    const y = ((clientY - rect.top) / rect.height) * height;
    
    return { x, y };
  }, []);

  // Get event coordinates
  const getEventCoordinates = useCallback((event) => {
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

    return getPhysicsCoordinates(clientX, clientY);
  }, [getPhysicsCoordinates]);

  // Find body at point
  const findBodyAtPoint = useCallback((x, y) => {
    for (const body of bodiesRef.current) {
      if (Matter.Bounds.contains(body.bounds, { x, y }) &&
          Matter.Vertices.contains(body.vertices, { x, y })) {
        return body;
      }
    }
    return null;
  }, []);

  // Setup canvas with proper scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set logical dimensions (physics world size)
    const logicalWidth = containerRect.width;
    const logicalHeight = containerRect.height;
    
    // Store world dimensions
    worldDimensionsRef.current = { 
      width: logicalWidth, 
      height: logicalHeight 
    };

    // Set canvas display size
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;

    // Set canvas actual size (for HiDPI)
    canvas.width = Math.round(logicalWidth * dpr);
    canvas.height = Math.round(logicalHeight * dpr);

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    return { width: logicalWidth, height: logicalHeight, ctx };
  }, []);

  // Create world with randomized capsule positions
  const createWorld = useCallback(() => {
    if (!engineRef.current) return;

    const { width, height } = worldDimensionsRef.current;
    if (width === 0 || height === 0) return;

    const world = engineRef.current.world;
    
    // Clear existing world
    Matter.Composite.clear(world, false);
    bodiesRef.current = [];

    // Calculate dimensions
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
      capsuleWidth = 170 * scale;
      capsuleHeight = 35 * scale;
      fontSize = 14 * scale;
    }

    // Create boundaries
    const wallThickness = 50;
    const floorOffset = 10;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height - floorOffset + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ];
    Matter.Composite.add(world, walls);

    // Create capsules with shuffled positions and random y-offsets
    const baseOptions = { restitution: 0.8, frictionAir: 0.02 };
    
    // Shuffle the objectsData array
    const shuffledObjects = shuffleArray(objectsData);
    
    bodiesRef.current = shuffledObjects.map((obj, i) => {
      const x = spacing * (i + 1);
      // Add random y-position offset (-20 to +20 pixels)
      const y = (isMobile ? height * 0.15 : height * 0.05) + (Math.random() * 40 - 20);
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

    // Setup mouse constraint with proper coordinate handling
    if (mouseConstraintRef.current) {
      Matter.Composite.remove(world, mouseConstraintRef.current);
    }

    const mouse = Matter.Mouse.create(canvasRef.current);
    mouse.pixelRatio = window.devicePixelRatio || 1;
    
    // Custom mouse position handling for zoom compatibility
    const updateMousePosition = (clientX, clientY) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const { width: worldWidth, height: worldHeight } = worldDimensionsRef.current;
      
      mouse.position.x = ((clientX - rect.left) / rect.width) * worldWidth;
      mouse.position.y = ((clientY - rect.top) / rect.height) * worldHeight;
      
      mouse.absolute.x = clientX;
      mouse.absolute.y = clientY;
    };

    // Override mouse event handling
    const originalMouseMove = mouse.mousemove;
    mouse.mousemove = function(event) {
      updateMousePosition(event.clientX, event.clientY);
    };

    const originalMouseDown = mouse.mousedown;
    mouse.mousedown = function(event) {
      updateMousePosition(event.clientX, event.clientY);
    };

    const originalMouseUp = mouse.mouseup;
    mouse.mouseup = function(event) {
      updateMousePosition(event.clientX, event.clientY);
    };

    const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        damping: 0.1,
        render: { visible: false }
      }
    });

    Matter.Composite.add(world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;
  }, []);

  // Render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bodiesRef.current.length) {
      renderRef.current = requestAnimationFrame(render);
      return;
    }

    const ctx = canvas.getContext('2d');
    const { width, height } = worldDimensionsRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Render bodies
    bodiesRef.current.forEach((body) => {
      const { position, angle } = body;
      const backgroundColor = body.isHovered 
        ? hexToRgba(body.customColor, 0.15) 
        : 'transparent';

      // Draw capsule
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

      // Draw text
      ctx.save();
      ctx.translate(Math.round(position.x), Math.round(position.y));
      ctx.rotate(angle);
      
      ctx.fillStyle = body.textColor;
      const family = body.fontFamily || 'customFont';
      const size = body.fontSize || 16;
      ctx.font = `${size}px "${family}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (body.isHovered) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0.5;
      }
      
      ctx.fillText(body.customLabel, 0, 0);
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.restore();
    });

    renderRef.current = requestAnimationFrame(render);
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const result = setupCanvas();
    if (result) {
      createWorld();
    }
  }, [setupCanvas, createWorld]);

  // Mouse move handler
  const handleMouseMove = useCallback((event) => {
    const coords = getEventCoordinates(event);
    const hoveredBody = findBodyAtPoint(coords.x, coords.y);

    bodiesRef.current.forEach(body => {
      body.isHovered = false;
    });

    if (hoveredBody) {
      hoveredBody.isHovered = true;
      canvasRef.current.style.cursor = 'pointer';
    } else {
      canvasRef.current.style.cursor = 'default';
    }

    interactionStateRef.current.hoveredBody = hoveredBody;
  }, [getEventCoordinates, findBodyAtPoint]);

  // Click handler
  const handleClick = useCallback((event) => {
    const coords = getEventCoordinates(event);
    const body = findBodyAtPoint(coords.x, coords.y);

    if (body && body.customLink) {
      if (body.customLink.startsWith('http')) {
        window.open(body.customLink, '_blank');
      } else {
        router.push(body.customLink);
      }
    }
  }, [getEventCoordinates, findBodyAtPoint, router]);

  // Touch handlers with improved dragging
  const handleTouchStart = useCallback((event) => {
    const coords = getEventCoordinates(event);
    const body = findBodyAtPoint(coords.x, coords.y);

    interactionStateRef.current = {
      ...interactionStateRef.current,
      startX: coords.x,
      startY: coords.y,
      isDragging: false,
      currentBody: body,
      isInteracting: true,
      lastTouchTime: Date.now(),
      touchConstraint: null
    };

    bodiesRef.current.forEach(b => b.isHovered = false);
    if (body) {
      body.isHovered = true;
      
      // Create touch constraint for dragging
      const constraintBody = Matter.Bodies.circle(coords.x, coords.y, 5, {
        isStatic: true,
        render: { visible: false }
      });
      Matter.Composite.add(engineRef.current.world, constraintBody);

      const constraint = Matter.Constraint.create({
        bodyA: constraintBody,
        bodyB: body,
        pointB: { x: 0, y: 0 },
        stiffness: 0.8,
        damping: 0.1,
        render: { visible: false }
      });

      Matter.Composite.add(engineRef.current.world, constraint);
      interactionStateRef.current.touchConstraint = { constraint, constraintBody };
      
      event.preventDefault();
    }
  }, [getEventCoordinates, findBodyAtPoint]);

  const handleTouchMove = useCallback((event) => {
    if (!interactionStateRef.current.isInteracting) return;

    const coords = getEventCoordinates(event);
    const dx = coords.x - interactionStateRef.current.startX;
    const dy = coords.y - interactionStateRef.current.startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      interactionStateRef.current.isDragging = true;
    }

    // Update touch constraint position
    if (interactionStateRef.current.touchConstraint && interactionStateRef.current.currentBody) {
      const { constraintBody } = interactionStateRef.current.touchConstraint;
      Matter.Body.setPosition(constraintBody, { x: coords.x, y: coords.y });
      event.preventDefault();
    }
  }, [getEventCoordinates]);

  const handleTouchEnd = useCallback((event) => {
    const touchDuration = Date.now() - interactionStateRef.current.lastTouchTime;

    // Handle click if not dragging
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

    // Clean up touch constraint
    if (interactionStateRef.current.touchConstraint) {
      const { constraint, constraintBody } = interactionStateRef.current.touchConstraint;
      Matter.Composite.remove(engineRef.current.world, constraint);
      Matter.Composite.remove(engineRef.current.world, constraintBody);
    }

    // Reset states
    bodiesRef.current.forEach(b => b.isHovered = false);
    interactionStateRef.current = {
      ...interactionStateRef.current,
      currentBody: null,
      isInteracting: false,
      isDragging: false,
      touchConstraint: null
    };
  }, [router]);

  useEffect(() => {
    // Initialize engine
    engineRef.current = Matter.Engine.create();
    engineRef.current.gravity.y = 0.2;

    // Setup canvas and world
    const result = setupCanvas();
    if (result) {
      createWorld();
    }

    // Setup event listeners
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    // Setup resize observer
    observerRef.current = new ResizeObserver(handleResize);
    observerRef.current.observe(canvas.parentElement);

    // Setup viewport change listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Start engine and rendering
    runnerRef.current = Matter.Runner.create();
    ensureFontLoaded('customFont').then(() => {
      Matter.Runner.run(runnerRef.current, engineRef.current);
      render();
    });

    return () => {
      // Cleanup
      if (renderRef.current) {
        cancelAnimationFrame(renderRef.current);
      }
      
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }

      observerRef.current?.disconnect();
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);

      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [setupCanvas, createWorld, handleResize, handleMouseMove, handleClick, handleTouchStart, handleTouchMove, handleTouchEnd, render]);

  return (
    <div className="">
      <div className="w-full -mt-[50px] sm:-mt-[200px] lg:-mt-[400px] 2xl:-mt-[480px] mx-auto h-[25vh] sm:h-[35vh] md:h-[40vh] lg:h-[60vh] xl:h-[80vh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-transparent"
          style={{ 
            touchAction: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        />
      </div>
      <div className='h-[3px] bg-black'></div>
    </div>
  );
};

export default HeroNew;
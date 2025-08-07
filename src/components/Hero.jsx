'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useRouter } from 'next/navigation';

const objectsData = [
  { id: 1, label: 'Image Editing', color: '#22c55e', link: '/shape/circle' },
  { id: 2, label: 'Video Editing', color: '#22c55e', link: '/shape/rectangle' },
  { id: 3, label: '3D Modeling', color: '#22c55e', link: '/shape/triangle' },
  { id: 4, label: 'CGI Rendering', color: '#22c55e', link: 'https://youtube.com' },
 
 
];

const Hero = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const mouseConstraintRef = useRef(null);
  const observerRef = useRef(null);
  const router = useRouter();

  // Track mouse state
  const mouseStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentBody: null
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

  useEffect(() => {
    // Initialize engine
    engineRef.current = Matter.Engine.create();
    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = .4;

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

      // Walls
      const wallThickness = 50;
      const walls = [
        Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
        Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      ];
      Matter.Composite.add(world, walls);

      // Capsules
      bodiesRef.current = objectsData.map((obj, i) => {
        const x = spacing * (i + 1);
        const y = 0;
        const body = createCapsule(x, y, 200 * scale, 40 * scale, {
          ...baseOptions,
          fillStyle: obj.color,
          label: obj.label,
          fontSize: 16 * scale,
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

    // Setup mouse control
    const setupMouseControl = () => {
      if (mouseConstraintRef.current) {
        Matter.Composite.remove(world, mouseConstraintRef.current);
      }

      const mouse = Matter.Mouse.create(canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

      mouse.element = canvas;
      mouse.pixelRatio = window.devicePixelRatio;
      Matter.Composite.add(world, mouseConstraint);
      mouseConstraintRef.current = mouseConstraint;

      // Mouse down event
      canvas.addEventListener('mousedown', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        mouseStateRef.current.startX = mouseX;
        mouseStateRef.current.startY = mouseY;
        mouseStateRef.current.isDragging = false;
        mouseStateRef.current.currentBody = null;

        // Find which body was clicked
        for (const body of bodiesRef.current) {
          if (
            Matter.Bounds.contains(body.bounds, { x: mouseX, y: mouseY }) &&
            Matter.Vertices.contains(body.vertices, { x: mouseX, y: mouseY })
          ) {
            mouseStateRef.current.currentBody = body;
            break;
          }
        }
      });

      // Mouse move event - detect dragging
      canvas.addEventListener('mousemove', (event) => {
        if (mouseStateRef.current.currentBody) {
          const rect = canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;
          
          // Check if mouse has moved more than 5 pixels (drag threshold)
          const dx = mouseX - mouseStateRef.current.startX;
          const dy = mouseY - mouseStateRef.current.startY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 5) {
            mouseStateRef.current.isDragging = true;
          }
        }
      });

      // Mouse up event - handle click if not dragging
      canvas.addEventListener('mouseup', (event) => {
        if (mouseStateRef.current.currentBody && !mouseStateRef.current.isDragging) {
          const body = mouseStateRef.current.currentBody;
          if (body.customLink) {
            if (body.customLink.startsWith('http')) {
              window.open(body.customLink, '_blank');
            } else {
              router.push(body.customLink);
            }
          }
        }
        mouseStateRef.current.currentBody = null;
      });

      // Prevent default events that might interfere
      canvas.addEventListener('mousewheel', (e) => e.preventDefault());
      canvas.addEventListener('DOMMouseScroll', (e) => e.preventDefault());
    };

    // Initial setup
    resizeCanvas();
    setupMouseControl();
    
    observerRef.current = new ResizeObserver(() => {
      resizeCanvas();
      setupMouseControl();
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
      canvas.removeEventListener('mousedown', () => {});
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mouseup', () => {});
      canvas.removeEventListener('mousewheel', () => {});
      canvas.removeEventListener('DOMMouseScroll', () => {});
    };
  }, [router]);

  return (
    <div className="">
     
      <div className="w-full -mt-[450px]  mx-auto h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-white dark:bg-black border-2 border-white dark:border-black touch-none"
        />
      </div>
     <div className='h-[1px] mb-[3px] bg-black dark:bg-white'>

     </div>
     <div className='h-[1px] mb-[3px] bg-black dark:bg-white'>

     </div>
     <div className='h-[1px] mb-[3px] bg-black dark:bg-white'>

     </div>
     
    </div>
  );
};

export default Hero;
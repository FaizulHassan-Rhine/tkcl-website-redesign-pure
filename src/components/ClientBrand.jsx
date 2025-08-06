"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useRouter } from "next/navigation";

const objectsData = [
  {
    id: 1,
    label: "Adidas",
    color: "#22c55e",
    link: "https://www.adidas.com",
    image:
      "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo-1991-present.jpg", // Relative path if served via public/
  },
  {
    id: 2,
    label: "Image Editing",
    color: "#22c55e",
    link: "/shape/circle",
  },
  {
    id: 3,
    label: "Video Editing",
    color: "#22c55e",
    link: "/shape/rectangle",
  },
  {
    id: 4,
    label: "3D Modeling",
    color: "#22c55e",
    link: "/shape/triangle",
  },
  {
    id: 5,
    label: "CGI Rendering",
    color: "#22c55e",
    link: "https://youtube.com",
  },
];

const ClientBrand = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const mouseConstraintRef = useRef(null);
  const observerRef = useRef(null);
  const router = useRouter();

  const mouseStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentBody: null,
  });

  const createCapsule = (x, y, width, height, options) => {
    const radius = height / 2;
    const rect = Matter.Bodies.rectangle(x, y, width - height, height, options);
    const left = Matter.Bodies.circle(
      x - (width - height) / 2,
      y,
      radius,
      options
    );
    const right = Matter.Bodies.circle(
      x + (width - height) / 2,
      y,
      radius,
      options
    );
    const capsule = Matter.Body.create({
      parts: [left, rect, right],
      restitution: options.restitution,
      frictionAir: options.frictionAir,
      label: options.label,
    });

    capsule.customColor = options.fillStyle || "#000";
    capsule.customLabel = options.label;
    capsule.fontSize = options.fontSize || 16;
    capsule.textColor = options.textColor || "#fff";
    capsule.customLink = options.customLink || "";
    capsule.imageUrl = options.imageUrl || null;
    capsule.imageObj = null;

    if (capsule.imageUrl) {
      const img = new Image();
      img.src = capsule.imageUrl;
      capsule.imageObj = img;
    }

    return capsule;
  };

  useEffect(() => {
    engineRef.current = Matter.Engine.create();
    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = 0.4;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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

        // Draw image or text
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        if (body.imageObj && body.imageObj.complete) {
          const iw = 80;
          const ih = 30;
          ctx.drawImage(body.imageObj, -iw / 2, -ih / 2, iw, ih);
        } else {
          ctx.fillStyle = body.textColor;
          ctx.font = `${body.fontSize}px Arial`;
          ctx.textAlign = "center";
          ctx.fillText(body.customLabel, 0, 5);
        }

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

      const wallThickness = 50;
      const walls = [
        Matter.Bodies.rectangle(
          width / 2,
          height + wallThickness / 2,
          width,
          wallThickness,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          width / 2,
          -wallThickness / 2,
          width,
          wallThickness,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          height / 2,
          wallThickness,
          height,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          width + wallThickness / 2,
          height / 2,
          wallThickness,
          height,
          { isStatic: true }
        ),
      ];
      Matter.Composite.add(world, walls);

      bodiesRef.current = objectsData.map((obj, i) => {
        const x = spacing * (i + 1);
        const y = 0;
        const body = createCapsule(x, y, 110 * scale, 50 * scale, {
          ...baseOptions,
          fillStyle: obj.color,
          label: obj.label,
          fontSize: 16 * scale,
          textColor: "#fff",
          customLink: obj.link,
          imageUrl: obj.image ? obj.image : null,
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

    const setupMouseControl = () => {
      if (mouseConstraintRef.current) {
        Matter.Composite.remove(world, mouseConstraintRef.current);
      }

      const mouse = Matter.Mouse.create(canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      mouse.element = canvas;
      mouse.pixelRatio = window.devicePixelRatio;
      Matter.Composite.add(world, mouseConstraint);
      mouseConstraintRef.current = mouseConstraint;

      canvas.addEventListener("mousedown", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        mouseStateRef.current.startX = mouseX;
        mouseStateRef.current.startY = mouseY;
        mouseStateRef.current.isDragging = false;
        mouseStateRef.current.currentBody = null;

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

      canvas.addEventListener("mousemove", (event) => {
        if (mouseStateRef.current.currentBody) {
          const rect = canvas.getBoundingClientRect();
          const dx = event.clientX - rect.left - mouseStateRef.current.startX;
          const dy = event.clientY - rect.top - mouseStateRef.current.startY;
          if (Math.sqrt(dx * dx + dy * dy) > 5) {
            mouseStateRef.current.isDragging = true;
          }
        }
      });

      canvas.addEventListener("mouseup", () => {
        const body = mouseStateRef.current.currentBody;
        if (body && !mouseStateRef.current.isDragging && body.customLink) {
          if (body.customLink.startsWith("http")) {
            window.open(body.customLink, "_blank");
          } else {
            router.push(body.customLink);
          }
        }
        mouseStateRef.current.currentBody = null;
      });

      canvas.addEventListener("mousewheel", (e) => e.preventDefault());
      canvas.addEventListener("DOMMouseScroll", (e) => e.preventDefault());
    };

    resizeCanvas();
    setupMouseControl();

    observerRef.current = new ResizeObserver(() => {
      resizeCanvas();
      setupMouseControl();
    });
    observerRef.current.observe(canvas.parentElement);

    runnerRef.current = Matter.Runner.create();
    Matter.Runner.run(runnerRef.current, engine);
    renderBodies();

    return () => {
      Matter.Runner.stop(runnerRef.current);
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
      observerRef.current?.disconnect();
    };
  }, [router]);

  return (
    <div>
    <div className="w-full px-4 sm:px-8  mx-auto mt-16 ">
    <p className="text-[36px] sm:text-[64px] md:text-[100px] leading-[110%] font-semibold text-black dark:text-white">
      <span className="text-green-500">Client:</span> Helping brands to grow and say their success stories to the world.
    </p>
  </div>

  {/* Canvas Container */}
  <div className="w-full  relative mx-auto h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
    
    {/* ✨ Yellow mark in center */}
    

    {/* ✨ Center text paragraph */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <p className="text-center text-lg sm:text-xl md:text-2xl text-white dark:text-white px-4 max-w-2xl">
       We’re a great team of creatives with a strongest capabilities to helping progressive fields achieve their goals. With the best talent on every project done successfully
      </p>
    </div>

    {/* Canvas Layer */}
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-white dark:bg-black border-2 border-white dark:border-black touch-none"
    />
  </div>
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
      <div className="h-[1px] mb-[3px] bg-black dark:bg-white" />
    </div>
  );
};

export default ClientBrand;

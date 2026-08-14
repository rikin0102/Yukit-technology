'use client';

import React, { useEffect, useRef } from 'react';

export const GlobalScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobileDevice = false;
    let lastWidth = 0;

    // Idle suspension state
    let lastActiveTime = Date.now();
    let isAnimating = true;

    // Scroll state tracking
    const scrollState = {
      currentY: window.scrollY || 0,
      targetY: window.scrollY || 0,
      velocity: 0,
      lastY: window.scrollY || 0,
      normalizedProgress: 0,
    };

    // Mouse state tracking
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
    };

    // Software & AI Glyphs for ambient floating tech layer
    const techTokens = [
      '</>',
      '{ }',
      'AI',
      'λ',
      'async',
      '0101',
      'f(x)',
      'tensor()',
      '=>',
      '// neural',
      'const',
      'git push',
      '[ ... ]',
      'Promise',
      'npm',
      'def run()',
      'API',
      '⚡',
      'ML',
      '01',
      'connect()',
      'deploy()',
    ];

    interface TechParticle {
      text: string;
      x: number;
      baseY: number;
      depth: number; // 0.2 to 1 (controls parallax scroll speed & opacity)
      speedX: number;
      speedY: number;
      size: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      color: string;
    }

    interface NeuralNode {
      x: number;
      baseY: number;
      depth: number;
      radius: number;
      colorType: 'saffron' | 'teal' | 'blue' | 'navy';
      vx: number;
      vy: number;
      pulsePhase: number;
      connections: number[];
    }

    interface DataPulse {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    let techParticles: TechParticle[] = [];
    let neuralNodes: NeuralNode[] = [];
    let dataPulses: DataPulse[] = [];

    const brandColors = {
      saffron: { rgb: '255, 122, 0', hex: '#FF7A00' },
      teal: { rgb: '13, 148, 136', hex: '#0D9488' },
      blue: { rgb: '37, 99, 235', hex: '#2563EB' },
      navy: { rgb: '15, 23, 42', hex: '#0F172A' },
    };

    const colorTypes: ('saffron' | 'teal' | 'blue' | 'navy')[] = [
      'teal',
      'saffron',
      'blue',
      'teal',
      'blue',
    ];

    const initEntities = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Strict regex matching for Android and iOS mobile platforms
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      isMobileDevice = width < 768 || isAndroid || isIOS;
      
      // Optimize device pixel ratio to save GPU cycles and battery on mobiles & tablets
      dpr = isMobileDevice ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // 1. Initialize Neural Network Nodes (optimized counts for mobile devices)
      const maxNodesCount = isMobileDevice ? 12 : 45;
      const nodeDensityDivisor = isMobileDevice ? 36000 : 30000;
      const nodeCount = Math.min(Math.floor((width * height) / nodeDensityDivisor), maxNodesCount);
      
      neuralNodes = [];

      for (let i = 0; i < nodeCount; i++) {
        const colorType = colorTypes[i % colorTypes.length];
        const depth = 0.25 + Math.random() * 0.75;
        neuralNodes.push({
          x: Math.random() * width,
          baseY: Math.random() * (height + 600) - 300,
          depth,
          radius: (1.2 + Math.random() * 2.2) * depth,
          colorType,
          vx: (Math.random() - 0.5) * (isMobileDevice ? 0.15 : 0.25),
          vy: (Math.random() - 0.5) * (isMobileDevice ? 0.15 : 0.25),
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }

      // Pre-calculate connections
      const maxConnections = isMobileDevice ? 2 : 3;
      const maxDistance = isMobileDevice ? 120 : 200;

      for (let i = 0; i < neuralNodes.length; i++) {
        const distances: { index: number; dist: number }[] = [];
        for (let j = 0; j < neuralNodes.length; j++) {
          if (i === j) continue;
          const dx = neuralNodes[i].x - neuralNodes[j].x;
          const dy = neuralNodes[i].baseY - neuralNodes[j].baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            distances.push({ index: j, dist });
          }
        }
        distances.sort((a, b) => a.dist - b.dist);
        neuralNodes[i].connections = distances.slice(0, maxConnections).map((d) => d.index);
      }

      // 2. Initialize Floating Tech Tokens
      const maxParticlesCount = isMobileDevice ? 8 : 24;
      const particleDensityDivisor = isMobileDevice ? 100 : 60;
      const particleCount = Math.min(Math.floor(width / particleDensityDivisor), maxParticlesCount);
      
      techParticles = [];

      for (let i = 0; i < particleCount; i++) {
        const depth = 0.2 + Math.random() * 0.8;
        const colorType = colorTypes[i % colorTypes.length];
        techParticles.push({
          text: techTokens[Math.floor(Math.random() * techTokens.length)],
          x: Math.random() * width,
          baseY: Math.random() * (height + 800) - 400,
          depth,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          size: Math.floor((isMobileDevice ? 8 : 10) + depth * (isMobileDevice ? 4 : 6)),
          opacity: (isMobileDevice ? 0.07 : 0.1) + depth * 0.25,
          rotation: (Math.random() - 0.5) * 0.4,
          rotSpeed: (Math.random() - 0.5) * 0.002,
          color: brandColors[colorType].rgb,
        });
      }

      // 3. Initialize Data Pulses
      dataPulses = [];
      const pulseCount = isMobileDevice ? 2 : 6;

      for (let i = 0; i < pulseCount; i++) {
        const fromIndex = Math.floor(Math.random() * neuralNodes.length);
        const node = neuralNodes[fromIndex];
        if (node && node.connections.length > 0) {
          const toIndex =
            node.connections[Math.floor(Math.random() * node.connections.length)];
          dataPulses.push({
            fromIndex,
            toIndex,
            progress: Math.random(),
            speed: (isMobileDevice ? 0.005 : 0.003) + Math.random() * 0.007,
            color: brandColors[node.colorType].hex,
          });
        }
      }
    };

    lastWidth = window.innerWidth;
    initEntities();

    // Wake up animation rendering loop when user interacts
    const keepAlive = () => {
      lastActiveTime = Date.now();
      if (!isAnimating) {
        isAnimating = true;
        render();
      }
    };

    // Event Listeners
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
      // Stop recalculating coordinates on vertical-only resize (fixes address-bar flickering on mobile scroll)
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        initEntities();
      } else {
        // Just adapt canvas dimensions without regenerating coordinate arrays
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
      keepAlive();
    };

    const handleScroll = () => {
      scrollState.targetY = window.scrollY || window.pageYOffset || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      scrollState.normalizedProgress =
        docHeight > 0 ? scrollState.targetY / docHeight : 0;
      keepAlive();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      keepAlive();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
        keepAlive();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Main optimized Render Loop
    const render = () => {
      if (!isAnimating) return;

      const now = Date.now();
      const elapsedSinceActive = now - lastActiveTime;

      // Smooth Scroll Interpolation (Lerp with Momentum)
      const prevY = scrollState.currentY;
      scrollState.currentY += (scrollState.targetY - scrollState.currentY) * 0.09;
      scrollState.velocity = scrollState.currentY - prevY;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Idle Suspension: pause rendering loop completely if user is inactive and momentum stops
      if (elapsedSinceActive > 4000 && Math.abs(scrollState.velocity) < 0.05 && !mouse.active) {
        isAnimating = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const scrollDelta = scrollState.currentY;
      const velocityBonus = Math.min(Math.abs(scrollState.velocity) * 0.04, 1.5);

      // --- LAYER 1: Subtle Animated Perspective Tech Matrix Grid ---
      const gridSpacing = isMobileDevice ? 96 : 64;
      const gridScrollOffset = (scrollDelta * 0.35) % gridSpacing;

      ctx.save();
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';

      // Vertical tech grid lines
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal tech grid lines drifting smoothly with scroll
      for (let y = -gridSpacing + gridScrollOffset; y <= height + gridSpacing; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- LAYER 2: Floating Software & AI Glyphs with Scroll Parallax ---
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      techParticles.forEach((p) => {
        p.x += p.speedX;
        p.baseY += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;

        const parallaxY = (p.baseY - scrollDelta * p.depth * 0.45) % (height + 400);
        const y = parallaxY < -100 ? parallaxY + height + 500 : parallaxY;

        let alpha = p.opacity;
        let scale = 1;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const factor = 1 - dist / 180;
            alpha = Math.min(0.9, p.opacity + factor * 0.5);
            scale = 1 + factor * 0.25;
          }
        }

        ctx.save();
        ctx.translate(p.x, y);
        ctx.rotate(p.rotation);
        ctx.scale(scale, scale);

        ctx.font = `600 ${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fillText(p.text, 0, 0);

        ctx.restore();
      });
      ctx.restore();

      // --- LAYER 3: Neural Network Synaptic Connections & Node Web ---
      ctx.save();

      const computedNodes = neuralNodes.map((node) => {
        node.x += node.vx;
        node.baseY += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;

        const parallaxY = (node.baseY - scrollDelta * node.depth * 0.55) % (height + 400);
        const y = parallaxY < -100 ? parallaxY + height + 500 : parallaxY;

        node.pulsePhase += 0.02 + velocityBonus * 0.01;
        const pulse = Math.sin(node.pulsePhase) * 0.35 + 0.65;

        let isHighlighted = false;
        let proximityBoost = 0;
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (isMobileDevice ? 120 : 200)) {
            proximityBoost = 1 - dist / (isMobileDevice ? 120 : 200);
            isHighlighted = true;
          }
        }

        return {
          ...node,
          currentY: y,
          pulse,
          proximityBoost,
          isHighlighted,
        };
      });

      // Draw Synaptic Connection Lines
      const lineDistanceLimit = isMobileDevice ? 120 : 200;
      for (let i = 0; i < computedNodes.length; i++) {
        const n1 = computedNodes[i];
        if (!n1.connections) continue;

        for (const connIdx of n1.connections) {
          if (connIdx <= i || connIdx >= computedNodes.length) continue;
          const n2 = computedNodes[connIdx];

          const dx = n1.x - n2.x;
          const dy = n1.currentY - n2.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < lineDistanceLimit) {
            const baseAlpha = (1 - dist / lineDistanceLimit) * 0.18 * n1.depth;
            const activeAlpha = baseAlpha + (n1.proximityBoost + n2.proximityBoost) * 0.45;
            const lineAlpha = Math.min(0.85, activeAlpha);

            const grad = ctx.createLinearGradient(n1.x, n1.currentY, n2.x, n2.currentY);
            const color1 = brandColors[n1.colorType].rgb;
            const color2 = brandColors[n2.colorType].rgb;

            grad.addColorStop(0, `rgba(${color1}, ${lineAlpha})`);
            grad.addColorStop(1, `rgba(${color2}, ${lineAlpha})`);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.currentY);
            ctx.lineTo(n2.x, n2.currentY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (n1.isHighlighted || n2.isHighlighted) ? 1.5 : 0.8;
            ctx.stroke();
          }
        }
      }

      // --- LAYER 4: Animated AI Data Stream Pulses traveling along network paths ---
      dataPulses.forEach((pulse) => {
        pulse.progress += pulse.speed + velocityBonus * 0.008;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromIndex = Math.floor(Math.random() * computedNodes.length);
          const fromNode = computedNodes[pulse.fromIndex];
          if (fromNode && fromNode.connections.length > 0) {
            pulse.toIndex =
              fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
            pulse.color = brandColors[fromNode.colorType].hex;
          }
        }

        const n1 = computedNodes[pulse.fromIndex];
        const n2 = computedNodes[pulse.toIndex];

        if (n1 && n2) {
          const px = n1.x + (n2.x - n1.x) * pulse.progress;
          const py = n1.currentY + (n2.currentY - n1.currentY) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5 * n1.depth, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          
          if (!isMobileDevice) {
            ctx.shadowColor = pulse.color;
            ctx.shadowBlur = 8;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // --- LAYER 5: Draw Neural Nodes & Halo Rings ---
      computedNodes.forEach((node) => {
        const { x, currentY: y, radius, colorType, pulse, proximityBoost, isHighlighted } = node;
        const color = brandColors[colorType];

        if (isHighlighted || pulse > 0.8) {
          ctx.beginPath();
          ctx.arc(x, y, radius + (isHighlighted ? 7 * proximityBoost : 4), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color.rgb}, ${isHighlighted ? 0.6 : 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.5, radius * (0.85 + pulse * 0.3)), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb}, ${0.45 + proximityBoost * 0.55})`;

        if (isHighlighted && !isMobileDevice) {
          ctx.shadowColor = color.hex;
          ctx.shadowBlur = 12 * proximityBoost;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 h-full w-full pointer-events-none z-0 overflow-hidden bg-[#F8FAFC]"
      aria-hidden="true"
    >
      {/* Light Theme High-Craft Atmospheric AI Glows in Brand Colors */}
      <div className="absolute top-[-10%] left-[-5%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-[#FF7A00]/8 via-[#FF7A00]/4 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] h-[45rem] w-[45rem] rounded-full bg-gradient-to-bl from-[#2563EB]/6 via-[#3B82F6]/3 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[25%] h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-[#0D9488]/8 via-[#14B8A6]/4 to-transparent blur-3xl pointer-events-none" />

      {/* High-Performance Hardware-Accelerated 2D/3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none block"
      />
    </div>
  );
};

export default GlobalScrollBackground;

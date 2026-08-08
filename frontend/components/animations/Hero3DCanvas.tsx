'use client';

import React, { useRef, useState, useEffect } from 'react';

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface FloatingCodeSnippet {
  x: number;
  y: number;
  vy: number;
  text: string;
  opacity: number;
  color: string;
}

export const Hero3DCanvas: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const cellSize = 55;

    // AI Neural Colors
    const colors = [
      'rgba(201, 106, 0, 0.75)',  // Deep Bhagwa
      'rgba(212, 160, 23, 0.75)',  // Temple Gold
      'rgba(21, 101, 192, 0.75)',  // Peacock Blue
      'rgba(30, 27, 75, 0.65)',   // Midnight Indigo
    ];

    // Neural Network Nodes
    const nodeCount = 38;
    const nodes: NeuralNode[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Floating Cyber Code Snippets
    const codeTexts = [
      '<AI.NeuralEngine />',
      'embeddings.vector_search()',
      'model.predict(latency="8.4ms")',
      'async def llm_stream()',
      'kube.autoscale(min=3, max=50)',
      'jwt.verify(token)',
      'fastapi.route("/api/v1/infer")',
      'tensor.eval(gpu_id=0)',
      'postgres.pgvector.query()',
      'agent.think(context)',
    ];

    const codeSnippets: FloatingCodeSnippet[] = Array.from({ length: 9 }, (_, i) => ({
      x: Math.random() * (window.innerWidth - 200) + 50,
      y: Math.random() * window.innerHeight,
      vy: -(Math.random() * 0.35 + 0.15),
      text: codeTexts[i % codeTexts.length],
      opacity: Math.random() * 0.25 + 0.15,
      color: i % 2 === 0 ? 'rgba(201, 106, 0, 0.55)' : 'rgba(21, 101, 192, 0.55)',
    }));

    let pulseProgress = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;

      const width = canvas.width;
      const height = canvas.height;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      pulseProgress += 0.02;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Cyber Tech Grid Lines
      ctx.strokeStyle = 'rgba(30, 27, 75, 0.035)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Cursor Active Grid Cell Highlight
      const glowRadius = 190;
      const startCol = Math.max(0, Math.floor((mouseX - glowRadius) / cellSize));
      const endCol = Math.min(Math.ceil(width / cellSize), Math.ceil((mouseX + glowRadius) / cellSize));
      const startRow = Math.max(0, Math.floor((mouseY - glowRadius) / cellSize));
      const endRow = Math.min(Math.ceil(height / cellSize), Math.ceil((mouseY + glowRadius) / cellSize));

      for (let col = startCol; col <= endCol; col++) {
        for (let row = startRow; row <= endRow; row++) {
          const cellCenterX = col * cellSize + cellSize / 2;
          const cellCenterY = row * cellSize + cellSize / 2;
          const dist = Math.hypot(mouseX - cellCenterX, mouseY - cellCenterY);

          if (dist < glowRadius) {
            const intensity = Math.pow(1 - dist / glowRadius, 1.8);

            ctx.fillStyle = `rgba(201, 106, 0, ${intensity * 0.12})`;
            ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 1, cellSize - 1);

            ctx.strokeStyle = `rgba(201, 106, 0, ${intensity * 0.35})`;
            ctx.lineWidth = 1.2;
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }

      // 3. Render Floating Cyber Code Snippets
      ctx.font = '10px "Fira Code", monospace, SFMono-Regular';
      codeSnippets.forEach((snippet) => {
        snippet.y += snippet.vy;
        if (snippet.y < -30) {
          snippet.y = height + 30;
          snippet.x = Math.random() * (width - 200) + 50;
        }

        ctx.fillStyle = snippet.color;
        ctx.globalAlpha = snippet.opacity;
        ctx.fillText(snippet.text, snippet.x, snippet.y);
        ctx.globalAlpha = 1.0;
      });

      // 4. Update Node Positions & Draw AI Neural Network Connections
      const maxConnectDist = 135;

      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Gentle attraction to cursor if mouse is nearby
        const distToMouse = Math.hypot(mouseX - node.x, mouseY - node.y);
        if (distToMouse < 180) {
          const pull = (180 - distToMouse) * 0.0004;
          node.x += (mouseX - node.x) * pull;
          node.y += (mouseY - node.y) * pull;
        }

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22;
            ctx.strokeStyle = `rgba(201, 106, 0, ${alpha})`;
            ctx.lineWidth = 0.85;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Animated Data Pulse moving along neural connection
            if (dist < 90 && Math.sin(pulseProgress + i + j) > 0.6) {
              const pulsePos = (Math.sin(pulseProgress * 2 + i) + 1) / 2;
              const px = node.x + (other.x - node.x) * pulsePos;
              const py = node.y + (other.y - node.y) * pulsePos;

              ctx.fillStyle = '#D4A017';
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Draw Node Core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none hero-canvas-container">
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};

export default Hero3DCanvas;

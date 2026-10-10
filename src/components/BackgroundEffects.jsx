import { useEffect, useRef } from 'react';

export default function BackgroundEffects({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };
    window.addEventListener('resize', onResize);

    // Mouse tracking with inertia
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    // Dynamic Nodes / Interactive Constellation Mesh
    let nodes = [];
    const count = Math.min(Math.floor((width * height) / 14000), 100);

    const initNodes = () => {
      nodes = [];
      const isDark = theme === 'dark';
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.4 + 0.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    };

    initNodes();

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const isDark = theme === 'dark';
      const nodeColor = isDark ? '242, 241, 238' : '16, 16, 20';
      const accentColor = '45, 129, 255'; // #2d81ff ArtCraft accent

      // Ambient Interactive Cursor Glow
      if (mouse.active && mouse.x > -500) {
        const glowRadius = isDark ? 280 : 220;
        const radialGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radialGrad.addColorStop(0, isDark ? 'rgba(45, 129, 255, 0.07)' : 'rgba(45, 129, 255, 0.05)');
        radialGrad.addColorStop(0.5, isDark ? 'rgba(45, 129, 255, 0.02)' : 'rgba(45, 129, 255, 0.015)');
        radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(mouse.x - glowRadius, mouse.y - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        // Wrap around borders
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        // Mouse interaction: gentle repulsion & excitement
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 0.9;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        // Draw node
        const currentAlpha = n.alpha + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${Math.max(0.05, currentAlpha * (isDark ? 0.35 : 0.25))})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxConnection = 120;

          if (dist < maxConnection) {
            const lineAlpha = (1 - dist / maxConnection) * (isDark ? 0.12 : 0.08);

            // If close to cursor, highlight connections with accent blue!
            let useAccent = false;
            if (mouse.active) {
              const dCursor1 = Math.hypot(n.x - mouse.x, n.y - mouse.y);
              const dCursor2 = Math.hypot(n2.x - mouse.x, n2.y - mouse.y);
              if (dCursor1 < 160 || dCursor2 < 160) {
                useAccent = true;
              }
            }

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = useAccent
              ? `rgba(${accentColor}, ${lineAlpha * 2.2})`
              : `rgba(${nodeColor}, ${lineAlpha})`;
            ctx.lineWidth = useAccent ? 0.9 : 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

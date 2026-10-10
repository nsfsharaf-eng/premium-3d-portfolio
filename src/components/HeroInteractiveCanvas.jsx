import { useEffect, useRef } from 'react';

export default function HeroInteractiveCanvas({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 700);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 700;
    };
    window.addEventListener('resize', onResize);

    // Mouse coordinates relative to hero canvas
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const container = canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    // Grid points for 3D perspective wave plane
    const cols = 38;
    const rows = 24;
    let t = 0;

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isDark = theme === 'dark';
      const gridColor = isDark ? '242, 241, 238' : '16, 16, 20';
      const accent = '45, 129, 255'; // ArtCraft cobalt blue

      // Central ambient spotlight that tracks cursor
      const spotRadius = Math.min(width, height) * 0.55;
      const spotGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        spotRadius
      );
      spotGrad.addColorStop(0, isDark ? 'rgba(45, 129, 255, 0.12)' : 'rgba(45, 129, 255, 0.08)');
      spotGrad.addColorStop(0.5, isDark ? 'rgba(45, 129, 255, 0.03)' : 'rgba(45, 129, 255, 0.02)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Perspective Wave Grid
      const points = [];
      const fov = 340;
      const cameraY = -120;
      const cameraZ = -100;

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const zRatio = r / rows;
        const zWorld = r * 35 + 80;

        for (let c = 0; c < cols; c++) {
          const xWorld = (c - cols / 2) * 44;

          // Compute mathematical wave height with cursor ripple interference
          const distToCenter = Math.hypot(c - cols / 2, r - rows / 2);
          const baseWave = Math.sin(c * 0.35 + t * 0.8) * Math.cos(r * 0.35 + t * 0.6) * 14;

          // Interactive mouse distortion
          const screenApproxX = width / 2 + (xWorld * fov) / zWorld;
          const distToMouse = Math.hypot(screenApproxX - mouse.x, (height * 0.6 + r * 12) - mouse.y);
          const mouseRipple = Math.exp(-distToMouse / 180) * Math.sin(distToMouse * 0.06 - t * 3) * 28;

          const yWorld = 85 + baseWave + mouseRipple;

          // Project to 2D screen
          const scale = fov / (zWorld - cameraZ);
          const x2d = width / 2 + xWorld * scale;
          const y2d = height * 0.52 + (yWorld - cameraY) * scale;

          points[r][c] = { x: x2d, y: y2d, z: zWorld, scale, intensity: Math.abs(mouseRipple) };
        }
      }

      // Draw horizontal lines
      for (let r = 0; r < rows; r++) {
        const depthAlpha = (r / rows) * (isDark ? 0.25 : 0.18);
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${gridColor}, ${depthAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Draw vertical lines with interactive glow
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(${gridColor}, ${isDark ? 0.12 : 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw glowing intersection points near mouse
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < 220) {
            const glow = (1 - dist / 220);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2 + glow * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accent}, ${glow * (isDark ? 0.9 : 0.7)})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
}

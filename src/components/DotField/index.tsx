import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as styles from './styles.module.scss';

interface Dot {
  ox: number;
  oy: number;
  dx: number;
  dy: number;
}

const SPACING = 12;
const DOT_RADIUS = 1;
const REPEL_RADIUS = 160;
const MAX_PUSH = 40;
const EASE = 0.12;
const DOT_COLOR = '#d4d4d4';
const MIN_OPACITY = 0.15;

export default () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !container || !ctx) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dots: Array<Dot> = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const mouse = { x: -Infinity, y: -Infinity };

    const buildDots = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];

      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({ ox: x, oy: y, dx: 0, dy: 0 });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;

      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.ox, dot.oy, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;

      dots.forEach(dot => {
        const diffX = dot.ox - mouse.x;
        const diffY = dot.oy - mouse.y;
        const distanceSquared = diffX * diffX + diffY * diffY;

        let targetDx = 0;
        let targetDy = 0;

        if (distanceSquared < REPEL_RADIUS * REPEL_RADIUS) {
          const distance = Math.sqrt(distanceSquared) || 1;
          const push = (1 - distance / REPEL_RADIUS) * MAX_PUSH;

          targetDx = (diffX / distance) * push;
          targetDy = (diffY / distance) * push;
        }

        dot.dx += (targetDx - dot.dx) * EASE;
        dot.dy += (targetDy - dot.dy) * EASE;

        const displacement = Math.sqrt(dot.dx * dot.dx + dot.dy * dot.dy);
        const fade = Math.min(displacement / MAX_PUSH, 1);

        ctx.globalAlpha = 1 - fade * (1 - MIN_OPACITY);
        ctx.beginPath();
        ctx.arc(dot.ox + dot.dx, dot.oy + dot.dy, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(tick);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -Infinity;
      mouse.y = -Infinity;
    };

    const handleResize = () => {
      buildDots();

      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    buildDots();
    window.addEventListener('resize', handleResize);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      animationFrame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

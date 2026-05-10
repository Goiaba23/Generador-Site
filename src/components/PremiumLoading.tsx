'use client';

import { useEffect, useRef, useState } from 'react';

interface PremiumLoadingProps {
  message?: string;
  minDuration?: number;
  onComplete?: () => void;
}

export default function PremiumLoading({ message = 'Loading', minDuration = 2000, onComplete }: PremiumLoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;

    let angle = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, 200, 200);
      angle += 0.02;

      const cx = 100, cy = 100, r = 70;

      ctx.strokeStyle = 'rgba(6,182,212,0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r + i * 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const a = angle + (i / 8) * Math.PI * 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const size = 3 + Math.sin(a * 2) * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(i / 8) * 360 + angle * 20}, 80%, 60%, ${0.3 + Math.sin(a) * 0.2})`;
        ctx.fill();
      }

      ctx.beginPath();
      const gradient = ctx.createConicGradient(angle, cx, cy);
      gradient.addColorStop(0, '#06B6D4');
      gradient.addColorStop(0.5, '#3B82F6');
      gradient.addColorStop(1, '#06B6D4');
      ctx.arc(cx, cy, r - 5, angle, angle + Math.PI * 1.5);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / minDuration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setVisible(false);
        if (onComplete) onComplete();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#07070E',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2rem',
      transition: 'opacity 0.5s ease',
    }}>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{ width: '120px', height: '120px' }}
      />

      <div style={{ textAlign: 'center' }}>
        <div style={{
          color: '#686880', fontSize: '0.8rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          {message}
        </div>
        <div style={{
          width: '200px', height: '2px', margin: '1rem auto 0',
          background: 'rgba(255,255,255,0.05)', borderRadius: '1px',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
            borderRadius: '1px',
            transition: 'width 0.1s linear',
          }} />
        </div>
        <div style={{
          color: '#3B3B4B', fontSize: '0.7rem', marginTop: '0.5rem',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}

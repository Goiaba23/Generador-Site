'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP Animations for floating elements
    const elements = containerRef.current.querySelectorAll('.floating-element');
    
    elements.forEach((el, index) => {
      gsap.to(el, {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });
    });

    // Pulse animation for central orb
    gsap.to('.central-orb', {
      scale: 1.1,
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, []);

  return (
    <div ref={containerRef} className="hero-3d-container">
      {/* Central Orb */}
      <div className="central-orb"></div>
      
      {/* Floating Elements */}
      <div className="floating-element element-1"></div>
      <div className="floating-element element-2"></div>
      <div className="floating-element element-3"></div>
      <div className="floating-element element-4"></div>
      <div className="floating-element element-5"></div>
      
      {/* Grid Lines */}
      <div className="grid-overlay"></div>
    </div>
  );
}

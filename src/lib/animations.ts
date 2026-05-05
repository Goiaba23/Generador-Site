// Sistema de Animações Premium - GSAP + 21dev + Framer Motion
// Baseado em sites $10K do Dribbble/Landbook

export interface AnimationConfig {
  type: 'gsap' | 'framer' | '21dev';
  name: string;
  duration: number;
  ease: string;
  delay?: number;
  scrollTrigger?: boolean;
}

// Animações GSAP baseadas em sites premium do Dribbble
export const GSAP_ANIMATIONS: Record<string, AnimationConfig> = {
  // Hero animations (estilo BotiFly, Design Monks)
  'hero-fade-in-up': {
    type: 'gsap' as const,
    name: 'Hero Fade In Up',
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: false,
  },
  'hero-parallax': {
    type: 'gsap' as const,
    name: 'Hero Parallax',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: false,
  },
  'hero-gradient-shift': {
    type: 'gsap' as const,
    name: 'Gradient Shift',
    duration: 2,
    ease: 'none',
    scrollTrigger: false,
  },
  
  // Scroll animations (estilo Madhu Miah, Safal Adhikari)
  'scroll-fade-in': {
    type: 'gsap' as const,
    name: 'Scroll Fade In',
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: true,
  },
  'scroll-slide-left': {
    type: 'gsap' as const,
    name: 'Slide In Left',
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: true,
  },
  'scroll-slide-right': {
    type: 'gsap' as const,
    name: 'Slide In Right',
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: true,
  },
  'scroll-zoom-in': {
    type: 'gsap' as const,
    name: 'Zoom In',
    duration: 1.2,
    ease: 'back.out(1.7)',
    scrollTrigger: true,
  },
  
  // Hover animations (estilo FleexStudio)
  'hover-lift': {
    type: 'gsap' as const,
    name: 'Hover Lift',
    duration: 0.3,
    ease: 'power2.out',
  },
  'hover-zoom': {
    type: 'gsap' as const,
    name: 'Hover Zoom',
    duration: 0.5,
    ease: 'power2.out',
  },
  'hover-glow': {
    type: 'gsap' as const,
    name: 'Hover Glow',
    duration: 0.4,
    ease: 'power2.out',
  },
  
  // Text animations
  'text-reveal': {
    type: 'gsap' as const,
    name: 'Text Reveal',
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: true,
  },
  'text-split-words': {
    type: 'gsap' as const,
    name: 'Split Words',
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: true,
  },
  
  // Counter animations
  'counter-up': {
    type: 'gsap' as const,
    name: 'Counter Up',
    duration: 2,
    ease: 'power1.out',
    scrollTrigger: true,
  },
  
  // Menu/Navigation
  'menu-slide-down': {
    type: 'gsap' as const,
    name: 'Menu Slide Down',
    duration: 0.5,
    ease: 'power2.out',
  },
  'mobile-menu-toggle': {
    type: 'gsap' as const,
    name: 'Mobile Menu Toggle',
    duration: 0.4,
    ease: 'power2.out',
  },
};

// Animações 21dev (componentes premium)
export const TWODEV_ANIMATIONS = {
  'bounce-in': 'Animação de entrada com quique',
  'float-up': 'Flutuar para cima suavemente',
  'pulse-effect': 'Efeito de pulso para destaque',
  'rotate-in': 'Rotação na entrada',
  'wiggle': 'Movimento de balanço divertido',
  'energy-pulse': 'Pulso de energia (para academias)',
  'smooth-appear': 'Aparição suave',
  'parallax-scroll': 'Parallax no scroll',
  'particle-effect': 'Efeito de partículas (tech)',
};

// Função para obter animações por nicho (baseado no Dribbble)
export function getAnimationsForNiche(businessType: string): string[] {
  const nicheAnimations: Record<string, string[]> = {
    'BARBERSHOP': ['scroll-fade-in', 'hover-lift', 'text-reveal', 'counter-up'],
    'BURGER_JOINT': ['hero-fade-in-up', 'scroll-slide-left', 'hover-zoom', 'bounce-in'],
    'RESTAURANT': ['hero-parallax', 'scroll-zoom-in', 'hover-glow', 'text-split-words'],
    'SALON': ['scroll-fade-in', 'hover-lift', 'smooth-appear', 'rotate-in'],
    'CLINIC': ['hero-gradient-shift', 'scroll-slide-right', 'text-reveal', 'smooth-appear'],
    'GYM': ['energy-pulse', 'scroll-slide-left', 'counter-up', 'bounce-in'],
    'REAL_ESTATE': ['parallax-scroll', 'scroll-zoom-in', 'hover-lift', 'particle-effect'],
    'TECH': ['particle-effect', 'hero-gradient-shift', 'text-split-words', 'float-up'],
    'PET_SHOP': ['wiggle', 'scroll-fade-in', 'bounce-in', 'hover-zoom'],
    'HOTEL': ['hero-parallax', 'scroll-slide-right', 'hover-glow', 'smooth-appear'],
  };
  
  return nicheAnimations[businessType] || ['scroll-fade-in', 'hover-lift', 'text-reveal'];
}

// Gerar código GSAP para o site
export function generateGSAPCode(animations: string[]): string {
  let code = `// GSAP Animations - Premium $10K Style\n`;
  code += `import { gsap } from 'gsap';\n`;
  code += `import { ScrollTrigger } from 'gsap/ScrollTrigger';\n`;
  code += `gsap.registerPlugin(ScrollTrigger);\n\n`;
  
  animations.forEach((anim, i) => {
    const config = GSAP_ANIMATIONS[anim as keyof typeof GSAP_ANIMATIONS];
    if (!config) return;
    
    if (config.scrollTrigger) {
      code += `// ${config.name}\n`;
      code += `gsap.from('.anim-${anim}', {\n`;
      code += `  scrollTrigger: { trigger: '.anim-${anim}', start: 'top 80%' },\n`;
      code += `  y: 50, opacity: 0, duration: ${config.duration}, ease: '${config.ease}'\n`;
      code += `});\n\n`;
    } else {
      code += `// ${config.name}\n`;
      code += `gsap.to('.hero-element', { y: 0, opacity: 1, duration: ${config.duration}, ease: '${config.ease}' });\n\n`;
    }
  });
  
  return code;
}

// Hook React para usar GSAP
export const GSAP_HOOK = `
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGSAPAnimation(animationType: string) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: true }
      );
    }
  }, []);
  
  return elementRef;
}
`;

export default {
  GSAP_ANIMATIONS,
  TWODEV_ANIMATIONS,
  getAnimationsForNiche,
  generateGSAPCode,
};

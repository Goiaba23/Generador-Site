// Animations Library for Premium Sites v6.0
// GSAP + Framer Motion + CSS Animations based on Dribbble $10K+ designs

export interface AnimationConfig {
  name: string;
  type: 'gsap' | 'framer' | 'css';
  trigger: 'scroll' | 'hover' | 'load' | 'click';
  duration: number;
  easing: string;
  niche: string[];
}

export interface GSAPCode {
  imports: string;
  code: string;
  scrollTrigger: boolean;
  stagger: boolean;
}

// Get animations for specific business niche
export function getAnimationsForNiche(businessType: string): AnimationConfig[] {
  const animationMap: Record<string, AnimationConfig[]> = {
    'RESTAURANT': [
      { name: 'fade-in-up', type: 'gsap', trigger: 'scroll', duration: 0.8, easing: 'power2.out', niche: ['food'] },
      { name: 'parallax-scroll', type: 'gsap', trigger: 'scroll', duration: 1.2, easing: 'power3.out', niche: ['food'] },
      { name: 'hover-zoom', type: 'css', trigger: 'hover', duration: 0.3, easing: 'ease-out', niche: ['food'] },
      { name: 'menu-item-reveal', type: 'gsap', trigger: 'scroll', duration: 0.6, easing: 'back.out(1.7)', niche: ['food'] },
    ],
    'BARBERSHOP': [
      { name: 'smooth-scroll', type: 'gsap', trigger: 'scroll', duration: 1.0, easing: 'power2.inOut', niche: ['beauty'] },
      { name: 'hover-lift', type: 'css', trigger: 'hover', duration: 0.3, easing: 'ease-out', niche: ['beauty'] },
      { name: 'fade-in', type: 'gsap', trigger: 'scroll', duration: 0.6, easing: 'power2.out', niche: ['beauty'] },
    ],
    'TECH': [
      { name: 'slide-up', type: 'gsap', trigger: 'scroll', duration: 0.8, easing: 'power3.out', niche: ['tech'] },
      { name: 'stagger-children', type: 'gsap', trigger: 'scroll', duration: 0.5, easing: 'power2.out', niche: ['tech'] },
      { name: 'gradient-shift', type: 'css', trigger: 'load', duration: 3.0, easing: 'ease', niche: ['tech'] },
    ],
    'RETAIL': [
      { name: 'product-card-hover', type: 'css', trigger: 'hover', duration: 0.4, easing: 'ease-out', niche: ['retail'] },
      { name: 'cart-slide', type: 'framer', trigger: 'click', duration: 0.5, easing: 'easeOut', niche: ['retail'] },
      { name: 'fade-in-up', type: 'gsap', trigger: 'scroll', duration: 0.7, easing: 'power2.out', niche: ['retail'] },
    ],
  };

  return animationMap[businessType] || [
    { name: 'fade-in', type: 'gsap', trigger: 'scroll', duration: 0.6, easing: 'power2.out', niche: ['general'] },
    { name: 'slide-up', type: 'gsap', trigger: 'scroll', duration: 0.8, easing: 'power3.out', niche: ['general'] },
    { name: 'hover-lift', type: 'css', trigger: 'hover', duration: 0.3, easing: 'ease-out', niche: ['general'] },
  ];
}

// Generate GSAP code for animations
export function generateGSAPCode(animations: string[], businessType: string): GSAPCode {
  const animationConfigs = getAnimationsForNiche(businessType);
  const selectedAnimations = animationConfigs.filter(a => animations.includes(a.name));
  
  if (selectedAnimations.length === 0) {
    return {
      imports: "import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';",
      code: '// No animations selected',
      scrollTrigger: false,
      stagger: false,
    };
  }

  const hasScrollTrigger = selectedAnimations.some(a => a.trigger === 'scroll');
  const hasStagger = selectedAnimations.some(a => a.name.includes('stagger'));

  let code = '';
  
  if (hasScrollTrigger) {
    code += "gsap.registerPlugin(ScrollTrigger);\n\n";
  }

  selectedAnimations.forEach((anim, index) => {
    const className = anim.name.replace(/-/g, '_');
    if (anim.trigger === 'scroll') {
      code += `// ${anim.name}\ngsap.from('.${className}', {\n  scrollTrigger: {\n    trigger: '.${className}',\n    start: 'top 80%',\n    toggleActions: 'play none none reverse'\n  },\n  y: 50,\n  opacity: 0,\n  duration: ${anim.duration},\n  ease: '${anim.easing}',\n});\n\n`;
    } else if (anim.trigger === 'hover') {
      code += `// ${anim.name} - CSS handled\n`;
    }
  });

  return {
    imports: hasScrollTrigger 
      ? "import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';"
      : "import gsap from 'gsap';",
    code,
    scrollTrigger: hasScrollTrigger,
    stagger: hasStagger,
  };
}

// Get CSS animations (for simpler effects)
export function getCSSAnimations(): Record<string, string> {
  return {
    'fade-in': `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeIn 0.6s ease-out; }
    `,
    'hover-lift': `
      .hover-lift { transition: transform 0.3s ease-out, box-shadow 0.3s ease-out; }
      .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    `,
    'hover-zoom': `
      .hover-zoom { transition: transform 0.3s ease-out; }
      .hover-zoom:hover { transform: scale(1.05); }
    `,
    'slide-up': `
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .slide-up { animation: slideUp 0.8s ease-out; }
    `,
  };
}

// Stagger animation for multiple children
export function generateStaggerCode(containerClass: string, childClass: string): string {
  return `
// Stagger animation for ${containerClass}
gsap.from('${childClass}', {
  scrollTrigger: {
    trigger: '${containerClass}',
    start: 'top 80%',
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out',
});
  `.trim();
}

// Parallax effect
export function generateParallaxCode(elementClass: string): string {
  return `
// Parallax for ${elementClass}
gsap.to('${elementClass}', {
  scrollTrigger: {
    trigger: '${elementClass}',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  y: '10%',
  ease: 'none',
});
  `.trim();
}

// Counter animation (for stats)
export function generateCounterAnimation(elementClass: string, endValue: number): string {
  return `
// Counter animation for ${elementClass}
const counter = document.querySelector('${elementClass}');
let current = 0;
const increment = endValue / 100;

gsap.to({}, {
  duration: 2,
  onUpdate: function() {
    current += increment;
    if (counter) counter.textContent = Math.floor(current) + '+';
  }
});
  `.trim();
}

export default {
  getAnimationsForNiche,
  generateGSAPCode,
  getCSSAnimations,
  generateStaggerCode,
  generateParallaxCode,
  generateCounterAnimation,
};

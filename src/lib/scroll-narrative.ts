import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface NarrativeStep {
  id: string;
  trigger: string;
  start: string;
  end: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onProgress?: (progress: number) => void;
}

export interface NarrativeConfig {
  container: string;
  steps: NarrativeStep[];
  scrub?: boolean;
  pin?: boolean;
}

export function createScrollNarrative(config: NarrativeConfig) {
  const { container, steps, scrub = true, pin = true } = config;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: scrub ? 1 : false,
      pin: pin ? container : false,
      anticipatePin: 1,
    },
  });

  steps.forEach((step) => {
    timeline.to(step.trigger, {
      scrollTrigger: {
        trigger: step.trigger,
        start: step.start,
        end: step.end,
        onEnter: step.onEnter,
        onLeave: step.onLeave,
        onUpdate: (self) => {
          if (step.onProgress) step.onProgress(self.progress);
        },
      },
    });
  });

  return timeline;
}

export interface ScrollStoryConfig {
  sections: {
    id: string;
    parallaxSpeed?: number;
    scaleIn?: boolean;
    fadeIn?: boolean;
    rotate3d?: boolean;
  }[];
  container?: string;
}

export function createScrollStory(config: ScrollStoryConfig) {
  const container = config.container || '.scroll-story';

  config.sections.forEach((section) => {
    const el = `#${section.id}`;
    const speed = section.parallaxSpeed || 0.3;

    if (section.parallaxSpeed) {
      gsap.to(el, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (section.fadeIn) {
      gsap.from(el, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    if (section.scaleIn) {
      gsap.from(el, {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });
    }

    if (section.rotate3d) {
      gsap.from(el, {
        rotationX: 15,
        rotationY: 10,
        transformPerspective: 1000,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 1.5,
        },
      });
    }
  });

  return () => ScrollTrigger.getAll().forEach(st => st.kill());
}

export function createCounterAnimation(
  element: string | Element,
  start: number,
  end: number,
  duration: number = 2
) {
  return gsap.from(
    { value: start },
    {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element instanceof Element ? element : document.querySelector(element) || undefined,
        start: 'top 85%',
      },
      onUpdate: function () {
        const el = element instanceof Element ? element : document.querySelector(element);
        if (el) {
          el.textContent = Math.floor(this.targets()[0].value).toLocaleString();
        }
      },
    }
  );
}

export function createMorphReveal(from: string, to: string) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: from,
      start: 'top 80%',
      end: 'top 40%',
      scrub: 1,
    },
  });

  tl.from(to, {
    clipPath: 'circle(0% at 50% 50%)',
    duration: 1,
    ease: 'power2.inOut',
  });

  return tl;
}

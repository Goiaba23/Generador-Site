// Google Stitch Service - AI Website Builder
// Docs: https://stitch.withgoogle.com/docs

import { BusinessDetails } from './ai-generator';

export interface StitchRequest {
  prompt: string;
  businessName: string;
  businessType: string;
  style: string;
  colors?: string[];
  fonts?: string[];
  animations?: string[];
  components?: string[];
}

export interface StitchResponse {
  success: boolean;
  html?: string;
  css?: string;
  js?: string;
  reactComponents?: Array<{ name: string; code: string }>;
  previewUrl?: string;
  error?: string;
}

export class StitchService {
  private static instance: StitchService;
  private apiKey: string;
  private baseUrl = 'https://stitch.withgoogle.com/api';

  private constructor() {
    this.apiKey = process.env.STITCH_API_KEY || '';
  }

  static getInstance(): StitchService {
    if (!StitchService.instance) {
      StitchService.instance = new StitchService();
    }
    return StitchService.instance;
  }

  /**
   * Send prompt to Stitch and generate REAL website code
   */
  async generateWebsite(request: StitchRequest): Promise<StitchResponse> {
    try {
      console.log('[Stitch] Generating website with prompt...');
      
      if (!this.apiKey) {
        console.warn('[Stitch] No API key found, using mock response');
        return this.getMockResponse(request);
      }

      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt: request.prompt,
          businessName: request.businessName,
          industry: request.businessType,
          style: request.style,
          colors: request.colors,
          fonts: request.fonts,
          features: {
            animations: request.animations,
            components: request.components,
          },
          outputFormat: 'react', // or 'html' for plain HTML
        }),
      });

      if (!response.ok) {
        throw new Error(`Stitch API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        html: data.html,
        css: data.css,
        js: data.js,
        reactComponents: data.reactComponents,
        previewUrl: data.previewUrl,
      };
    } catch (error: any) {
      console.error('[Stitch] Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Quality Assurance: Analyze the generated site
   */
  analyzeSiteQuality(siteCode: StitchResponse, request: StitchRequest): {
    score: number;
    issues: string[];
    passed: boolean;
  } {
    const issues: string[] = [];
    let score = 100;

    // Check 1: Hero section with CTA
    if (siteCode.html && !siteCode.html.includes('cta') && !siteCode.html.includes('button')) {
      issues.push('Missing CTA button in Hero section');
      score -= 20;
    }

    // Check 2: Colors match request
    if (request.colors && siteCode.css) {
      const missingColors = request.colors.filter(color => 
        !siteCode.css?.includes(color)
      );
      if (missingColors.length > 0) {
        issues.push(`Missing colors: ${missingColors.join(', ')}`);
        score -= missingColors.length * 10;
      }
    }

    // Check 3: GSAP animations
    if (request.animations && request.animations.length > 0) {
      const hasAnimations = siteCode.js?.includes('gsap') || 
                              siteCode.js?.includes('scrollTrigger');
      if (!hasAnimations) {
        issues.push('GSAP animations not found');
        score -= 15;
      }
    }

    // Check 4: Responsive design
    if (siteCode.css && !siteCode.css.includes('@media')) {
      issues.push('Missing responsive design (@media queries)');
      score -= 15;
    }

    // Check 5: object-fit: cover for images
    if (siteCode.css && !siteCode.css.includes('object-fit: cover')) {
      issues.push('Missing object-fit: cover for images');
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      issues,
      passed: score >= 90,
    };
  }

  /**
   * Improve prompt based on QA issues
   */
  improvePrompt(originalPrompt: string, issues: string[]): string {
    let improved = originalPrompt + '\n\n=== QUALITY ASSURANCE ISSUES FIXED ===\n';
    
    issues.forEach(issue => {
      if (issue.includes('CTA')) {
        improved += '- ADD a clear CTA button in Hero section with text "Agende Agora"\n';
      }
      if (issue.includes('colors')) {
        improved += '- ENSURE all requested colors are used in the CSS\n';
      }
      if (issue.includes('GSAP')) {
        improved += '- IMPLEMENT all GSAP animations: ScrollTrigger, fade-in-up, parallax\n';
      }
      if (issue.includes('responsive')) {
        improved += '- ADD @media queries for mobile (320px), tablet (768px), desktop (1024px+)\n';
      }
      if (issue.includes('object-fit')) {
        improved += '- ADD "object-fit: cover" to ALL img tags and background images\n';
      }
    });

    improved += '\nIMPORTANT: Return complete, production-ready code.\n';
    return improved;
  }

  /**
   * Mock response for testing without API key
   */
  private getMockResponse(request: StitchRequest): StitchResponse {
    console.log('[Stitch] Using mock response for:', request.businessName);
    
    return {
      success: true,
      reactComponents: [
        {
          name: 'HeroSection',
          code: `
import React from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useEffect(() => {
    gsap.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top center',
        toggleActions: 'play none none reverse',
      }
    });
  }, []);

  return (
    <section className="hero" style={{ 
      background: 'linear-gradient(135deg, #1A1A2E, #16213E)',
      padding: '100px 20px',
      textAlign: 'center',
      color: 'white'
    }}>
      <h1 className="hero-title" style={{ 
        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
        fontWeight: 900,
        marginBottom: '1rem'
      }}>
        ${request.businessName}
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Agendamento online 24/7
      </p>
      <button style={{
        background: 'linear-gradient(135deg, #A855F7, #6366F1)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '10px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer'
      }}>
        Agende Agora
      </button>
    </section>
  );
}
          `,
        },
        {
          name: 'ServicesSection',
          code: `
import React from 'react';

export default function ServicesSection() {
  const services = [
    { icon: '✂️', title: 'Corte Masculino', price: 'R$ 35,00' },
    { icon: '🧔', title: 'Barba', price: 'R$ 20,00' },
    { icon: '✨', title: 'Combo', price: 'R$ 50,00' },
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#0F3460' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: 'white', 
        fontSize: '2.5rem',
        marginBottom: '3rem'
      }}>
        Nossos Serviços
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '2rem',
            borderRadius: '1.25rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
            <p style={{ color: '#E94560', fontSize: '1.5rem', fontWeight: 700 }}>{service.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
          `,
        },
      ],
      previewUrl: `https://stitch.withgoogle.com/preview/${Date.now()}`,
    };
  }
}

export default StitchService.getInstance();

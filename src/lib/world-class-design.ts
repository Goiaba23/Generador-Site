/**
 * WORLD CLASS DESIGN SYSTEM v7.0
 * Baseado nas pesquisas mais recentes + SelfMadeWebDesigner
 * 
 * Atualizado com:
 * - Fluid typography (clamp())
 * - Glassmorphism correto (com base tint)
 * - Opacity hierarchy
 * - Layered shadows
 * - WCAG accessibility
 */

import { BusinessType, TemplateStyle } from '@prisma/client';

// ===== PREMIUM TYPOGRAPHY SYSTEMS (com fluid) =====

const TYPOGRAPHY_SYSTEMS = {
  typo: {
    anchor: 'Plus Jakarta Sans',
    anchorWeights: [400, 500, 600, 700, 800],
    pairings: ['Playfair Display', 'DM Serif Display', 'Fraunces'],
    description: 'Clean, moderno, tech vibes',
    // Fluid sizes using clamp()
    fluid: {
      h1: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
      h2: 'clamp(2rem, 4vw + 0.5rem, 3rem)',
      h3: 'clamp(1.5rem, 3vw + 0.25rem, 2rem)',
      body: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
    },
  },
  elegant: {
    anchor: 'Playfair Display',
    anchorWeights: [400, 500, 600, 700, 800],
    pairings: ['Lato', 'Raleway', 'Montserrat'],
    description: 'Sofisticado, atemporal, luxury',
    fluid: {
      h1: 'clamp(2.5rem, 5vw + 1rem, 4rem)',
      h2: 'clamp(1.75rem, 3.5vw + 0.5rem, 2.5rem)',
      h3: 'clamp(1.25rem, 2.5vw + 0.25rem, 1.75rem)',
      body: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
    },
  },
  bold: {
    anchor: 'Oswald',
    anchorWeights: [300, 400, 500, 600, 700],
    pairings: ['Open Sans', 'Roboto', 'Inter'],
    description: 'Impactante, direto, memorável',
    fluid: {
      h1: 'clamp(3rem, 6vw + 1rem, 5rem)',
      h2: 'clamp(2rem, 4vw + 0.5rem, 3rem)',
      h3: 'clamp(1.5rem, 3vw + 0.25rem, 2rem)',
      body: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
    },
  },
  minimal: {
    anchor: 'Inter',
    anchorWeights: [300, 400, 500, 600, 700],
    pairings: ['Space Mono', 'IBM Plex Sans'],
    description: 'Essencial, clean, funcional',
    fluid: {
      h1: 'clamp(2rem, 4vw + 0.5rem, 3rem)',
      h2: 'clamp(1.5rem, 3vw + 0.25rem, 2rem)',
      h3: 'clamp(1.25rem, 2vw + 0.125rem, 1.5rem)',
      body: 'clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)',
    },
  },
  creative: {
    anchor: 'Syne',
    anchorWeights: [400, 500, 600, 700, 800],
    pairings: ['Space Grotesk', 'DM Sans'],
    description: 'Arte, único, expressão',
    fluid: {
      h1: 'clamp(2.5rem, 6vw + 1rem, 5rem)',
      h2: 'clamp(1.75rem, 4vw + 0.5rem, 2.75rem)',
      h3: 'clamp(1.25rem, 2.5vw + 0.25rem, 1.75rem)',
      body: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
    },
  },
  warm: {
    anchor: 'Nunito',
    anchorWeights: [400, 500, 600, 700, 800],
    pairings: ['Merriweather', 'Lora'],
    description: 'Acessível, amigável, confiança',
    fluid: {
      h1: 'clamp(2.25rem, 4vw + 0.75rem, 3.5rem)',
      h2: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)',
      h3: 'clamp(1.25rem, 2vw + 0.25rem, 1.75rem)',
      body: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
    },
  },
};

type TypographySystem = typeof TYPOGRAPHY_SYSTEMS.typo;

// ===== COLOR PALETTES (v7.0 - com opacity hierarchy) =====

const COLOR_VARIANTS = {
  // Text opacity hierarchy (WCAG compliant)
  text: {
    h1: 'rgba(255,255,255,1)',      // Headlines - 100%
    h2: 'rgba(255,255,255,0.9)',    // Subheadings - 90%
    h3: 'rgba(255,255,255,0.85)',   // Titles - 85%
    body: 'rgba(255,255,255,0.8)',   // Body - 80%
    muted: 'rgba(255,255,255,0.6)', // Captions - 60%
    subtle: 'rgba(255,255,255,0.4)',// Hints - 40%
  },
  // Interactive elements
  interactive: {
    default: 'rgba(255,255,255,0.9)',
    hover: 'rgba(255,255,255,1)',
    focus: 'rgba(255,255,255,1)',
    disabled: 'rgba(255,255,255,0.3)',
  },
};

// World Class Palettes (dark mode optimized)
const WORLD_CLASS_PALETTES = {
  tech: {
    // Core colors
    primary: '#6366f1',
    primaryHover: '#818cf8',
    secondary: '#0ea5e9',
    accent: '#22d3ee',
    // Dark backgrounds (OLED friendly, but not pure black)
    background: '#050508',
    surface: '#0f0f12',
    surfaceElevated: '#18181c',
    surfaceGlass: 'rgba(15,15,20,0.7)',
    // Text with hierarchy
    text: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    // Borders
    border: 'rgba(255,255,255,0.08)',
    borderHover: 'rgba(255,255,255,0.15)',
    // Gradients
    gradient: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(14,165,233,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #818cf8 0%, #22d3ee 100%)',
    // Hero background elements
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(99,102,241,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
  food: {
    primary: '#f97316',
    primaryHover: '#fb923c',
    secondary: '#dc2626',
    accent: '#fbbf24',
    background: '#0a0808',
    surface: '#151210',
    surfaceElevated: '#1e1b18',
    surfaceGlass: 'rgba(21,17,16,0.7)',
    text: '#fafaf9',
    textSecondary: '#a8a29e',
    textMuted: '#78716c',
    border: 'rgba(255,245,235,0.08)',
    borderHover: 'rgba(255,245,235,0.15)',
    gradient: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(220,38,38,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)',
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(249,115,22,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,115,22,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
  beauty: {
    primary: '#ec4899',
    primaryHover: '#f472b6',
    secondary: '#a855f7',
    accent: '#fb7185',
    background: '#0a0610',
    surface: '#120c18',
    surfaceElevated: '#1a1224',
    surfaceGlass: 'rgba(18,12,24,0.7)',
    text: '#fdf2f8',
    textSecondary: '#d8b4e2',
    textMuted: '#a78baf',
    border: 'rgba(255,240,250,0.08)',
    borderHover: 'rgba(255,240,250,0.15)',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)',
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(236,72,153,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(236,72,153,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,72,153,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
  health: {
    primary: '#14b8a6',
    primaryHover: '#2dd4bf',
    secondary: '#0d9488',
    accent: '#22d3ee',
    background: '#040a0a',
    surface: '#0a1414',
    surfaceElevated: '#101c1c',
    surfaceGlass: 'rgba(10,20,20,0.7)',
    text: '#f0fdfa',
    textSecondary: '#99f6e4',
    textMuted: '#5eead4',
    border: 'rgba(240,253,250,0.08)',
    borderHover: 'rgba(240,253,250,0.15)',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(13,148,136,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%)',
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(20,184,166,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(20,184,166,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
  luxury: {
    primary: '#d4af37',
    primaryHover: '#e5c565',
    secondary: '#92400e',
    accent: '#f59e0b',
    background: '#080806',
    surface: '#12100c',
    surfaceElevated: '#1a1812',
    surfaceGlass: 'rgba(18,16,12,0.7)',
    text: '#faf9f6',
    textSecondary: '#d4cfc4',
    textMuted: '#a8a29e',
    border: 'rgba(255,250,235,0.08)',
    borderHover: 'rgba(255,250,235,0.15)',
    gradient: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(184,134,11,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #e5c565 0%, #fcd34d 100%)',
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(212,175,55,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
  creative: {
    primary: '#c026d3',
    primaryHover: '#db5ad6',
    secondary: '#7c3aed',
    accent: '#f472b6',
    background: '#06040a',
    surface: '#0e0a14',
    surfaceElevated: '#16121c',
    surfaceGlass: 'rgba(14,10,20,0.7)',
    text: '#fdf2f8',
    textSecondary: '#d8b4e2',
    textMuted: '#a78baf',
    border: 'rgba(255,235,250,0.08)',
    borderHover: 'rgba(255,235,250,0.15)',
    gradient: 'linear-gradient(135deg, #c026d3 0%, #7c3aed 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(192,38,211,0.2) 0%, rgba(124,58,237,0.1) 100%)',
    gradientText: 'linear-gradient(135deg, #db5ad6 0%, #a78bfa 100%)',
    heroGlow: 'radial-gradient(600px circle at 30% 50%, rgba(192,38,211,0.15), transparent 40%)',
    heroMesh: 'linear-gradient(to right, rgba(192,38,211,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,38,211,0.03) 1px, transparent 1px)',
    heroMeshSize: '40px 40px',
  },
};

// ===== DEPTH EFFECTS (glassmorphism correto) =====

const DEPTH_EFFECTS = {
  // Glass effect - RECIPE CORRETO
  glass: {
    // Base tint + transparency (40-60% opacity required for WCAG)
    background: 'rgba(30,30,35,0.6)',
    // Blur - moderate (8-20px)
    backdropFilter: 'blur(16px) saturate(180%)',
    // Webkit for Safari
    webkitBackdropFilter: 'blur(16px) saturate(180%)',
    // Border - subtle light edge
    border: '1px solid rgba(255,255,255,0.12)',
    // Inner glow for depth
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)',
  },
  // Card - elevated with layered shadows
  card: {
    background: 'rgba(20,20,25,0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset',
  },
  // Elevated - high blur for modals
  elevated: {
    background: 'rgba(25,25,30,0.85)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset',
  },
  // Glow effect
  glow: {
    background: 'transparent',
    boxShadow: '0 0 60px rgba(var(--primary-rgb), 0.3)',
  },
};

// ===== ANIMATIONS (GSAP-style) =====

const ANIMATION_PRESETS = {
  enter: {
    duration: 0.6,
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
  },
  hover: {
    duration: 0.3,
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  page: {
    duration: 0.8,
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // premium ease
  },
};

// ===== INTERFACE =====

export interface DesignTokens {
  typography: TypographySystem;
  palette: typeof WORLD_CLASS_PALETTES.tech;
  depth: typeof DEPTH_EFFECTS.glass;
  animations: typeof ANIMATION_PRESETS;
  colorVariants: typeof COLOR_VARIANTS;
}

// ===== GET TOKENS =====

export function getWorldClassTokens(
  businessType: string | BusinessType,
  style?: string
): DesignTokens {
  // 1. MAP BUSINESS TYPE TO PALETTE
  const paletteMap: Record<string, string> = {
    RESTAURANT: 'food',
    BURGER_JOINT: 'food',
    PIZZERIA: 'food',
    COFFEE_SHOP: 'food',
    BAR: 'food',
    SALON: 'beauty',
    BARBERSHOP: 'beauty',
    SPA: 'beauty',
    NAIL_SALON: 'beauty',
    CLINIC: 'health',
    DENTIST: 'health',
    PSYCHOLOGIST: 'health',
    GYM: 'tech',
    PERSONAL_TRAINER: 'tech',
    YOGA_STUDIO: 'beauty',
    TECH: 'tech',
    WEB_AGENCY: 'tech',
    HOTEL: 'beauty',
    LUXURY: 'luxury',
  };
  
  const defaultPalette = WORLD_CLASS_PALETTES.tech;
  let palette = defaultPalette;
  
  const mappedKey = paletteMap[businessType as string];
  if (mappedKey && WORLD_CLASS_PALETTES[mappedKey as keyof typeof WORLD_CLASS_PALETTES]) {
    palette = WORLD_CLASS_PALETTES[mappedKey as keyof typeof WORLD_CLASS_PALETTES];
  }
  
  // 2. MAP STYLE TO TYPOGRAPHY
  const styleKey = style || 'MODERN';
  let typography = TYPOGRAPHY_SYSTEMS.typo;
  
  if (styleKey === 'MINIMAL') typography = TYPOGRAPHY_SYSTEMS.minimal;
  else if (styleKey === 'CLASSIC' || styleKey === 'LUXURY') typography = TYPOGRAPHY_SYSTEMS.elegant;
  else if (styleKey === 'BOLD') typography = TYPOGRAPHY_SYSTEMS.bold;
  else if (styleKey === 'CREATIVE') typography = TYPOGRAPHY_SYSTEMS.creative;
  else if (styleKey === 'MODERN') typography = TYPOGRAPHY_SYSTEMS.typo;
  
  // 3. DEPTH based on element type
  const depth = DEPTH_EFFECTS.glass;
  
  // 4. ANIMATIONS
  const animations = ANIMATION_PRESETS;
  
  // 5. COLOR VARIANTS
  const colorVariants = COLOR_VARIANTS;
  
  return {
    typography,
    palette,
    depth,
    animations,
    colorVariants,
  };
}

// ===== GENERATE WORLD CLASS CSS =====

export function generateWorldClassCSS(tokens: DesignTokens): string {
  const { palette, typography, depth, colorVariants } = tokens;
  
  // Extract depth properties with fallbacks
  const glassBg = (depth as any).background || 'rgba(30,30,35,0.6)';
  const glassBlur = (depth as any).backdropFilter || 'blur(16px) saturate(180%)';
  const cardShadow = (depth as any).boxShadow || '0 4px 24px rgba(0,0,0,0.4)';
  
  // Colors for CSS variables
  const textColors = colorVariants.text;
  const interactiveColors = colorVariants.interactive;
  
  return `
    /* World Class Design System v7.0 */
    :root {
      /* Typography - ${typography.description} */
      --font-anchor: '${typography.anchor}', system-ui, sans-serif;
      --font-pairing: '${typography.pairings[0]}', serif;
      
      /* Fluid Typography */
      --text-h1: ${typography.fluid.h1};
      --text-h2: ${typography.fluid.h2};
      --text-h3: ${typography.fluid.h3};
      --text-body: ${typography.fluid.body};
      
      /* Colors - Core */
      --primary: ${palette.primary};
      --primary-hover: ${palette.primaryHover};
      --secondary: ${palette.secondary};
      --accent: ${palette.accent};
      
      /* Colors - Background */
      --background: ${palette.background};
      --surface: ${palette.surface};
      --surface-elevated: ${palette.surfaceElevated};
      --surface-glass: ${palette.surfaceGlass};
      
      /* Colors - Text (with opacity hierarchy) */
      --text: ${palette.text};
      --text-secondary: ${palette.textSecondary};
      --text-muted: ${palette.textMuted};
      
      /* Colors - Border */
      --border: ${palette.border};
      --border-hover: ${palette.borderHover};
      
      /* Gradients */
      --gradient: ${palette.gradient};
      --gradient-soft: ${palette.gradientSoft};
      --gradient-text: ${palette.gradientText};
      
      /* Hero Effects */
      --hero-glow: ${palette.heroGlow};
      --hero-mesh: ${palette.heroMesh};
      --hero-mesh-size: ${palette.heroMeshSize};
      
      /* Depth Effects */
      --glass-bg: ${glassBg};
      --glass-blur: ${glassBlur};
      --card-shadow: ${cardShadow};
      
      /* Animation */
      --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
      --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Base styles */
    * {
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: var(--font-anchor), system-ui, sans-serif;
      background: var(--background);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    
    /* Typography with opacity hierarchy */
    h1, .headline {
      font-size: var(--text-h1);
      font-weight: 700;
      line-height: 1.1;
      color: ${textColors.h1};
    }
    
    h2, .subheadline {
      font-size: var(--text-h2);
      font-weight: 600;
      line-height: 1.2;
      color: ${textColors.h2};
    }
    
    h3, .title {
      font-size: var(--text-h3);
      font-weight: 600;
      line-height: 1.3;
      color: ${textColors.h3};
    }
    
    p, .body {
      font-size: var(--text-body);
      font-weight: 400;
      line-height: 1.7;
      color: ${textColors.body};
    }
    
    small, .caption {
      font-size: 0.875em;
      color: ${textColors.muted};
    }
    
    /* Interactive elements */
    a, button {
      transition: all 0.3s var(--ease-out);
    }
    
    a:hover, button:hover {
      color: ${interactiveColors.hover};
    }
    
    /* Glassmorphism */
    .glass {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--border);
      border-radius: 16px;
    }
    
    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--card-shadow);
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
      border-color: var(--border-hover);
    }
    
    /* Buttons */
    .btn-primary {
      background: var(--gradient);
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: all 0.3s var(--ease-out);
      box-shadow: 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
    }
    
    /* Hero gradient background */
    .hero-gradient {
      background: var(--background), var(--hero-glow);
    }
    
    /* Mesh pattern */
    .mesh-bg {
      background-image: var(--hero-mesh);
      background-size: var(--hero-mesh-size);
    }
    
    /* Gradient text */
    .gradient-text {
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;
}

export { WORLD_CLASS_PALETTES, TYPOGRAPHY_SYSTEMS, DEPTH_EFFECTS, COLOR_VARIANTS, ANIMATION_PRESETS };
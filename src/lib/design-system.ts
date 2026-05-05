/**
 * DESIGN SYSTEM PREMIUM - Nível $10.000
 * Baseado em: YouTube tutorials (JavaScript Mastery, PedroTech, Frontend Tribe)
 * e Dribbble (BotiFly, Addy Design, Digcy - $5K-$10K+ packages)
 */

export const colors = {
  // Backgrounds - Dark Theme Profissional
  bg: {
    primary: '#0a0a1a',      // Deep dark blue/purple
    secondary: '#0f172a',     // Slate 950
    tertiary: '#1e293b',      // Slate 800
    card: '#1e293b',
    cardHover: '#334155',
    overlay: 'rgba(15, 23, 42, 0.8)',
  },
  
  // Gradients - Premium
  gradients: {
    primary: 'linear-gradient(135deg, #4f46e5, #7c3aed)',    // Indigo → Purple
    secondary: 'linear-gradient(135deg, #818cf8, #c084fc)',    // Light Indigo → Fuchsia
    accent: 'linear-gradient(135deg, #c084fc, #fb923c)',       // Fuchsia → Orange
    hero: 'linear-gradient(to right, #818cf8, #c084fc, #fb923c)', // Triple gradient
    dark: 'linear-gradient(to right, #0f172a, #1e293b)',
    glow: {
      purple: 'radial-gradient(circle, rgba(129, 140, 248, 0.15), transparent)',
      fuchsia: 'radial-gradient(circle, rgba(192, 132, 252, 0.1), transparent)',
      orange: 'radial-gradient(circle, rgba(251, 146, 60, 0.08), transparent)',
    }
  },
  
  // Text
  text: {
    primary: '#f8fafc',      // Slate 50
    secondary: '#cbd5e1',    // Slate 300
    muted: '#94a3b8',       // Slate 400
    accent: '#818cf8',       // Indigo 400
    fuchsia: '#c084fc',     // Fuchsia 400
  },
  
  // Borders
  border: {
    default: '#334155',     // Slate 700
    light: 'rgba(51, 65, 85, 0.5)',
    accent: 'rgba(129, 140, 248, 0.3)',
    focus: '#818cf8',
  },
  
  // Status
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
};

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',        // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',       // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',       // 96px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  8: '2rem',         // 32px
  10: '2.5rem',      // 40px
  12: '3rem',        // 48px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  32: '8rem',        // 128px
  40: '10rem',       // 160px
  48: '12rem',       // 192px
  56: '14rem',       // 224px
  64: '16rem',       // 256px
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const animations = {
  // Durações
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  // Easings
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Presets para uso inline
  fadeIn: 'opacity 0.5s ease-in-out',
  slideUp: 'transform 0.5s ease, opacity 0.5s ease',
  scaleOnHover: 'transform 0.2s ease',
  glowPulse: 'box-shadow 0.3s ease',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Glow effects (premium)
  glow: {
    purple: '0 4px 12px rgba(79, 70, 229, 0.3)',
    purpleLg: '0 10px 30px rgba(79, 70, 229, 0.3)',
    purpleXl: '0 20px 50px rgba(79, 70, 229, 0.4)',
    fuchsia: '0 4px 12px rgba(192, 132, 252, 0.3)',
    orange: '0 4px 12px rgba(251, 146, 60, 0.3)',
  }
};

export const componentStyles = {
  // Botões Premium
  button: {
    primary: {
      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      color: '#ffffff',
      border: 'none',
      padding: '1rem 2.5rem',
      fontSize: '1.125rem',
      fontWeight: 600,
      borderRadius: '0.75rem',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    secondary: {
      background: 'rgba(30, 41, 59, 0.8)',
      color: '#f8fafc',
      border: '1px solid #334155',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    ghost: {
      background: 'transparent',
      color: '#cbd5e1',
      border: 'none',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    }
  },
  
  // Cards Premium
  card: {
    base: {
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '1rem',
      padding: '2rem',
      transition: 'all 0.5s ease',
    },
    hover: {
      borderColor: '#818cf8',
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(129, 140, 248, 0.1)',
    },
    glass: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      borderRadius: '1rem',
    }
  },
  
  // Input Fields
  input: {
    base: {
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      color: '#f8fafc',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      width: '100%',
    },
    focus: {
      borderColor: '#818cf8',
      boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.1)',
    }
  },
  
  // Badge
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    purple: {
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      color: '#c4b5fd',
      border: '1px solid rgba(139, 92, 246, 0.3)',
    },
    fuchsia: {
      backgroundColor: 'rgba(192, 132, 252, 0.15)',
      color: '#d8b4fe',
      border: '1px solid rgba(192, 132, 252, 0.2)',
    }
  },
  
  // Navbar
  navbar: {
    base: {
      position: 'fixed' as const,
      top: 0,
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
      zIndex: 50,
      transition: 'all 0.3s ease' as const,
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '4.5rem',
    }
  },
  
  // Section
  section: {
    base: {
      padding: '6rem 1.5rem',
      position: 'relative' as const,
    },
    dark: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
    }
  }
};

export const layout = {
  maxWidth: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  }
};

export default {
  colors,
  typography,
  spacing,
  breakpoints,
  animations,
  shadows,
  componentStyles,
  layout,
};

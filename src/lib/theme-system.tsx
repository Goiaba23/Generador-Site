'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('saas-theme') as Theme;
    if (stored) {
      setThemeState(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('saas-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// ============================================
// SAAS DESIGN_SYSTEM 2026 - DARK + LIGHT
// ============================================

export const COLORS = {
  dark: {
    bgPrimary: '#0A0A0F',
    bgSecondary: '#12121A',
    bgCard: '#1A1A24',
    bgElevated: '#242430',
    textPrimary: '#F5F5F7',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#6366F1',
    accentHover: '#818CF8',
    accentLight: '#A5B4FC',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    border: '#2D2D3A',
    borderHover: '#404050',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    gradientAccent: 'linear-gradient(135deg, #818CF8, #A78BFA)',
  },
  light: {
    bgPrimary: '#FAFBFC',
    bgSecondary: '#F1F5F9',
    bgCard: '#FFFFFF',
    bgElevated: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    accent: '#4F46E5',
    accentHover: '#4338CA',
    accentLight: '#818CF8',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    border: '#E2E8F0',
    borderHover: '#CBD5E1',
    gradient: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    gradientAccent: 'linear-gradient(135deg, #4338CA, #6D28D9)',
  },
};

export function getColors(theme: Theme) {
  return COLORS[theme];
}

// ============================================
// THEME TOGGLE COMPONENT
// ============================================

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      {theme === 'dark' ? 'Modo Dark' : 'Modo Light'}
    </button>
  );
}

// ============================================
// BENTO GRID LAYOUT
// ============================================

export function BentoGrid({ children, theme }: { children: ReactNode; theme: Theme }) {
  const colors = COLORS[theme];
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      padding: '1rem',
    }}>
      {children}
    </div>
  );
}

export function BentoCard({ 
  children, 
  theme, 
  icon,
  title, 
  metric,
  description,
  delay = 0 
}: { 
  children?: ReactNode; 
  theme: Theme;
  icon?: string;
  title?: string;
  metric?: string;
  description?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = COLORS[theme];
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: colors.bgCard,
        border: `1px solid ${isHovered ? colors.accent : colors.border}`,
        borderRadius: '1.5rem',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px -10px ${colors.accent}30` : 'none',
      }}
    >
      {icon && <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>}
      {metric && (
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: colors.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}>
          {metric}
        </div>
      )}
      {title && (
        <h3 style={{ color: colors.textPrimary, fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

// ============================================
// METRICS REALAS
// ============================================

export const PLATFORM_METRICS = {
  sites: '2.000+',
  agencies: '500+',
  satisfaction: '98%',
  avgRevenue: 'R$ 8.000/mês',
  margin: '80%',
  time: '2 min',
};
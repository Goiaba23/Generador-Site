'use client';

import { useState, useEffect, useRef } from 'react';

interface ProblemSolutionProps {
  painPoint: string;
  solution: string;
  expectedOutcome: string;
  icon?: string;
  businessName: string;
}

export default function ProblemSolutionSection({ painPoint, solution, expectedOutcome, icon, businessName }: ProblemSolutionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '5rem 1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', color: '#0f172a' }}>
          A solução que seu cliente procurava
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem', fontSize: '1.125rem' }}>
          {businessName} - Transformando desafios dos seus clientes em resultados
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Problem */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #ef4444'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon || '⚠️'}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#dc2626' }}>O Problema</h3>
            <p style={{ color: '#374151', fontSize: '1.125rem', lineHeight: 1.6 }}>{painPoint}</p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', color: '#ef4444' }}>
              <svg style={{ width: 20, height: 20, marginRight: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.466 1.73-3.356l-.54-1.94M4.5 7.25h15m-15 0A2.25 2.25 0 0 1 2.25 5h15.5a2.25 2.25 0 0 1 2.25 2.25m-15 0A2.25 2.25 0 0 0 4.25 9.5h15.5" />
              </svg>
              <span style={{ fontWeight: 600 }}>Impacto Crítico</span>
            </div>
          </div>

          {/* Solution */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #10b981',
            transform: 'scale(1.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#059669' }}>Nossa Solução</h3>
            <p style={{ color: '#374151', fontSize: '1.125rem', lineHeight: 1.6 }}>{solution}</p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', color: '#10b981' }}>
              <svg style={{ width: 20, height: 20, marginRight: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
              <span style={{ fontWeight: 600 }}>Resolvido em 2 min</span>
            </div>
          </div>

          {/* Expected Outcome */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>O Resultado</h3>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, opacity: 0.9 }}>{expectedOutcome}</p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', color: '#bfdbfe' }}>
              <svg style={{ width: 20, height: 20, marginRight: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4" />
              </svg>
              <span style={{ fontWeight: 600 }}>Resultados Reais</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
              color: 'white',
              fontWeight: 700,
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              transition: 'all 0.3s ease',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
            }}
            onClick={() => window.location.href = '/create'}
          >
                Criar Site para Cliente - Resolver Problema
          </button>
        </div>
      </div>
    </section>
  );
}

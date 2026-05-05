'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ==================== ANIMATED SECTIONS WITH TAILWIND ====================
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '3s'}} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}} />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Badge className="mb-8 bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20">
            🚀 Novo: IA Personalizada para +30 Nichos
          </Badge>
        </div>
        
        {/* Main heading with gradient text */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-white">Crie sites </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            profissionais
          </span>
          <br />
          <span className="text-white">para seu comércio em </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            minutos
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className={`text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Templates otimizados para cada nicho. Designs deslumbrantes com{' '}
          <span className="text-purple-400 font-semibold">IA que personaliza</span>
          {' '}cada detalhe e deploy instantâneo.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/create">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-6 h-auto shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] transition-all">
              🎨 Criar Site Agora
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== BENTO GRID SECTION ====================
function BentoGridSection() {
  const features = [
    { title: 'IA Personalizada', description: 'Cada site é único com IA que entende seu nicho', icon: '🤖', color: 'from-purple-500 to-indigo-500' },
    { title: 'Deploy Instantâneo', description: 'Seu site no ar em minutos, não dias', icon: '🚀', color: 'from-pink-500 to-purple-500' },
    { title: 'Design Responsivo', description: 'Perfeito em qualquer dispositivo', icon: '📱', color: 'from-indigo-500 to-blue-500' },
    { title: 'SEO Otimizado', description: 'Ranque melhor no Google automáticamente', icon: '📈', color: 'from-green-500 to-emerald-500' },
    { title: 'Templates Premium', description: 'Designs profissionais para cada setor', icon: '🎨', color: 'from-orange-500 to-red-500' },
    { title: 'Suporte 24/7', description: 'Ajuda sempre que precisar', icon: '💬', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Recursos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tudo que você <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">precisa</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ferramentas poderosas para criar o site perfeito para seu negócio
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={index} className={`group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ==================== NICHES SECTION ====================
function NichesSection() {
  const niches = [
    { name: 'Restaurantes', icon: '🍕', color: 'from-orange-500 to-red-500' },
    { name: 'Lojas de Roupas', icon: '👕', color: 'from-pink-500 to-purple-500' },
    { name: 'Salões de Beleza', icon: '💇', color: 'from-purple-500 to-indigo-500' },
    { name: 'Consultórios', icon: '🏥', color: 'from-blue-500 to-cyan-500' },
    { name: 'Academias', icon: '💪', color: 'from-green-500 to-emerald-500' },
    { name: 'Imobiliárias', icon: '🏠', color: 'from-yellow-500 to-orange-500' },
    { name: 'Petshops', icon: '🐕', color: 'from-amber-500 to-yellow-500' },
    { name: 'Floriculturas', icon: '🌸', color: 'from-pink-500 to-purple-500' },
    { name: 'Lojas', icon: '🛍️', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            +30 Nichos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Templates para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">cada setor</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Designs especializados que converten melhor porque entendem seu público
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {niches.map((niche, index) => (
            <AnimatedSection key={index} className={`group bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer`}>
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">{niche.icon}</div>
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{niche.name}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ==================== HOW IT WORKS ====================
function HowItWorksSection() {
  const steps = [
    { step: '1', title: 'Escolha o Nicho', description: 'Selecione seu tipo de negócio entre +30 opções', icon: '🎯' },
    { step: '2', title: 'Personalize', description: 'IA adiciona cores, textos e imagens automaticamente', icon: '🤖' },
    { step: '3', title: 'Deploy', description: 'Site no ar em minutos com link personalizado', icon: '🚀' },
  ];

  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Processo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simples e <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">rápido</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} className={`relative text-center group`}>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
              )}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-purple-400 mb-2">PASSO {step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ==================== CTA SECTION ====================
function CTASection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pronto para criar seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">site profissional</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Junte-se a centenas de empresas que já usam nossa plataforma
        </p>
        <Link href="/create">
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-10 py-6 h-auto font-semibold hover:scale-105 transition-all duration-300">
            Começar Grátis Agora
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </Link>
      </div>
    </AnimatedSection>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">SitesSaaS</span>
            </div>
            <p className="text-sm">Crie sites profissionais com IA em minutos.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          © 2026 SitesSaaS. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN PAGE ====================
export default function Home() {
  return (
    <main className="bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">SitesSaaS</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm text-gray-300 hover:text-white transition-colors">Recursos</a>
              <a href="#nichos" className="text-sm text-gray-300 hover:text-white transition-colors">Nichos</a>
              <a href="#preços" className="text-sm text-gray-300 hover:text-white transition-colors">Preços</a>
              <a href="#depoimentos" className="text-sm text-gray-300 hover:text-white transition-colors">Depoimentos</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/create">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* Bento Grid */}
      <BentoGridSection />

      {/* Niches */}
      <NichesSection />

      {/* How it Works */}
      <HowItWorksSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

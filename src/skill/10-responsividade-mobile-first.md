# Skill: Responsividade & Mobile-First Design

**Fonte:** Kevin Powell, Web Dev Simplified, CSS Tricks, StudioLimb

## Mobile-First: O Padrão de Design Essencial

### 1. Filosofia Mobile-First
- 70%+ do tráfego da web é mobile
- Projete PARA MOBILE primeiro, depois expanda para desktop
- Mobile forces: foco, simplicidade, hierarquia clara
- Desktop = mobile com mais espaço, não o contrário

### 2. Breakpoints Estratégicos
```css
/* Mobile-first: base é mobile */
/* Celular: 320px - 480px (base) */
@media (min-width: 640px)  { /* Tablet pequeno */ }
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop pequeno */ }
@media (min-width: 1280px) { /* Desktop */ }
@media (min-width: 1536px) { /* Desktop grande */ }
```

### 3. Fluid Typography (sem breakpoints manuais)
```css
h1 { font-size: clamp(2rem, 4vw + 1rem, 4.5rem); }
p  { font-size: clamp(0.95rem, 1vw + 0.5rem, 1.125rem); }
```
- `clamp(MIN, PREFERRED, MAX)` — tamanho fluido sem media queries
- Use viewport units + rem para escala natural

### 4. Layout Flexível
```css
/* Grid responsivo automático */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}

/* Flex wrap automático */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.flex-wrap > * {
  flex: 1 1 250px; /* min 250px, cresce igualmente */
}
```

### 5. Container Queries (CSS 2024+)
```css
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```
- Container Queries > Media Queries para componentes
- O componente se adapta ao SEU container, não à viewport

### 6. Touch Targets (Mobile UX)
- Mínimo 44x44px para elementos tocáveis (Apple HIG)
- Mínimo 48x48px para WCAG
- Espaçamento entre alvos: mínimo 8px
- Polegar reach: centro da tela é mais fácil que topo

### 7. Imagens Responsivas
```tsx
<Image
  src="/hero.webp"
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 1200px"
  fill
  className="object-cover"
  priority
/>
```
- Next.js Image com `sizes` para carregamento eficiente
- `srcSet` para densidades de pixel (1x, 2x, 3x)
- WebP/AVIF como formato moderno
- Lazy loading: abaixo da dobra

### 8. Mobile Navigation Patterns
- **Hamburger menu**: padrão universal, familiar
- **Bottom nav**: 3-5 ícones, thumb-reachable
- **Sticky top nav**: sempre visível, compacto
- **Categorias em horizontal scroll**: swipeable
- NUNCA: hover-only menus no mobile

### 9. Performance Mobile
- LCP < 2.5s (Core Web Vital)
- FID/INP < 200ms
- CLS < 0.1
- Bundle size: < 200KB JS crítico
- Code splitting: lazy load componentes pesados (3D, animações)

### 10. Checklist Responsivo Premium
- [ ] Mobile-first CSS (base é mobile)
- [ ] `clamp()` para tipografia fluida
- [ ] Grid com `auto-fit`/`minmax` flexível
- [ ] Container Queries para componentes reutilizáveis
- [ ] Touch targets 44x44px min
- [ ] Imagens com `sizes` + lazy loading
- [ ] Navegação otimizada para polegar
- [ ] Nenhum hover dependency (tooltips, menus)
- [ ] Testado em 320px, 390px, 768px, 1024px, 1440px
- [ ] Core Web Vitals within green

### 11. Padrão: Layout Hero Responsivo
```tsx
<section className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh] px-4 md:px-8">
  {/* Conteúdo: sempre vem primeiro no DOM (mobile-first) */}
  <div className="order-2 md:order-1 space-y-6">
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
      Headline
    </h1>
    <p className="text-base md:text-lg text-muted max-w-[65ch]">
      Descrição
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <button className="btn-primary w-full sm:w-auto">CTA</button>
      <button className="btn-ghost w-full sm:w-auto">Secondary</button>
    </div>
  </div>
  {/* Visual: segundo no mobile, direito no desktop */}
  <div className="order-1 md:order-2">
    <Scene3D />
  </div>
</section>
```

### 12. Mobile-specific UX Patterns
- **Sticky CTA**: barra fixa no bottom com botão principal (+40% conversão)
- **Full-width inputs**: maior touch area em formulários
- **Accordion FAQ**: economiza espaço vertical
- **Horizontal scroll**: categorias, depoimentos (swipe gesture)
- **Bottom sheets**: actions e filtros (ao invés de modais)
- **Pull-to-refresh**: familiar em apps

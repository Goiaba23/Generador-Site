# Skill: CSS Moderno & Performance Optimization

**Fonte:** Kevin Powell, web.dev, CSS Tricks, Josh W Comeau

## CSS Moderno: Técnicas que Fazem Diferença

### 1. Container Queries (A Revolução)
```css
/* O componente se adapta ao container, não à viewport */
.card-grid {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}
@container card (min-width: 600px) {
  .card { grid-template-columns: 1fr 1fr 1fr; }
}
```
- Container Queries criam componentes verdadeiramente reutilizáveis
- Suporte: 90%+ dos navegadores (2024+)

### 2. CSS Layers (@layer)
```css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .card { background: white; padding: 1rem; }
}

@layer utilities {
  .m-4 { margin: 1rem; }
}
```
- Controle explícito de especificidade
- Nunca mais use `!important`
- Ordem: base < components < utilities

### 3. has() Selector (CSS Parent Selector)
```css
/* Estiliza o pai baseado no filho */
.card:has(.badge) { border-color: var(--accent); }
.form:has(:invalid) .submit-btn { opacity: 0.5; }
.grid:has(.featured) { --grid-cols: 2fr 1fr; }

/* Dark mode sem JS */
html:has([data-theme="dark"]) { --bg: #0A0A0F; }
```
- Suporte: 90%+ dos navegadores (2024+)

### 4. Scroll-Driven Animations (CSS nativo)
```css
.card {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-in {
  from { opacity: 0; scale: 0.8; translate: 0 40px; }
  to   { opacity: 1; scale: 1; translate: 0 0; }
}

/* Parallax com scroll-driven */
.hero-bg {
  animation: parallax linear;
  animation-timeline: scroll();
}
@keyframes parallax {
  to { translate: 0 -30%; }
}
```

### 5. Nesting CSS (nativo)
```css
.card {
  background: var(--bg-card);
  border-radius: 1rem;

  & .title { font-size: 1.25rem; }
  & .desc { color: var(--text-muted); }

  &:hover {
    transform: translateY(-4px);

    & .title { color: var(--accent); }
  }

  @media (width < 768px) {
    padding: 1rem;
  }
}
```

### 6. Performance: GPU Compositing
```css
/* ✅ Animáveis por GPU — 60fps garantido */
.element {
  transform: translateX(100px);
  opacity: 0.5;
  filter: blur(4px);  /* GPU em Chrome/Safari */
}

/* ❌ Animáveis por CPU — trava o layout */
.bad {
  width: 300px;
  height: 200px;
  top: 100px;
  margin-left: 50px;
}
```

### 7. Content Visibility (Lazy Render)
```css
.section-below-fold {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```
- Browser só renderiza quando está perto do viewport
- contain-intrinsic-size: estimativa de altura (evita CLS)
- Reduz drasticamente o tempo de renderização inicial

### 8. Subgrid (Grid avançado)
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid; /* herda linhas do pai */
  grid-row: span 3; /* ocupa 3 linhas do grid pai */
}
```
- Cards na mesma linha ficam com alturas iguais automaticamente

### 9. View Transitions API (SPA-like sem JS)
```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}
```
- Transições de página nativas sem bibliotecas
- Cross-document: funciona entre páginas HTML estáticas
- Suporte: Chrome 126+, em expansão

### 10. Performance: Font Loading
```css
/* Estratégia: swap + fallback + preload */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2');
  font-display: swap;
  font-weight: 300 700;
}

/* No HTML: <link rel="preload" href="/fonts/SpaceGrotesk-Variable.woff2" as="font" crossorigin> */
```

### 11. Performance: Image Loading
```tsx
// Next.js Image — otimização automática
<Image
  src="/hero.webp"
  width={1200}
  height={675}
  priority={isAboveFold}
  loading={isAboveFold ? undefined : "lazy"}
  placeholder="blur"
  blurDataURL="data:image/webp;base64,..."
/>

// CSS: aspect-ratio evita CLS
img, video {
  max-width: 100%;
  height: auto;
  aspect-ratio: attr(width) / attr(height);
}
```

### 12. Modern Reset CSS
```css
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
  color: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
p { max-width: 65ch; } /* leiturabilidade */
```

### 13. Checklist CSS Moderno
- [ ] Reset CSS aplicado
- [ ] Design tokens organizados (variáveis CSS)
- [ ] `clamp()` para valores fluidos
- [ ] Container Queries (em vez de só media queries)
- [ ] CSS Layers para organização
- [ ] `has()` selector onde aplicável
- [ ] GPU-composited animations (transform + opacity)
- [ ] `content-visibility` para seções abaixo da dobra
- [ ] Aspect-ratio em imagens (contra CLS)
- [ ] Font display: swap + preload
- [ ] Nesting CSS (estrutura limpa)

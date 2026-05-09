# Skill: 3D Animations & GSAP Mastery

**Fonte:** JavaScript Mastery, Codrops, GSAP Guides, Three.js Journey

## Princípios de Animação Web Premium

### 1. Filosofia: Movimento com Propósito
- Animação NÃO é decoração — é **feedback** e **narrativa**
- Cada animação deve guiar, informar ou encantar
- 200-300ms para micro-interações (responsivo)
- 800-1200ms para transições de cena (cinemático)

### 2. GPU Compositing (performance crítica)
- Animar APENAS `transform` e `opacity`
- NUNCA animar `width`, `height`, `top`, `left`, `margin`, `padding`
- `transform: translateZ(0)` força aceleração GPU
- `will-change: transform` usar com moderação, remover após animação

### 3. GSAP ScrollTrigger Patterns

**Scroll Reveal (padrão):**
```js
gsap.from('.elemento', {
  opacity: 0, y: 40, duration: 0.8, stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.elemento', start: 'top 85%' }
});
```

**Pin (seção fixa com animação):**
```js
ScrollTrigger.create({
  trigger: '.secao',
  pin: true,
  start: 'top top',
  end: 'bottom top',
  scrub: 1
});
```

**Timeline encadeada:**
```js
const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
tl.from(badge, { opacity: 0, y: 20, duration: 0.8 })
  .from(title, { opacity: 0, y: 40, duration: 1 }, '-=0.4')
  .from(text, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
```

**Split Text (títulos com stagger de caracteres):**
```js
const split = new SplitText('.heading', { type: 'chars' });
gsap.from(split.chars, {
  opacity: 0, y: 50, rotateX: -90, stagger: 0.02,
  scrollTrigger: { trigger: '.heading', start: 'top 85%' }
});
```

### 4. Three.js Integration Patterns

**Setup básico com React:**
```tsx
const Canvas = dynamic(() => import('@/components/Scene3D'), { ssr: false });
```

**Scroll-reactive 3D (Lenis + Three.js):**
- Lenis driver o scroll suave
- GSAP ticker atualiza o render loop do Three.js
- A câmera ou objetos 3D respondem à posição do scroll
- Velocidade do scroll vira input para shaders

**Mouse tracking 3D:**
```tsx
useFrame((state) => {
  mesh.current.rotation.x = state.pointer.y * 0.2;
  mesh.current.rotation.y = state.pointer.x * 0.2;
});
```

### 5. Easing Curves por Emoção
| Easing | Sensação | Uso |
|--------|----------|-----|
| `power1.out` | Suave, natural | Micro-interações |
| `power3.out` | Enfático, premium | Scroll reveals |
| `power4.out` | Dramático | Entrada de hero |
| `expo.out` | Explosivo | CTAs, destaques |
| `bounce.out` | Divertido | Elementos lúdicos |
| Elastic | Energético | Ícones, badges |

### 6. CSS Scroll-Driven Animations (2026)
```css
.elemento {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-in {
  from { opacity: 0; scale: 0.8; }
  to { opacity: 1; scale: 1; }
}
```

### 7. Micro-interações Essenciais
- **Hover suave** em cards (translateY -4px + shadow)
- **Scale sutil** em botões ao passar mouse
- **Loading skeletons** com pulse animation
- **Progress bars** animadas no scroll
- **Parallax** sutil em backgrounds (10-20% mais lento)
- **Contador animado** em números (countUp)

### 8. Responsividade em Animações
- Reduzir intensidade em mobile (menos deslocamento)
- `matchMedia` do GSAP para breakpoints
- `prefers-reduced-motion: reduce` → desligar animações
- `gsap.matchMedia()` para controlar por viewport

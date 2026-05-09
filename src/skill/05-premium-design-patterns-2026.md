# Skill: Premium Design Patterns 2026

**Fonte:** StudioLimb, WebSpec, Vezert, Figma, Awwwards, Dribbble

## O Estado da Arte do Web Design em 2026

### 1. Glassmorphism 2.0
- Não é mais o vidão pesado de 2023
- **Translucência funcional**: sobreposições sutis com backdrop-filter: blur(12px)
- Ideal para: navbars, cards sobre 3D, modais
- Combina com: dark mode, gradientes suaves

### 2. Dark Mode Semântico
```css
[data-theme="dark"] {
  --bg: #0A0A0F;
  --surface: #0F0F18;
  --text: #F0F0F5;
}
[data-theme="light"] {
  --bg: #FFFFFF;
  --surface: #F5F5F7;
  --text: #1A1A2E;
}
```
- **Design tokens** em vez de cores hardcoded
- `prefers-color-scheme` como fallback
- Dark mode NÃO é só preto — use tons profundos (#0A0A0F, #0F0F18)

### 3. Bold Typography (Títulos como Hero)
- Font-size: `clamp(3rem, 8vw, 8rem)` para headlines
- Letter-spacing: -0.03em a -0.05em (condensado)
- **Variable fonts**: 1 arquivo substitui 4-6 pesos
- Animação de kerning e tracking no scroll
- Pairings 2026: Space Grotesk (heading) + Sora (body)

### 4. Micro-gradientes
- Não mais os gradientes gigantes de 2022
- **Subtos, direcionais, propositais**
- Ex: `linear-gradient(135deg, rgba(6,182,212,0.06), rgba(59,130,246,0.03))`
- Usar em: cards, hover states, backgrounds sutis

### 5. Organic Layouts
- **Broken grids**: elementos que saem do grid propositalmente
- **Soft arcs**: cantos arredondados generosos (1rem-1.5rem)
- **Asymmetry**: equilíbrio sem simetria perfeita
- **Bento grids**: Apple-style, modulares, assimétricos
- **Alternating layout**: left/right alternando conteúdo

### 6. Warm Aesthetics
- **Earth tones**: terracota, olive, camel, bronze
- **Tactile textures**: noise overlay sutis, grain
- **Warm lighting**: âmbar, copper, gold accents
- Combate o "cold tech look" — humaniza o digital

### 7. Vibrant Accents
- **Neon pops**: cyan, lime, magenta em doses controladas
- **High contrast**: fundo escuro + cor vibrante (ex: #06B6D4 sobre #0A0A0F)
- Ideal para: lifestyles, beauty, tech criativo
- Usar no máximo 1-2 cores de destaque

### 8. Bento Grid (Apple-style)
```
┌─────────────┬──────┬──────┐
│             │  A   │  B   │
│   GRANDE    ├──────┼──────┤
│   HERO      │  C   │  D   │
│             ├──────┴──────┤
│             │   CITAÇÃO   │
├──────┬──────┼──────┬──────┤
│  E   │  F   │  G   │  H   │
└──────┴──────┴──────┴──────┘
```
- Grid de 4 colunas, auto-rows
- Cards modulares com tamanhos variados
- Um card "hero" ocupa 2x2
- Perfeito para: features, processo, metodologia

### 9. Scroll Storytelling
- **Pin sections**: seção fixa enquanto conteúdo anima dentro
- **Progress bar**: indicador de progresso no scroll
- **Reveal sequencial**: cada elemento aparece no seu momento
- **Camera moves**: câmera 3D se movimenta com scroll
- **Split screens**: conteúdo de um lado, visual do outro, revezam

### 10. Noise Texture Overlay
```css
.noise-overlay {
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none; opacity: 0.015;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' ...");
}
```
- Adiciona textura tátil sutil
- Combate o "digital liso demais"
- Opacidade: 0.01-0.03 (sutil, quase imperceptível)

### 11. Layout de Seções Premium (CyanStudio padrão)
| Seção | Propósito | Elementos-chave |
|-------|-----------|-----------------|
| Nav | Navegação | Logo + 4-5 links + CTA, backdrop blur |
| Hero | Primeira impressão | Badge + Headline + Sub + CTA + Stats |
| Logo Bar | Prova social | Logos clientes (opacidade 0.3) |
| Features | Diferenciais | Grid/Bento com ícones e descrições |
| Processo | Como funciona | Timeline vertical/passos numerados |
| Serviços/Preços | Conversão | 3 tiers, destaque no do meio |
| Depoimentos | Prova social | Cards com foto, nome, cargo |
| FAQ | Objeções | Accordion, respostas curtas |
| CTA Final | Último push | Headline + Sub + Botão destaque |
| Footer | Encerramento | Links + redes + copyright |

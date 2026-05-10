export const animacoes_3d_gsap = {
  "name": "Animações 3D com GSAP",
  "description": "Domínio de GSAP (GreenSock) com ScrollTrigger, SplitText e Lenis para animações web profissionais.",
  "source": "YouTube: GSAP Official ScrollTrigger, GSAP ScrollTrigger Mastery, GSAP SplitText Plugin, Lenis + GSAP tutorials",
  "sandwichLayers": {
    "foundation": {
      "keyLibraries": [
        {
          "name": "GSAP Core",
          "purpose": "Animações base (tweens, timelines)",
          "cdn": "gsap CDN"
        },
        {
          "name": "ScrollTrigger",
          "purpose": "Animações baseadas em scroll (pinning, parallax, scrub)",
          "cdn": "ScrollTrigger plugin"
        },
        {
          "name": "SplitText",
          "purpose": "Dividir texto em linhas/palavras/caracteres para animações de revelação",
          "cdn": "SplitText plugin (free)"
        },
        {
          "name": "Lenis",
          "purpose": "Smooth scroll com easing personalizado",
          "cdn": "lenis@latest"
        }
      ]
    },
    "animation": {
      "scrollPatterns": [
        {
          "pattern": "Pin + Reveal",
          "description": "Prende seção enquanto anima entrada de elemento",
          "code": "ScrollTrigger.create({trigger, pin: true, scrub: 1})"
        },
        {
          "pattern": "Slide-in Panels",
          "description": "Múltiplos painéis entrando de direções diferentes durante scroll",
          "code": "Timeline + ScrollTrigger com scrub"
        },
        {
          "pattern": "Velocity Skew",
          "description": "Tracking de velocidade do scroll para aplicar skew em imagens",
          "code": "onUpdate: usar getVelocity() para aplicar skew"
        },
        {
          "pattern": "Parallax Multi-camada",
          "description": "Background e foreground scrollam em velocidades diferentes",
          "code": "gsap.to(bg, {yPercent: -20, scrollTrigger: {scrub: true}})"
        },
        {
          "pattern": "Horizontal Scroll",
          "description": "Seção horizontal dentro de layout vertical (Lenis necessário)",
          "code": "scrollTrigger scrub + gsap.to(container, {xPercent})"
        },
        {
          "pattern": "Split Text Reveal",
          "description": "Revelar texto por palavras/caracteres com stagger",
          "code": "SplitText + gsap.from(chars, {opacity:0, stagger:0.02})"
        },
        {
          "pattern": "Mask Reveal",
          "description": "Revelar conteúdo através de máscara animada",
          "code": "SplitText + clip-path animado"
        }
      ],
      "lenisSetup": "html { scroll-behavior: initial; overflow: hidden }\nbody { /* smooth scroll via Lenis */ }",
      "bestPractices": [
        "Registre os plugins: gsap.registerPlugin(ScrollTrigger, SplitText)",
        "Split por type mínimo necessário (words > chars para performance)",
        "Use matchMedia() para responsividade: gsap.matchMedia()",
        "Lembre de .kill() em componentes React (cleanup)",
        "ScrollTrigger.refresh() após mudanças de layout"
      ]
    }
  },
  "keyTakeaways": [
    "ScrollTrigger + pin + scrub = 80% dos efeitos avançados que você precisa",
    "SplitText é GRATUITO agora — use para revelações de texto profissionais",
    "Lenis + ScrollTrigger = smooth scroll + animações sincronizadas",
    "Sempre faça cleanup de animações em SPAs para evitar memory leaks"
  ]
} as const;

export type animacoes_3dGsap = typeof animacoes_3d_gsap;

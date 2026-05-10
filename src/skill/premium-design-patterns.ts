export const premium_design_patterns = {
  "name": "Premium Design Patterns",
  "description": "Padrões de design premium: Glassmorphism, Bento Grid, Gradients, Micro-interações, e tendências 2026.",
  "source": "YouTube: \"Top 2026 Web Design Trends\", \"Glassmorphism vs Bento Grid 2026\" + Firecrawl HTTPster gallery",
  "sandwichLayers": {
    "foundation": {
      "principle": "Design premium em 2026 = múltiplas tendências combinadas. Não use um único padrão — misture bento grids com glassmorphism, micro-animações com gradientes.",
      "trends": [
        {
          "trend": "Bento Grid",
          "description": "Layout modular inspirado em bento boxes japonês. Cards em grid com conteúdo organizado.",
          "bestFor": "Dashboards, e-commerce, sites com muito conteúdo"
        },
        {
          "trend": "Glassmorphism",
          "description": "Efeito vidro fosco com backdrop-filter: blur(). Semi-transparência + profundidade.",
          "bestFor": "High-end apps, branding, interfaces criativas"
        },
        {
          "trend": "Gradientes Dinâmicos",
          "description": "Gradientes que transitam entre cores, com interação de mouse. SVG + CSS backgrounds",
          "bestFor": "Heros, backgrounds, logotipos 3D"
        },
        {
          "trend": "2D + 3D Mix",
          "description": "Elementos 2D e 3D coexistindo. 3D para hero/background, 2D para conteúdo.",
          "bestFor": "Homepages, portfolios, landing pages"
        },
        {
          "trend": "Micro-interações",
          "description": "Pequenas animações em hover/click. Mouse-trailers, botões com ripple, cards que levitam.",
          "bestFor": "Toda interface moderna"
        },
        {
          "trend": "Variable Fonts",
          "description": "Fontes com múltiplos eixos de variação (weight, width, slant). Animações de fonte.",
          "bestFor": "Headings, logotipos, experiências interativas"
        }
      ]
    },
    "premium": {
      "glassmorphism": {
        "css": "background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2);",
        "when": "Modais, cards sobre imagens, nav bars flutuantes",
        "caution": "Pode afetar performance em devices fracos. Use com moderação."
      },
      "bentoGrid": {
        "setup": "CSS Grid com grid-template-areas para layout assimétrico",
        "when": "Seções de features, preços, portfólio, dashboard",
        "tip": "Combine com micro-animações nos cards para não ficar estático"
      },
      "gradients": {
        "pattern": "background: linear-gradient(135deg, rgba(6,182,212,0.06), rgba(59,130,246,0.03));",
        "dynamic": "SVG gradients + mousemove event para gradientes interativos"
      }
    }
  },
  "keyTakeaways": [
    "Bento Grid + Glassmorphism + Gradients = stack visual premium em 2026",
    "Micro-interações são o \"cheiro\" de site profissional",
    "Misture 2D e 3D para profundidade sem sacrificar performance",
    "Variable fonts dão personalidade sem peso extra de carregamento"
  ]
} as const;

export type premiumDesignPatterns = typeof premium_design_patterns;

export const color_theory_mastery = {
  "name": "Color Theory Mastery",
  "description": "Domínio completo de teoria das cores para UI design, com paletas práticas e psicologia das cores aplicada a conversão.",
  "source": "YouTube: \"Color Theory Practical\" by DesignerUp + niche research data",
  "sandwichLayers": {
    "foundation": {
      "principle": "Cor é percepção, não matemática. Cada pessoa vê cores de forma diferente baseada em fatores culturais e contextuais.",
      "keyRules": [
        "Regra 60-30-10: 60% neutra (background), 30% secundária (cards/headers), 10% acento (CTAs)",
        "Contraste mínimo 4.5:1 para texto pequeno, 3:1 para texto grande (WCAG AA)",
        "Use opacidade em vez de adicionar mais cores ao palette",
        "Nunca use geradores automáticos sem ajuste contextual",
        "Prefira escalas tonais a cores múltiplas"
      ],
      "psychology": "Azul = confiança, Laranja = ação/urgência, Verde = saúde/natureza, Roxo = criatividade/luxo, Vermelho = energia/perigo"
    },
    "colors": {
      "methodology": "Pegue emprestado de designs de sucesso e refine — não crie paletas do zero. Use CSS Overview no Chrome DevTools para extrair paletas de sites reais.",
      "tools": "coolers.co (contraste), Chrome CSS Overview, Figma contrast checker, Adobe Color",
      "schemes": [
        {
          "type": "Monocromático",
          "use": "Designs elegantes e minimalistas",
          "confidence": "Alta"
        },
        {
          "type": "Análogo",
          "use": "Harmonia suave e profissional",
          "confidence": "Alta"
        },
        {
          "type": "Complementar",
          "use": "Alto contraste para CTAs e destaque",
          "confidence": "Média"
        },
        {
          "type": "Triádico",
          "use": "Paletas vibrantes e criativas",
          "confidence": "Média"
        },
        {
          "type": "Split-Complementar",
          "use": "Contraste suave com mais opções de cor",
          "confidence": "Alta"
        }
      ]
    },
    "typography": {
      "colorApplication": "Texto escuro sobre fundo claro para legibilidade. Use cor apenas para destacar elementos-chave como links e CTAs.",
      "contrastRules": [
        "Nunca coloque texto cinza claro sobre fundo branco",
        "Use preto puro (#000) ou quase preto (#1A1A2E) para corpo de texto",
        "Cores vibrantes são para acentos, não para texto longo",
        "Sempre verifique contraste no contexto real de fundo"
      ]
    }
  },
  "keyTakeaways": [
    "Teoria das cores é só o ponto de partida — contexto e cultura determinam a escolha final",
    "Menos cores = mais impacto. Limite a 2-3 cores principais por projeto",
    "Use ferramentas de contraste sempre. Acessibilidade não é opcional",
    "Extraia paletas de sites de sucesso como ponto de partida"
  ]
} as const;

export type colorTheoryMastery = typeof color_theory_mastery;

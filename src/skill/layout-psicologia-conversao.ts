export const layout_psicologia_conversao = {
  "name": "Layout e Psicologia de Conversão",
  "description": "Sistemas de grid, espaçamento, hierarquia visual e princípios de conversão para web design de alto desempenho.",
  "source": "YouTube: \"5 Skills That Matter\", \"The Easy Way to Design Top Tier Websites\" + Gestalt principles",
  "sandwichLayers": {
    "foundation": {
      "psychology": [
        "Lei de Hick: reduzir opções → aumentar conversões (máx 5-7 nav links, 3 tiers de preço)",
        "Peak-End Rule: a última seção (CTA) define como o usuário lembra da experiência",
        "Von Restorff Effect: o elemento que mais se destaca é o mais lembrado (seu CTA)",
        "Objetivo único por página: comprar, assinar, ou agendar — nunca os 3 na mesma página",
        "CTA visível em segundos: hero, nav, e a cada 2-3 seções de scroll"
      ]
    },
    "typography": {
      "spacingSystem": "Valores: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px\nConverta para REM: divida por 16\nEx: 32px = 2rem, 16px = 1rem"
    }
  },
  "keyTakeaways": [
    "Sistema de grid consistente > layout \"criativo\". Use 12-col + 8pt grid sempre.",
    "Hierarquia visual = tamanho + peso + cor + proximidade. Nessa ordem de prioridade.",
    "1 objetivo por página. Se o usuário pode fazer 2 coisas, ele não faz nenhuma.",
    "Espaçamento é a ferramenta de design mais subestimada — use com generosidade."
  ]
} as const;

export type layoutPsicologiaConversao = typeof layout_psicologia_conversao;

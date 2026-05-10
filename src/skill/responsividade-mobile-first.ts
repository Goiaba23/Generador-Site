export const responsividade_mobile_first = {
  "name": "Responsividade Mobile-First",
  "description": "Estratégias mobile-first com CSS Grid, Flexbox, Tailwind e breakpoints inteligentes.",
  "source": "YouTube transcripts + Tailwind best practices + responsive design patterns",
  "sandwichLayers": {
    "foundation": {
      "principle": "Mobile-first = comece pelo menor viewport e adicione complexidade conforme a tela cresce. Mais fácil, mais performático.",
      "breakpoints": {
        "sm": "640px (mobile landscape)",
        "md": "768px (tablet)",
        "lg": "1024px (desktop)",
        "xl": "1280px (desktop wide)",
        "xxl": "1536px (ultrawide)"
      },
      "grid": {
        "mobile": "1 column (ou 4-col grid)",
        "tablet": "8 columns",
        "desktop": "12 columns"
      }
    },
    "keyTakeaways": [
      "Mobile-first = base mobile, media queries para desktop (min-width)",
      "Use Tailwind: sm:, md:, lg:, xl: para breakpoints consistentes",
      "Fontes em REM adaptam-se às preferências do usuário automaticamente",
      "Teste em dispositivo real — emulador não captura toque verdadeiro"
    ]
  }
} as const;

export type responsividadeMobileFirst = typeof responsividade_mobile_first;

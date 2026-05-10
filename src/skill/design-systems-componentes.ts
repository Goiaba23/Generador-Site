export const design_systems_componentes = {
  "name": "Design Systems e Componentes",
  "description": "Criação de design systems reutilizáveis com componentes, variáveis de design e documentação.",
  "source": "YouTube: \"The Easy Way\" + \"Top Tier Websites\" + shadcn/ui patterns + Tailwind",
  "sandwichLayers": {
    "foundation": {
      "principle": "Design system = dicionário visual. Define cores, tipografia, spacing, e components em um sistema coeso.",
      "system": {
        "colors": "Paleta de 5-7 cores: primary, secondary, accent, neutral, success, warning, error",
        "typography": "Type scale: h1-h6 + body + small. Font families definidas como variáveis CSS",
        "spacing": "8-point grid system: 4,8,12,16,24,32,40,48,64,80,96,128px",
        "components": "Button (primary/secondary/ghost), Input, Card, Badge, Modal, Accordion, Tabs"
      }
    },
    "keyTakeaways": [
      "Variáveis CSS para tudo: --color-primary, --spacing-md, --font-body",
      "shadcn/ui + Tailwind = design system pronto com customização total",
      "Componentes isolados (Button, Input) são os blocos de construção",
      "Documente cada componente com exemplos de uso e variantes"
    ]
  }
} as const;

export type designSystemsComponentes = typeof design_systems_componentes;

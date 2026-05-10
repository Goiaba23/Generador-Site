export const typography_mastery = {
  "name": "Typography Mastery",
  "description": "15 regras essenciais de tipografia para web design, desde escalas tipográficas até hierarquia visual e spacing.",
  "source": "YouTube: \"Typography 15 Rules\" by Adrian Samosa + \"5 Web Design Skills\" transcript",
  "sandwichLayers": {
    "foundation": {
      "principle": "Tipografia ocupa mais espaço visual que qualquer outro elemento no site. Dominá-la é o maior diferencial entre设计师 iniciantes e profissionais.",
      "keyRules": [
        "Use type scale system (Major Third = 1.25x ratio) para consistência",
        "Base 16px para corpo de texto → headings escalam 1.25x (16→20→25→31→39→49)",
        "Line height = 150% do font size para parágrafos, reduzir conforme texto aumenta",
        "Letter spacing: padrão para body, reduzir ligeiramente para headings grandes",
        "30-50 palavras por linha para blogs — use max-width para controlar"
      ]
    },
    "typography": {
      "headingPairs": [
        {
          "heading": "Playfair Display",
          "body": "Sora",
          "vibe": "Elegante + Moderna",
          "bestFor": "Restaurantes, Hoteis, Salões"
        },
        {
          "heading": "Space Grotesk",
          "body": "Inter",
          "vibe": "Tech + Limpa",
          "bestFor": "Tecnologia, Clínicas, Consultorias"
        },
        {
          "heading": "Oswald",
          "body": "Inter",
          "vibe": "Bold + Profissional",
          "bestFor": "Barbearias, Academias"
        },
        {
          "heading": "Bebas Neue",
          "body": "Sora",
          "vibe": "Impacto + Corpo limpo",
          "bestFor": "Gym, Eventos"
        },
        {
          "heading": "Fredoka",
          "body": "Nunito",
          "vibe": "Amigável + Arredondada",
          "bestFor": "Pet Shop, Educação Infantil"
        },
        {
          "heading": "Cormorant Garamond",
          "body": "Sora",
          "vibe": "Elegante + Serena",
          "bestFor": "SPA, Bem-estar"
        }
      ],
      "resources": "fontshare.com, uncut.wtf (free fonts fora do comum), type-scale.net (gerador de escala)",
      "scaleSystem": "Use REM em vez de pixels. 1rem = 16px. Defina variáveis CSS para cada nível tipográfico."
    }
  },
  "keyTakeaways": [
    "Tipo escala consistente > ajuste manual. Use type-scale.net para gerar o sistema em 2 minutos",
    "Fontes gratuitas como Inter, Sora, Space Grotesk são excelentes — não precisa pagar",
    "Line height é a propriedade mais subestimada: 1.5 para body, 1.1-1.2 para headings",
    "Menos fontes = mais coerência. Máximo 2 famílias por projeto"
  ]
} as const;

export type typographyMastery = typeof typography_mastery;

export const website_design_restaurant = {
  "name": "RESTAURANT Website Design",
  "description": "Design de site para restaurante",
  "source": "Research data: YouTube transcripts + niche-research + skill-research sandwich method",
  "sandwichLayers": {
    "foundation": {
      "layout": "Bento Grid + Magazine",
      "structure": [
        "Hero com imagem de comida + CTA \"Peça já\"",
        "Menu categorizado com fotos",
        "Depoimentos em carrossel",
        "Galeria do ambiente",
        "Localização + Google Maps + Contato",
        "Rodapé com horários e redes sociais"
      ],
      "psychology": [
        "Laranja queimado estimula apetite",
        "Fotos de comida = craving visual",
        "Menu scaneável reduz fricção",
        "Ver localização + horário = confiança"
      ]
    },
    "colors": {
      "palette": [
        "#1A0F0A",
        "#D45113",
        "#F5E6D3",
        "#8B4513",
        "#2D1B0E"
      ],
      "scheme": "Análogo quente",
      "psychology": "Laranja queimado = apetite, tons terrosos = acolhimento"
    },
    "typography": {
      "heading": "Playfair Display",
      "body": "Sora",
      "scale": "clamp(2.5rem, 5vw, 4.5rem) → 1.125rem",
      "pairing": "Serif elegante + sans-serif moderna"
    },
    "animation": {
      "type": "scroll_reveal + parallax",
      "intensity": "medium",
      "patterns": [
        "Fade up menu items",
        "Stagger cards",
        "Parallax hero food images",
        "Gallery lightbox"
      ]
    },
    "premium": {
      "glassmorphism": true,
      "bentoGrid": true,
      "noise": true,
      "gradients": "Micro-gradientes terra cotta (135deg, rgba(212,81,19,0.06), rgba(139,69,19,0.03))"
    }
  },
  "keyTakeaways": [
    "Fotos de comida profissionais > qualquer design",
    "Menu em bento grid com categorias visíveis",
    "CTA de pedido no hero + flutuante no scroll",
    "Google Maps integrado = credibilidade"
  ]
} as const;

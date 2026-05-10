export const website_design_hotel = {
  "name": "HOTEL Website Design",
  "description": "Design de site para hotel",
  "source": "Research data: YouTube transcripts + niche-research + skill-research sandwich method",
  "sandwichLayers": {
    "foundation": {
      "layout": "Magazine + Gallery",
      "structure": [
        "Hero cinematic + busca",
        "Quartos em grid",
        "Comodidades ícones",
        "Galeria fotos",
        "Reservas online",
        "Avaliações",
        "Localização"
      ]
    },
    "colors": {
      "palette": [
        "#0A0A0F",
        "#D4A574",
        "#F5F0EB",
        "#8B7355",
        "#1A1410"
      ],
      "scheme": "Análogo quente + neutro premium",
      "psychology": "Cobre/dourado = hospitalidade premium, off-white = conforto"
    },
    "typography": {
      "heading": "Playfair Display",
      "body": "DM Sans",
      "scale": "clamp(2.5rem,5vw,4rem) → 1rem",
      "pairing": "Serif premium + sans acolhedora"
    },
    "animation": {
      "type": "cinematic",
      "intensity": "medium",
      "patterns": [
        "Full-screen gallery",
        "Parallax rooms",
        "Smooth scroll booking",
        "Video background hero"
      ]
    },
    "premium": {
      "glassmorphism": true,
      "bentoGrid": true,
      "noise": true,
      "gradients": "Gradiente dourado suave (135deg, rgba(212,165,116,0.08), rgba(139,115,85,0.04))"
    }
  },
  "keyTakeaways": [
    "Fotos profissionais > tudo",
    "Busca de datas no hero",
    "Galeria em tela cheia com parallax"
  ]
} as const;

export const framer_motion_react_animations = {
  "name": "Framer Motion para React",
  "description": "Animações em React usando Framer Motion: scroll, SVG, drag, layout animations, gestures.",
  "source": "YouTube: \"Framer Motion Basics\" tutorial + documentation knowledge",
  "sandwichLayers": {
    "foundation": {
      "principle": "Framer Motion é a biblioteca padrão de animações para React. Oferece API declarativa com componentes motion.* e hooks.",
      "setup": "npm install framer-motion\nimport { motion } from \"framer-motion\""
    },
    "animation": {
      "coreComponents": [
        {
          "component": "motion.div",
          "use": "Qualquer elemento animável",
          "props": "initial, animate, exit, whileHover, whileTap"
        },
        {
          "component": "AnimatePresence",
          "use": "Animações de saída/remoção de elementos",
          "props": "mode=\"wait\" para sincronizar"
        },
        {
          "component": "useInView",
          "use": "Disparar animações quando elemento entra no viewport",
          "props": "once: true para uma vez"
        },
        {
          "component": "useScroll",
          "use": "Animações baseadas em progresso do scroll",
          "props": "useSpring para suavizar"
        },
        {
          "component": "LayoutGroup",
          "use": "Animações de layout compartilhadas",
          "props": "id para identificar"
        }
      ],
      "patterns": [
        {
          "pattern": "Scroll Reveal",
          "code": "<motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true}} />"
        },
        {
          "pattern": "Stagger Children",
          "code": "<motion.div variants={container}><motion.div variants={item} />..."
        },
        {
          "pattern": "Drag",
          "code": "<motion.div drag dragConstraints={{left:0,right:300}} />"
        },
        {
          "pattern": "SVG Path",
          "code": "<motion.path initial={{pathLength:0}} animate={{pathLength:1}} />"
        },
        {
          "pattern": "Keyframes",
          "code": "animate={{scale:[1,2,2,1,1], rotate:[0,0,270,270,0]}}"
        },
        {
          "pattern": "Gestures",
          "code": "whileHover={{scale:1.05}} whileTap={{scale:0.95}}"
        }
      ],
      "bestPractices": [
        "AnimatePresence + key único para animações de lista",
        "Variants (parent → children) para stagger automático",
        "useSpring + useScroll para scroll animado suave",
        "layoutId para animações de layout compartilhado (modais, listas)"
      ]
    }
  },
  "keyTakeaways": [
    "90% dos casos: initial + animate + whileInView resolve",
    "Stagger = container variants com staggerChildren nos children",
    "AnimatePresence é obrigatório para animações de saída",
    "layoutId = mágica para animações de layout compartilhado"
  ]
} as const;

export type framerMotionReactAnimations = typeof framer_motion_react_animations;

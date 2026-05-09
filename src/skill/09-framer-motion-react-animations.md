# Skill: Framer Motion & React Animation Mastery

**Fonte:** rithmic (YouTube), Tom Is Loading, Brian Design, Framer Motion Docs

## Princípios de Animação React com Framer Motion

### 1. Setup Básico
```bash
npm install framer-motion
```

```tsx
import { motion } from 'framer-motion';
```

### 2. Anatomia de uma Animação
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Hello
</motion.div>
```

### 3. Padrões de Animação Essenciais

**Fade Up (Scroll Reveal)**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

**Stagger Children (lista/grid)**
```tsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  whileInView="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

**Hover & Tap**
```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  CTA Button
</motion.button>
```

### 4. Keyframes
```tsx
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    rotate: [0, 10, -10, 0],
  }}
  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
/>
```

### 5. Drag
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  dragElastic={0.1}
  whileDrag={{ scale: 1.05 }}
/>
```

### 6. Layout Animations (AnimatePresence)
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {currentTab === 'tab1' ? (
    <motion.div
      key="tab1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    />
  ) : (
    <motion.div
      key="tab2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

### 7. Scroll Progress
```tsx
import { useScroll, useTransform } from 'framer-motion';

function Component() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return <motion.div style={{ scale, opacity }} />;
}
```

### 8. SVG Animation
```tsx
<motion.path
  d="M0 100..."
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 2, ease: 'easeInOut' }}
/>
```

### 9. Variants (organização profissional)
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Uso:
<motion.div variants={container} initial="hidden" whileInView="show">
  <motion.div variants={item} />
  <motion.div variants={item} />
</motion.div>
```

### 10. Orchestration (ordem de animação)
- `staggerChildren`: intervalo entre animações de filhos
- `delayChildren`: delay ANTES do primeiro filho
- `when: "beforeChildren" / "afterChildren"`: ordem pai-filho
- `delay`: atraso individual

### 11. Easing Curves Customizadas
```tsx
transition={{ ease: [0.16, 1, 0.3, 1] }}  // premium easeOut
transition={{ ease: [0.68, -0.55, 0.27, 1.55] }}  // bounce suave
transition={{ type: 'spring', stiffness: 300, damping: 25 }}  // spring
```

### 12. Performance
- Animar APENAS `transform` e `opacity` (GPU compositing)
- `layout` prop: anima posição automaticamente (mas pode ser caro)
- `layoutId` para AnimatePresence compartilhado
- Evitar animar `width`, `height`, `top`, `left`

### 13. Micro-interações com Framer Motion
```tsx
// Card hover premium
<motion.div
  whileHover={{ y: -6, scale: 1.01 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
/>

// Botão com loading state
<motion.button
  whileTap={{ scale: 0.97 }}
  animate={isLoading ? { width: 48 } : { width: 'auto' }}
>
  {isLoading ? <Spinner /> : 'Enviar'}
</motion.button>
```

### 14. Integração com Next.js
```tsx
'use client';
import { motion } from 'framer-motion';
// Framer Motion funciona apenas em Client Components
```

### 15. Padrão: Hero Section Premium
```tsx
<motion.section className="min-h-screen flex items-center">
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="badge-cyan"
  >
    ✨ Nova Ferramenta
  </motion.span>

  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="text-5xl font-bold"
  >
    Título Impactante
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="text-lg text-muted"
  >
    Subtítulo descritivo
  </motion.p>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="flex gap-4"
  >
    <button className="btn-primary">Começar</button>
    <button className="btn-ghost">Saiba Mais</button>
  </motion.div>
</motion.section>
```

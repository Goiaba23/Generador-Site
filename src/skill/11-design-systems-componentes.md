# Skill: Design Systems & Arquitetura de Componentes

**Fonte:** shadcn/ui, Radix UI, Tailwind CSS, Figma Design Systems

## Construindo um Design System Sólido para Sites

### 1. Design Tokens (a fundação)
```css
:root {
  /* Tipografia */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Sora', sans-serif;
  --scale-h1: clamp(2.5rem, 5vw, 4.5rem);
  --scale-h2: clamp(2rem, 3.5vw, 3rem);
  --scale-body: 1rem;
  --scale-small: 0.875rem;

  /* Cores Semânticas */
  --bg-primary: #0A0A0F;
  --bg-surface: #0F0F18;
  --bg-card: #14141E;
  --text-heading: #F0F0F5;
  --text-body: #C8C8D0;
  --text-muted: #787890;
  --accent: #06B6D4;
  --accent-hover: #22D3EE;

  /* Spacing (escala 4px) */
  --space-1: 0.25rem;  /* 4px  */
  --space-2: 0.5rem;   /* 8px  */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */

  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.25);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.3);
  --shadow-glow: 0 4px 20px rgba(6,182,212,0.2);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

### 2. Sistema de Componentes (Atomic Design)
```
Átomos                    Moléculas              Organismos
─────────────             ────────────           ────────────
Button                    Card                   Header
Input                     Modal                  HeroSection
Badge                     Accordion              FeaturesGrid
Icon                      Tabs                   PricingTable
Avatar                    Form Group             Footer
Typography                Navigation             CTASection
Spinner                   Dropdown               Testimonials
```

### 3. Componente Base: Button System
```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: 'bg-gradient-to-r from-cyan to-blue text-white shadow-glow',
  secondary: 'bg-accent-dim text-accent border border-accent/20',
  ghost: 'bg-transparent text-muted hover:text-heading',
  outline: 'bg-transparent border border-border text-body',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};
```

### 4. Componente: Card Padrão
```tsx
function GlassCard({ children, className, hover = true }: Props) {
  return (
    <div className={cn(
      'bg-card border border-border rounded-xl p-6',
      'transition-all duration-300',
      hover && 'hover:-translate-y-1 hover:border-border-light',
      className
    )}>
      {children}
    </div>
  );
}
```

### 5. Pattern: Componente Composto (Compound Component)
```tsx
// Accordion
<Accordion type="single" collapsible>
  <AccordionItem value="1">
    <AccordionTrigger>O que é?</AccordionTrigger>
    <AccordionContent>Descrição...</AccordionContent>
  </AccordionItem>
</Accordion>
```
- `Accordion`: controla estado global (Context)
- `AccordionItem`: item individual com value
- `AccordionTrigger`: botão clicável
- `AccordionContent`: painel expansível

### 6. Técnicas de Composição
- **Polimorfismo**: `as` prop (mudar tag HTML)
  ```tsx
  <Text as="h1" size="2xl" weight="bold">Título</Text>
  ```
- **Slot pattern**: `leftIcon`, `rightIcon`, `children`
- **Variants**: `cva()` do class-variance-authority
- **cn()**: merge de classes com tailwind-merge + clsx

### 7. Responsividade em Componentes
```tsx
// O componente se adapta ao container, não à viewport
function FeatureCard({ icon, title, desc }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6">
      <Icon className="w-10 h-10 text-accent shrink-0" />
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted text-sm">{desc}</p>
      </div>
    </div>
  );
}
```

### 8. Separação: Client vs Server Components (Next.js)
```tsx
// Server Component (default) — renderiza no servidor, sem JS
async function SitePage() {
  const site = await prisma.site.findUnique(...);
  return <SiteContent site={site} />;
}

// Client Component — interativo, hidrata no cliente
'use client';
function SiteContent({ site }: Props) {
  const [editing, setEditing] = useState(false);
  return <div>{editing ? <Editor /> : <Viewer />}</div>;
}
```

### 9. Estado e Data Fetching
- **Server Components**: fetch direto no componente (async)
- **Client Components**: SWR/React Query para dados dinâmicos
- **Zustand/Context**: estado global mínimo (evitar excesso)
- **URL state**: search params para filtros, paginação

### 10. Checklist de Componente Premium
- [ ] Props tipadas (TypeScript estrito)
- [ ] Variants (visual + tamanho)
- [ ] Estados: default, hover, active, disabled, loading, error
- [ ] Responsivo (mobile-first)
- [ ] Acessível (role, aria-, tabIndex)
- [ ] Testado em dark/light mode
- [ ] Animações sutis (hover, enter, exit)
- [ ] `className` extensível (cn/clsx)
- [ ] Ref forwarding quando necessário
- [ ] Documentado (props, examples, variants)

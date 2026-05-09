# Skill: AI Agent Workflow for Autonomous Site Creation

**Fonte:** 10Web, SetupBots, Google Antigravity, Zylo, Twill, Cursor, Codex, GoCodeo

## Arquitetura de Agentes para Criação de Sites

### 1. Filosofia: AI como Time de Especialistas
Não é um único prompt — é um pipeline de agentes especializados:
```
Discovery Agent → Strategy Agent → Design Agent → Dev Agent 
→ 3D Agent → Animation Agent → Content Agent → QA Agent → Deploy Agent
```
Cada agente tem domínio específico, contexto próprio e saída estruturada.

### 2. Pipeline Completo (9 Agentes)

**Agent 1: Discovery & Research**
- Input: descrição do usuário (texto livre)
- Ações:
  1. Classifica tipo de site (landing, e-commerce, SaaS, portfólio, institucional)
  2. Identifica nicho e concorrência
  3. Busca tendências no YouTube, Dribbble, Awwwards, Behance
  4. Extrai padrões de design do nicho (cores, layout, CTAs)
  5. Mapeia persona: dor, desejo, objeção, jornada
  6. Gera relatório estruturado de descobertas
- Output: JSON com nicho, persona, referências, paleta sugerida

**Agent 2: Strategy & Architecture**
- Input: relatório do Discovery Agent
- Ações:
  1. Define seções baseadas no objetivo (vender, leads, informar)
  2. Cria sitemap (máx 7 páginas)
  3. Define hierarquia de conteúdo e conversão
  4. Escolhe layout pattern (bento, split, column, magazine)
  5. Mapeia jornada do usuário (entrada → ação → conversão)
- Output: Sitemap + wireframe + flow de conversão

**Agent 3: Visual Design System**
- Input: estratégia + pesquisa de tendências
- Ações:
  1. Define design tokens (cores, tipografia, spacing, radius)
  2. Cria paleta com técnica HSB (ver skill 07)
  3. Escolhe font pairing (heading + body)
  4. Define glassmorphism, noise, gradientes
  5. Gera spec visual para os dev agents
- Output: Design tokens CSS + spec visual

**Agent 4: Development & Components**
- Input: design tokens + sitemap
- Ações:
  1. Gera estrutura Next.js (App Router)
  2. Cria componentes: Nav, Hero, Features, Pricing, FAQ, Footer
  3. Implementa responsividade mobile-first
  4. Conecta dados (API, CMS, database)
  5. Otimiza performance (LCP, CLS, INP)
- Output: Código completo do site

**Agent 5: 3D & Visual Effects**
- Input: spec visual + seções que pedem 3D
- Ações:
  1. Decide se precisa de 3D (hero, background, produto)
  2. Cena Three.js/R3F com iluminação HDRI
  3. Partículas, shaders ou geometria personalizada
  4. Integra com Lenis + scroll-reactive
  5. Performance: dpr cap, lazy loading
- Output: Componente Scene3D + shaders

**Agent 6: Animation & Motion**
- Input: componentes + 3D
- Ações:
  1. Scroll reveals com stagger (cada seção)
  2. Hero animation (badge → headline → sub → CTA)
  3. Micro-interações (cards hover, botões, nav)
  4. Split text em headlines (quando aplicável)
  5. Pin sections para storytelling
  6. Escolhe ferramenta certa: GSAP vs Framer Motion vs CSS
- Output: Código de animação + timeline

**Agent 7: Content & Copy**
- Input: persona + sitemap
- Ações:
  1. Gera headlines baseadas em fórmula de conversão
  2. Escreve copy para cada seção (tom: profissional, casual, luxo)
  3. Cria CTAs com gatilhos mentais (urgência, prova social)
  4. Otimiza para SEO (meta, headings, schema)
  5. Gera variações para A/B testing
- Output: Copy completo + SEO metadata

**Agent 8: QA & Validation**
- Input: site completo + especificação
- Ações:
  1. Testa responsividade (320px, 768px, 1440px)
  2. Verifica acessibilidade (WCAG 2.2, contraste 4.5:1)
  3. Checa performance (Lighthouse, Core Web Vitals)
  4. Valida consistência visual (cores, tipografia, spacing)
  5. Audit "anti-IA": o site parece feito por humano?
- Output: Relatório de qualidade + correções

**Agent 9: Deploy & Lifecycle**
- Input: site aprovado pelo QA
- Ações:
  1. Build de produção (next build)
  2. Deploy Vercel/Cloudflare com SSL + CDN
  3. Configura analytics (GA4, Clarity)
  4. Submete sitemap ao Google Search Console
  5. Monitora performance pós-deploy
- Output: URL live + dashboard de performance

### 3. Multi-Agent Orchestration
```
User Prompt
    │
    ▼
┌─────────────────────────────────────────────────┐
│           Orchestrator Agent (gerente)           │
│  - Interpreta intenção                           │
│  - Delega para agentes especializados            │
│  - Consolida resultados                          │
│  - Loop de qualidade                             │
└─────────────────────────────────────────────────┘
    │
    ├──→ Discovery Agent ──→ Strategy Agent ──→ Design Agent
    │                                                │
    │                                                ▼
    │                                 ┌─────────────────────────┐
    │                                 │  Parallel Execution     │
    │                                 │  Dev    3D    Animation │
    │                                 │  Agent  Agent  Agent    │
    │                                 │  Content Agent          │
    │                                 └─────────────────────────┘
    │                                                │
    │                                                ▼
    │                                 ┌─────────────────────────┐
    │                                 │   QA Agent              │
    │                                 │   → feedback loop       │
    │                                 └─────────────────────────┘
    │                                                │
    │                                                ▼
    │                                 ┌─────────────────────────┐
    │                                 │   Deploy Agent          │
    │                                 └─────────────────────────┘
    │
    ▼
  Output: Site Live 🚀
```

### 4. Ferramentas que Cada Agente Usa
| Agente | Ferramentas |
|--------|-------------|
| Discovery | Web Search, YouTube Transcript, Dribbble API, Exa |
| Strategy | LLM (análise), Prisma (dados), JSON schema |
| Design | shadcn/ui, Tailwind, Design Tokens |
| Dev | Next.js, Prisma, OpenAI API, Stripe |
| 3D | Three.js, R3F, Blender (assets), GSAP |
| Animation | GSAP, Framer Motion, Lenis, SplitType |
| Content | LLM (geração), SEO tools |
| QA | Playwright, Lighthouse, Axe |
| Deploy | Vercel CLI, GitHub Actions |

### 5. Estratégia de Contexto (memória)
- `tasks.md`: lista persistente de tarefas (fonte da verdade)
- `SPEC.md`: especificação completa do projeto
- `design-tokens.json`: tokens de design (cores, tipografia)
- `progress.json`: checkpoint do pipeline
- `errors.log`: histórico de falhas para auto-repair

### 6. Auto-Repair (Zylo Pattern)
Se um agente falha (build error, lint error):
1. Agente lê o erro e identifica causa raiz
2. Gera fix específico (não regenera tudo)
3. Aplica correção e re-tenta
4. Máximo de 5 tentativas de repair
5. Se persistir, reporta para o Orchestrator

### 7. Quality Gate (Twill Pattern)
Cada etapa tem um quality gate:
```
Research Complete?    → [Gate] Mínimo 3 referências encontradas
Strategy Approved?    → [Gate] Sitemap + wireframe revisados
Design Tokens Ready?  → [Gate] Paleta + tipografia definidas
Build Passes?         → [Gate] npm run build sem erros
QA Passes?            → [Gate] Lighthouse > 85 em todas
Deploy Live?          → [Gate] URL acessível + SSL OK
```
Se um gate falha, o agente responsável é re-chamado.

### 8. User Interaction Model
```
[Usuário] "Quero site para minha hamburgueria artesanal"
    │
    ▼
[AI] Discovery → "Ótimo! Vou pesquisar tendências do nicho..."
    │ (pesquisa YouTube, Dribbble, concorrência)
    ▼
[AI] Strategy → "Estruturei: Hero + Cardápio + Diferenciais + Depoimentos + Localização + Contato"
    │ (mostra sitemap, pergunta se concorda)
    ▼
[Usuário] "Pode adicionar uma seção de delivery?"
    │
    ▼
[AI] "Adicionado! Seguindo para o design..."
    │ (gera design tokens + componentes)
    ▼
[AI] "Site criado! Preview em: nexusai.vercel.app/preview/hamburgueria"
```

### 9. Como Usar Skills Durante o Workflow
Quando um agente precisa de conhecimento específico, ele consulta as skills:
- **Discovery Agent** → lê skill 06 (AI workflow), skill 03 (psicologia)
- **Design Agent** → lê skill 01 (layout), 05 (patterns), 07 (cores), 08 (tipografia)
- **3D Agent** → lê skill 02 (animações), 04 (Three.js), 09 (Framer Motion)
- **Dev Agent** → lê skill 10 (responsivo), 11 (componentes), 12 (CSS moderno)

### 10. Comandos Rápidos para o Orchestrator
```
/criar [descrição]  → Executa pipeline completo
/pesquisar [tema]   → Discovery Agent busca referências
/redesenhar         → QA Agent + Design Agent refazem visual
/adicionar [seção]  → Strategy Agent + Dev Agent adicionam
/tema [dark/light]  → Design Agent aplica tema
/publicar           → Deploy Agent faz deploy
/status             → Mostra progresso do pipeline
```

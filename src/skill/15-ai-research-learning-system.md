# Skill: AI Research & Autonomous Learning System

**Fonte:** Análise de agent frameworks (Antigravity, 10Web, Cursor, Codex, Twill)

## Como a IA Pesquisa, Aprende e Aplica Conhecimento

### 1. O Ciclo de Pesquisa Autônoma
```
[Problema] → [Buscar] → [Extrair] → [Sintetizar] → [Aplicar] → [Verificar]
```

### 2. Etapa 1: Análise do Problema
Antes de pesquisar, a IA deve:
1. Identificar O QUE precisa saber (ex: "melhor biblioteca de carrossel")
2. Definir palavras-chave de busca (ex: "react carousel touch slider 2026")
3. Determinar fontes de busca (YouTube, NPM, GitHub, Docs)
4. Estimar profundidade necessária (quick search vs deep research)

**Exemplo:**
```
Usuário: "Quero um carrossel de depoimentos"
IA analisa:
- Preciso de carrossel touch-ready com autoplay
- Palavras: "embla carousel react", "slick slider alternative 2026"
- Fontes: YouTube (tutoriais), NPM (bibliotecas), Docs (implementação)
- Profundidade: média (já conheço Embla, preciso confirmar)
```

### 3. Etapa 2: Busca Multi-Fonte
A IA busca em múltiplas fontes simultaneamente:

**YouTube**
```javascript
// Padrão de busca
const query = `react carousel tutorial 2026 embla framer-motion`;
// Extrair transcript
const transcript = await YoutubeTranscript.fetchTranscript(videoId);
// Sintetizar: extrair bibliotecas mencionadas, padrões, pitfalls
```

**Web Search**
```javascript
// Semantic search (Exa) + Web search
const results = await search("best free react carousel library 2026");
// Extrair: nomes, prós/contras, exemplos de código
```

**Documentação**
```javascript
// Context7 para docs oficiais
const docs = await queryDocs("/danklabs/embla-carousel", "autoplay API");
```

**GitHub/NPM**
```javascript
// Verificar: stars, issues, última atualização, bundle size
// NPM: npm view embla-carousel
// GitHub: stars, open issues, license
```

### 4. Etapa 3: Extração de Conhecimento
De cada fonte, extrair:
- **Nome da tecnologia/biblioteca**
- **Conceitos-chave** (3-5 bullets)
- **Código de exemplo** (snippets)
- **Prós e contras**
- **Pitfalls comuns** (erros que outros cometeram)
- **Links úteis** (docs, demo, tutorial)

**Template de extração:**
```json
{
  "library": "embla-carousel",
  "concepts": ["touch-ready", "autoplay", "infinite loop", "responsive"],
  "snippet": "import useEmblaCarousel from 'embla-carousel-react'",
  "pros": ["~5KB", "MIT", "active", "acessível"],
  "cons": ["curva de aprendizado API", "documentação densa"],
  "pitfalls": ["não esquecer container overflow hidden"],
  "links": ["https://www.embla-carousel.com"]
}
```

### 5. Etapa 4: Síntese & Decisão
A IA cruza as informações e DECIDE:
```javascript
function decide(options) {
  // Critérios de decisão:
  // 1. Bundle size (priorizar < 10KB)
  // 2. Licença (MIT > Apache > GPL)
  // 3. Manutenção (último update < 6 meses)
  // 4. Popularidade (stars > 1000)
  // 5. Docs quality (exemplos claros)
  // 6. Integração com stack (Next.js, React 18+)
  return bestOption;
}
```

**Matriz de Decisão:**
| Biblioteca | Bundle | License | Stars | Updated | Score |
|-----------|--------|---------|-------|---------|-------|
| Embla | 5KB | MIT | 6k | 2 weeks | ⭐⭐⭐⭐⭐ |
| Slick | 25KB | MIT | 28k | 3 years | ⭐⭐ |
| Swiper | 30KB | MIT | 40k | 1 month | ⭐⭐⭐⭐ |
| Keen | 15KB | MIT | 6k | 1 year | ⭐⭐⭐ |

### 6. Etapa 5: Aplicação (o código)
A IA escreve o código usando o conhecimento adquirido:
```tsx
'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function TestimonialsCarousel({ items }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000 })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((item, i) => (
          <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] p-4">
            {/* card content */}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 7. Etapa 6: Verificação & Aprendizado
Após implementar, a IA verifica:
1. Build sem erros? (`npm run build`)
2. Funciona no navegador? (`use client` server component? hydration?)
3. Performance aceitável? (bundle analyze)
4. Acessível? (keyboard nav, aria labels)

Se algo falhar → volta pra Etapa 1 com novo conhecimento.

### 8. Estratégias de Pesquisa por Tipo de Problema

**Preciso de uma biblioteca:**
```
1. Search: "best [tipo] library react 2026"
2. Top 3 resultados → Extrair prós/contras
3. Verificar npm: downloads, last publish, license
4. Verificar GitHub: stars, issues, maintenance
5. Ver bundle size (bundlejs.com)
6. Decidir e implementar
```

**Preciso de um efeito específico:**
```
1. Search: "how to [efeito] react/[tech] 2026"
2. Assistir/ler top 2 tutoriais
3. Extrair código do efeito
4. Adaptar para o projeto
5. Testar
```

**Preciso resolver um erro:**
```
1. Copiar mensagem de erro
2. Search: erro + tech stack
3. Ler top 3 resultados (Stack Overflow, GitHub Issues)
4. Identificar causa raiz + solução
5. Aplicar fix
```

**Preciso entender um conceito:**
```
1. Search: "[conceito] explained web development"
2. Ler docs oficiais primeiro
3. Assistir tutorial no YouTube
4. Extrair princípios
5. Aplicar no contexto do projeto
```

### 9. YouTube-First Learning (para cada ingrediente)
```javascript
async function learnFromYouTube(topic) {
  // 1. Search YouTube para o tópico
  const videos = await searchYouTube(topic);
  
  // 2. Filtrar: mais recentes, alta qualidade, transcript disponível  
  const candidates = videos.filter(v => 
    v.hasTranscript && v.duration < 30 * 60 && v.views > 10000
  );
  
  // 3. Extrair transcript dos top 3
  const transcripts = await Promise.all(
    candidates.slice(0, 3).map(v => getTranscript(v.id))
  );
  
  // 4. Sintetizar conhecimento
  const knowledge = synthesize(transcripts);
  
  // 5. Salvar como referência
  await saveToKnowledgeBase(topic, knowledge);
  
  return knowledge;
}
```

### 10. Knowledge Base (o que a IA já sabe)
Skills já criadas (12 skills = 12 áreas de conhecimento):
- **Layout & Estrutura**: skills 01, 03, 05
- **Cores**: skill 07
- **Tipografia**: skill 08
- **Animações**: skills 02, 09
- **3D**: skill 04
- **Design Systems**: skill 11
- **CSS Moderno**: skill 12
- **Responsividade**: skill 10
- **Workflow**: skills 06, 13
- **Arsenal**: skill 14

A IA CONSULTA essas skills ANTES de pesquisar — se já sabe, não precisa buscar.

### 11. Regras de Ouro da Pesquisa Autônoma
1. **Skills first**: antes de pesquisar, verificar skills existentes
2. **3 fontes mínimas**: nunca decidir com 1 fonte apenas
3. **Preferir official docs** sobre blog posts
4. **YouTube para tutoriais visuais**, texto para referência
5. **Bundle size SEMPRE**: não adicionar lib sem verificar tamanho
6. **License check**: MIT/Apache > GPL > Proprietário
7. **Data de atualização**: lib sem update > 1 ano = risco
8. **Baixar é diferente de importar**: shadcn/ui é copiado, não instalado

### 12. Comandos de Pesquisa para o Chat
```
/pesquisar [tema]     → pesquisa completa multi-fonte
/buscar [biblioteca]  → analisa lib (stars, bundle, license)
/tutorial [tema]      → encontra e extrai YouTube
/docs [lib]           → busca documentação oficial
/decidir [opções]     → matriz de decisão entre alternativas
/skill [nome]         → consulta skill existente
/aprender [tema]      → ciclo completo de aprendizado
```

# Skill: Typography Mastery for Premium Web Design

**Fonte:** BONT (YouTube), Kevin Powell, Tonic, StudioLimb

## 15 Regras de Tipografia que Elevam o Design

### 1. Line-height: Quanto maior o parágrafo, maior o line-height
- Parágrafos curtos (< 3 linhas): line-height 1.3-1.4
- Parágrafos médios: line-height 1.5-1.6
- Parágrafos longos (blog): line-height 1.6-1.8
- Texto corrido: 1.5-1.8x o font-size

### 2. Largura de linha ideal
- 30-50 palavras por linha (texto corrido)
- 50-75 caracteres por linha (incluindo espaços)
- Em px: 600-750px para desktop
- Use `max-width: 65ch` para parágrafos

### 3. Escala Tipográfica (Type Scale)
Use uma escala modular consistente:
```
Escala 1.25 (Major Third) — ideal para web:
H1: 3.052rem (48.83px)
H2: 2.441rem (39.06px)
H3: 1.953rem (31.25px)
H4: 1.563rem (25.00px)
H5: 1.25rem  (20.00px)
H6: 1rem     (16.00px)
Body: 1rem
Small: 0.8rem
```

### 4. Font-size Responsivo com clamp()
```css
h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); }
h2 { font-size: clamp(2rem, 3.5vw, 3rem); }
h3 { font-size: clamp(1.5rem, 2.5vw, 2rem); }
p  { font-size: clamp(1rem, 1.2vw, 1.125rem); }
```

### 5. Font Pairings Premium 2026
```
Heading (display)    Body (texto corrido)
─────────────────────────────────────────────
Space Grotesk        Sora
Syne                 Inter
Cabinet Grotesk      Satoshi
Instrument Sans      Roboto Flex
Playfair Display     Source Sans
Archivo             Plus Jakarta Sans
```

### 6. Variable Fonts: 1 arquivo = múltiplos pesos
- `font-weight: 100-900` com uma única fonte
- Eixos custom: `wdth` (largura), `slnt` (inclinação), `ital`
- Carregamento: 1 requisição vs 6-8 pesos individuais
- Ex: Inter Variable, Roboto Flex, Space Grotesk Variable

### 7. Letter-spacing por Tamanho
- Headlines grandes (H1, H2): -0.02em a -0.05em (condensado)
- Body text: 0em a 0.01em
- Small/caption: 0.02em a 0.05em
- ALL CAPS: 0.05em a 0.1em

### 8. Hierarquia Visual com Tipografia
1. **Tamanho**: H1 > H2 > H3 > body > small
2. **Peso**: Bold para headings, Regular/Light para body
3. **Cor**: Mais contraste para títulos, menos para body
4. **Espaçamento**: Mais espaço entorno = mais importância
5. **Transformação**: UPPERCASE transmite autoridade

### 9. Alinhamento e Leiturabilidade
- Texto justificado: CUIDADO — pode criar "rios" de espaço
- Texto alinhado à esquerda é o mais legível na web
- Centralizar: só para títulos e CTAs, NUNCA para parágrafos
- Mobile: padding lateral mínimo 16-24px
- Hyphens: `hyphens: auto` para texto justificado

### 10. OpenType Features que fazem diferença
```css
body {
  font-feature-settings: "liga" 1,   /* ligaduras */
                          "kern" 1,   /* kerning automático */
                          "tnum" 1,   /* tabular numbers (tabelas) */
                          "calt" 1;   /* alternate contextuais */
}
```
- Tabular numbers (`tnum`): números com mesma largura (preços, tabelas)
- Ligaduras (`liga`): combinações elegantes (fi, fl)
- Small caps (`smcp`): versaletes para acrônimos

### 11. CSS Font Units Avançadas
- `em`: relativo ao font-size do pai (bom para padding/margin em botões)
- `rem`: relativo ao root (consistente entre seções)
- `ch`: largura do caracter "0" (perfeito para max-width de texto)
- `lh`: relativo ao line-height do elemento
- `cap`: altura das letras maiúsculas

### 12. Perfect Centering Trick (Kevin Powell)
```css
h1 {
  display: flex;
  align-items: baseline; /* alinha pela baseline, não pelo centro */
  gap: 0.5ch;
}
```
Use `baseline` em vez de `center` para alinhar texto com badges, ícones ou superscript.

### 13. Cor e Contraste do Texto
- Body text: contraste MÍNIMO 4.5:1 (WCAG AA)
- Texto grande (>24px bold ou >19px regular): 3:1
- Evitar cinza claro sobre branco (clássico erro de acessibilidade)
- Título: `var(--text-heading)` — quase branco para destaque
- Body: `var(--text-body)` — tom médio para leitura confortável

### 14. Tipografia como Hero (Bold Typography Trend 2026)
- Headlines ocupam 50-70% da viewport height
- Font-size: `clamp(3rem, 8vw, 8rem)`
- Mix de pesos: palavra-chave em bold, resto em light
- Animação de kerning no scroll (letter-spacing expande)
- Sobreposto a 3D/background animado

### 15. Checklist de Tipografia Premium
- [ ] Escala modular definida (1.25 ou 1.333)
- [ ] Font pairings testados (heading + body)
- [ ] Variable font carregada (1 arquivo)
- [ ] `clamp()` para tamanhos responsivos
- [ ] Line-height ajustado por contexto
- [ ] Max-width: 65ch para parágrafos
- [ ] OpenType features ativadas (liga, kern, tnum)
- [ ] Letter-spacing por hierarquia
- [ ] Contraste WCAG AA (4.5:1)
- [ ] Hyphens: auto para justificado

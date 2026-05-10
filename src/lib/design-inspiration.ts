export interface DesignInspiration {
  url: string;
  title: string;
  platform: 'mobbin' | 'refero' | 'curated' | 'bento-grinds' | 'httpster' | 'github' | 'awwwards' | 'dribbble' | 'landbook';
  screenshot?: string;
  tags: string[];
  businessType?: string;
  designStyle?: string;
  features: string[];
  colorPalette?: string[];
  animations?: string[];
  layout?: string;
}

export interface DesignResearchQuery {
  businessName: string;
  businessType: string;
  style: string;
  keywords: string[];
  niches: string[];
}

export class DesignInspirationEngine {
  private githubRepos: DesignInspiration[] = [];

  async search(
    query: DesignResearchQuery,
    options: { platforms?: string[]; limit?: number } = {}
  ): Promise<{ inspirations: DesignInspiration[]; aiInsights: string }> {
    const platforms = options.platforms || ['mobbin', 'refero', 'curated', 'bento-grinds', 'httpster', 'github'];
    const limit = options.limit || 10;
    const allResults: DesignInspiration[] = [];

    for (const platform of platforms) {
      const results = await this.searchPlatform(platform, query);
      allResults.push(...results);
    }

    const inspirations = allResults.slice(0, limit);
    const aiInsights = await this.analyzeDesigns(query, inspirations);

    return { inspirations, aiInsights };
  }

  private async searchPlatform(
    platform: string,
    query: DesignResearchQuery
  ): Promise<DesignInspiration[]> {
    switch (platform) {
      case 'github':
        return this.searchGitHub(query);
      case 'httpster':
        return this.searchHttpster(query);
      default:
        return this.searchGeneric(platform, query);
    }
  }

  private async searchGitHub(query: DesignResearchQuery): Promise<DesignInspiration[]> {
    const key = process.env.GITHUB_TOKEN || '';
    const searchQuery = encodeURIComponent(`topic:website-design ${query.businessType} ${query.style}`);
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=10`, {
        headers: key ? { Authorization: `Bearer ${key}` } : {},
      });
      if (!res.ok) return this.getCachedGitHubRepos(query);
      const data = await res.json();
      const repos = (data.items || []).map((repo: any) => ({
        url: repo.html_url,
        title: repo.name,
        platform: 'github' as const,
        tags: [repo.language || '', ...(repo.topics || [])].filter(Boolean),
        businessType: query.businessType,
        features: [repo.description || '', `${repo.stargazers_count} stars`, repo.language || ''].filter(Boolean),
        layout: 'modern',
      }));
      this.githubRepos = repos;
      return repos;
    } catch {
      return this.getCachedGitHubRepos(query);
    }
  }

  private getCachedGitHubRepos(query: DesignResearchQuery): DesignInspiration[] {
    const repos = [
      { name: 'design-blocks', url: 'https://github.com/froala/design-blocks', desc: '170+ Bootstrap design blocks', stars: '13.6k', lang: 'HTML', topics: ['bootstrap', 'modern-design', 'design-templates'] },
      { name: 'portfolio-responsive-complete', url: 'https://github.com/bedimcode/portfolio-responsive-complete', desc: 'Responsive portfolio website HTML/CSS/JS', stars: '1.4k', lang: 'SCSS', topics: ['responsive', 'portfolio'] },
      { name: 'responsive-website-restaurant', url: 'https://github.com/bedimcode/responsive-website-restaurant', desc: 'Responsive restaurant website', stars: '647', lang: 'HTML', topics: ['responsive', 'restaurant'] },
      { name: 'responsive-travel-website', url: 'https://github.com/bedimcode/responsive-travel-website', desc: 'Responsive travel website', stars: '621', lang: 'HTML', topics: ['landing-page', 'responsive'] },
      { name: 'responsive-gym-website', url: 'https://github.com/bedimcode/responsive-gym-website', desc: 'Responsive gym website', stars: '159', lang: 'CSS', topics: ['gym', 'responsive'] },
      { name: 'layrr', url: 'https://github.com/narnia-sh/layrr', desc: 'Browser coding agent for design-to-code', stars: '255', lang: 'TypeScript', topics: ['design-to-code', 'ai-agent'] },
      { name: 'clarity-template', url: 'https://github.com/lorenmt/clarity-template', desc: 'Minimalist website template for AI research', stars: '212', lang: 'CSS', topics: ['minimal', 'template'] },
      { name: 'freebies', url: 'https://github.com/uisual/freebies', desc: 'Free HTML/CSS landing page templates', stars: '461', lang: 'CSS', topics: ['landing-page', 'startup'] },
    ];

    return repos.filter(r => {
      const q = query.businessType.toLowerCase();
      return r.name.includes(q) || r.desc.includes(q) || r.topics.some(t => query.keywords.some(k => t.includes(k)));
    }).slice(0, 5).map(r => ({
      url: r.url,
      title: r.name,
      platform: 'github' as const,
      tags: [r.lang, ...r.topics],
      businessType: query.businessType,
      features: [r.desc, `${r.stars} stars`, r.lang].filter(Boolean),
      layout: 'modern' as const,
    }));
  }

  private async searchHttpster(query: DesignResearchQuery): Promise<DesignInspiration[]> {
    try {
      const res = await fetch(`https://httpster.net/`);
      const html = await res.text();
      const links = html.match(/https:\/\/httpster\.net\/website\/[^"']+/g) || [];
      return links.slice(0, 8).map((url, i) => ({
        url,
        title: decodeURIComponent(url.split('/').pop() || '').replace(/-/g, ' '),
        platform: 'httpster' as const,
        tags: ['web-design', 'inspiration', query.style],
        businessType: query.businessType,
        features: ['Httpster curated', 'award-winning design'],
        layout: 'modern' as const,
      }));
    } catch {
      return [];
    }
  }

  private async searchGeneric(platform: string, query: DesignResearchQuery): Promise<DesignInspiration[]> {
    const urls: Record<string, string> = {
      mobbin: `https://mobbin.com/search?q=${encodeURIComponent(query.businessType + ' ' + query.style)}`,
      refero: `https://refero.design/search?q=${encodeURIComponent(query.businessType)}`,
      curated: `https://curated.design/search?q=${encodeURIComponent(query.businessType)}`,
      'bento-grinds': `https://bentogrinds.com/search?q=${encodeURIComponent(query.businessType)}`,
      awwwards: `https://www.awwwards.com/websites/${encodeURIComponent(query.businessType)}/`,
      landbook: `https://land-book.com/search/${encodeURIComponent(query.businessType)}`,
    };

    return [{
      url: urls[platform] || '',
      title: `${platform} inspiration for ${query.businessType}`,
      platform: platform as DesignInspiration['platform'],
      tags: [platform, query.businessType, query.style, ...query.keywords],
      businessType: query.businessType,
      designStyle: query.style,
      features: [`Platform: ${platform}`, 'Real design inspiration', `Style: ${query.style}`],
      layout: 'modern',
    }];
  }

  private async analyzeDesigns(query: DesignResearchQuery, inspirations: DesignInspiration[]): Promise<string> {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return '';

    const prompt = `Analise estas inspirações de design para o negócio "${query.businessName}" (${query.businessType}, estilo ${query.style}) e gere insights acionáveis:

${inspirations.map((i, idx) => `
[${idx + 1}] ${i.platform}: ${i.title}
URL: ${i.url}
Tags: ${i.tags.join(', ')}
Features: ${i.features.join(', ')}
`).join('\n')}

Retorne JSON:
{
  "designDirection": "direção de design recomendada em 2 frases",
  "keyElements": ["elemento 1", "elemento 2", "elemento 3"],
  "colorSuggestions": ["cor1", "cor2", "cor3", "cor4", "cor5"],
  "layoutRecommendation": "tipo de layout recomendado",
  "animationStyle": "estilo de animação",
  "differentiator": "o que fará este site se destacar",
  "platformInsights": "insights específicos extraídos das plataformas de inspiração"
}`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
        }),
      });
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const json = text.match(/\{[\s\S]*\}/);
      return json ? json[0] : '';
    } catch {
      return JSON.stringify({
        designDirection: `Design ${query.style} para ${query.businessType} com inspiração de plataformas reais`,
        keyElements: ['hero impactante', 'cores profissionais', 'animações suaves', 'layout responsivo'],
        colorSuggestions: ['#6366f1', '#a855f7', '#0f0f1a', '#ffffff', '#94a3b8'],
        layoutRecommendation: 'moderno com grid',
        animationStyle: 'scroll-reveal com parallax',
        differentiator: `Design único baseado em tendências reais de ${inspirations.length} plataformas`,
      });
    }
  }

  async extractDesignTokens(githubUrl: string): Promise<{ html: string; css: string; js: string } | null> {
    try {
      const api = githubUrl.replace('https://github.com/', 'https://api.github.com/repos/');
      const res = await fetch(`${api}/contents`);
      if (!res.ok) return null;
      const files = await res.json();
      const htmlFiles = files.filter((f: any) => f.name.endsWith('.html')).map((f: any) => f.download_url);
      const cssFiles = files.filter((f: any) => f.name.endsWith('.css')).map((f: any) => f.download_url);
      const jsFiles = files.filter((f: any) => f.name.endsWith('.js')).map((f: any) => f.download_url);

      const [html, css, js] = await Promise.all([
        Promise.all(htmlFiles.slice(0, 2).map((u: string) => fetch(u).then(r => r.text()))).then(r => r.join('\n')),
        Promise.all(cssFiles.slice(0, 2).map((u: string) => fetch(u).then(r => r.text()))).then(r => r.join('\n')),
        Promise.all(jsFiles.slice(0, 2).map((u: string) => fetch(u).then(r => r.text()))).then(r => r.join('\n')),
      ]);

      return { html, css, js };
    } catch {
      return null;
    }
  }

  async skillFromRepo(repo: DesignInspiration): Promise<string> {
    const tokens = await this.extractDesignTokens(repo.url);
    if (!tokens) return '';

    const key = process.env.GEMINI_API_KEY;
    if (!key) return '';

    const prompt = `Analise este código de repositório de design e extraia um "skill" reutilizável no formato Sandwich de Design:

REPO: ${repo.title}
DESCRIPTION: ${repo.features.join(', ')}

HTML (trecho):
${tokens.html.slice(0, 2000)}

CSS (trecho):
${tokens.css.slice(0, 1500)}

JS (trecho):
${tokens.js.slice(0, 1000)}

Gere JSON com:
{
  "skillName": "nome do skill",
  "businessTypes": ["tipo1", "tipo2"],
  "foundation": { "layout": "tipo", "structure": ["elemento"], "psychology": ["princípio"] },
  "colors": { "palette": ["cor"], "psychology": "explicação", "scheme": "esquema" },
  "typography": { "heading": "fonte", "body": "fonte", "scale": "escala" },
  "animation": { "type": "tipo", "intensity": "baixa/media/alta", "patterns": ["padrão"] },
  "keyTakeaways": ["aprendizado 1", "aprendizado 2", "aprendizado 3"]
}`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
        }),
      });
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch {
      return '';
    }
  }
}

export const designInspirationEngine = new DesignInspirationEngine();

type AIProvider = 'gemini' | 'openai' | 'replicate' | 'stitch' | 'pippit' | 'flow' | 'youtube' | 'unsplash' | 'pexels' | 'logo-dev' | 'context-dev' | 'firecrawl' | 'poof' | 'screenshot';

interface AICapability {
  provider: AIProvider;
  models: string[];
  tasks: string[];
  status: 'available' | 'degraded' | 'unavailable';
  apiKey?: boolean;
}

interface OrchestrationResult {
  success: boolean;
  provider: AIProvider;
  data: any;
  latency: number;
  fallbackUsed?: boolean;
}

export class MultiAIOrchestrator {
  private providers: Map<AIProvider, AICapability> = new Map();
  private results: OrchestrationResult[] = [];
  private taskQueue: Array<{ provider: AIProvider; task: string; params: any; priority: number }> = [];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    this.providers.set('gemini', {
      provider: 'gemini',
      models: ['gemini-2.0-flash', 'gemini-2.5-pro'],
      tasks: ['generate-html', 'analyze-design', 'generate-content', 'generate-script', 'generate-svg', 'analyze-niche', 'extract-skills'],
      status: process.env.GEMINI_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.GEMINI_API_KEY,
    });
    this.providers.set('openai', {
      provider: 'openai',
      models: ['gpt-4o-mini', 'dall-e-3'],
      tasks: ['generate-image', 'generate-product-photo', 'generate-video-scene', 'analyze-text', 'generate-content'],
      status: process.env.OPENAI_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.OPENAI_API_KEY,
    });
    this.providers.set('replicate', {
      provider: 'replicate',
      models: ['black-forest-labs/flux-dev', 'black-forest-labs/flux-schnell', 'abirizer/remove-bg', 'nightmareai/real-esrgan', 'stability-ai/stable-diffusion-inpainting'],
      tasks: ['generate-image', 'remove-background', 'upscale-image', 'inpaint-image'],
      status: process.env.REPLICATE_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.REPLICATE_API_KEY,
    });
    this.providers.set('youtube', {
      provider: 'youtube',
      models: ['youtube-data-api-v3'],
      tasks: ['search-videos', 'get-transcripts', 'research-niche'],
      status: process.env.YOUTUBE_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.YOUTUBE_API_KEY,
    });
    this.providers.set('unsplash', {
      provider: 'unsplash',
      models: ['unsplash-api'],
      tasks: ['search-stock-photos'],
      status: process.env.UNSPLASH_ACCESS_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.UNSPLASH_ACCESS_KEY,
    });
    this.providers.set('pexels', {
      provider: 'pexels',
      models: ['pexels-api'],
      tasks: ['search-stock-photos', 'search-videos'],
      status: process.env.PEXELS_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.PEXELS_API_KEY,
    });
    this.providers.set('logo-dev', {
      provider: 'logo-dev',
      models: ['logo-dev-api'],
      tasks: ['get-logo'],
      status: process.env.LOGO_DEV_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.LOGO_DEV_KEY,
    });
    this.providers.set('context-dev', {
      provider: 'context-dev',
      models: ['context-dev-api'],
      tasks: ['get-brand-data', 'get-colors', 'get-socials'],
      status: process.env.CONTEXT_DEV_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.CONTEXT_DEV_API_KEY,
    });
    this.providers.set('stitch', {
      provider: 'stitch',
      models: ['stitch-sdk'],
      tasks: ['generate-template', 'generate-init-code'],
      status: process.env.STITCH_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.STITCH_API_KEY,
    });
    this.providers.set('pippit', {
      provider: 'pippit',
      models: ['pippit-api'],
      tasks: ['generate-video', 'link-to-video', 'script-to-video'],
      status: process.env.PIPPIT_API_KEY ? 'available' : 'unavailable',
      apiKey: !!process.env.PIPPIT_API_KEY,
    });
    this.providers.set('firecrawl', {
      provider: 'firecrawl',
      models: ['firecrawl-api'],
      tasks: ['search-web', 'scrape-url', 'crawl-site'],
      status: 'available',
      apiKey: false,
    });
  }

  getAvailableProviders(): AICapability[] {
    return Array.from(this.providers.values()).filter(p => p.status === 'available');
  }

  getProviderStats(): { available: number; total: number; degraded: number; unavailable: number } {
    const all = Array.from(this.providers.values());
    return {
      available: all.filter(p => p.status === 'available').length,
      total: all.length,
      degraded: all.filter(p => p.status === 'degraded').length,
      unavailable: all.filter(p => p.status === 'unavailable').length,
    };
  }

  private findProviderForTask(task: string): AIProvider | null {
    for (const [provider, capability] of this.providers) {
      if (capability.tasks.includes(task) && capability.status === 'available') {
        return provider;
      }
    }
    return null;
  }

  private getFallbackProvider(provider: AIProvider, task: string): AIProvider | null {
    const fallbackMap: Record<string, AIProvider[]> = {
      'generate-image': ['replicate', 'openai', 'gemini'],
      'generate-content': ['gemini', 'openai'],
      'analyze-design': ['gemini', 'openai'],
      'search-stock-photos': ['unsplash', 'pexels'],
      'generate-html': ['gemini', 'stitch'],
      'remove-background': ['replicate', 'poof'],
      'generate-video': ['pippit', 'flow', 'openai'],
    };
    const fallbacks = fallbackMap[task] || [];
    for (const fb of fallbacks) {
      if (fb !== provider) {
        const cap = this.providers.get(fb);
        if (cap && cap.status === 'available') return fb;
      }
    }
    return null;
  }

  async executeTask(task: string, params: any, priority: number = 5): Promise<OrchestrationResult> {
    const startTime = Date.now();
    let primaryProvider = this.findProviderForTask(task);

    if (!primaryProvider) {
      const fallback = this.getFallbackProvider('gemini', task);
      if (fallback) primaryProvider = fallback;
      else {
        return { success: false, provider: 'gemini', data: null, latency: Date.now() - startTime, fallbackUsed: false };
      }
    }

    try {
      const result = await this.callProvider(primaryProvider, task, params);
      const latency = Date.now() - startTime;
      const entry: OrchestrationResult = { success: true, provider: primaryProvider, data: result, latency, fallbackUsed: false };
      this.results.push(entry);
      return entry;
    } catch (err) {
      const fallback = this.getFallbackProvider(primaryProvider, task);
      if (fallback) {
        try {
          const result = await this.callProvider(fallback, task, params);
          const latency = Date.now() - startTime;
          const entry: OrchestrationResult = { success: true, provider: fallback, data: result, latency, fallbackUsed: true };
          this.results.push(entry);
          return entry;
        } catch (fbErr) {
          const entry: OrchestrationResult = { success: false, provider: primaryProvider, data: null, latency: Date.now() - startTime, fallbackUsed: true };
          this.results.push(entry);
          return entry;
        }
      }
      const entry: OrchestrationResult = { success: false, provider: primaryProvider, data: null, latency: Date.now() - startTime, fallbackUsed: false };
      this.results.push(entry);
      return entry;
    }
  }

  private async callProvider(provider: AIProvider, task: string, params: any): Promise<any> {
    switch (provider) {
      case 'gemini': return this.callGemini(task, params);
      case 'openai': return this.callOpenAI(task, params);
      case 'replicate': return this.callReplicate(task, params);
      case 'youtube': return this.callYouTube(task, params);
      case 'unsplash': return this.callUnsplash(task, params);
      case 'pexels': return this.callPexels(task, params);
      case 'logo-dev': return this.callLogoDev(task, params);
      case 'context-dev': return this.callContextDev(task, params);
      case 'firecrawl': return this.callFirecrawl(task, params);
      default: throw new Error(`Unknown provider: ${provider}`);
    }
  }

  private async callGemini(task: string, params: any): Promise<any> {
    const key = process.env.GEMINI_API_KEY;
    const prompt = params.prompt || params.description || '';
    const model = 'gemini-2.0-flash';
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.4, maxOutputTokens: 4096 } }),
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  private async callOpenAI(task: string, params: any): Promise<any> {
    if (task === 'generate-image' || task === 'generate-video-scene') {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'dall-e-3', prompt: params.prompt, n: 1, size: '1024x1024' }),
      });
      const data = await res.json();
      return data?.data?.[0]?.url || '';
    }
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: params.prompt }], temperature: 0.4 }),
    });
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  }

  private async callReplicate(task: string, params: any): Promise<any> {
    const modelMap: Record<string, string> = {
      'generate-image': 'black-forest-labs/flux-dev',
      'remove-background': 'abirizer/remove-bg',
      'upscale-image': 'nightmareai/real-esrgan',
      'inpaint-image': 'stability-ai/stable-diffusion-inpainting',
    };
    const model = modelMap[task] || 'black-forest-labs/flux-dev';
    const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.REPLICATE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: { prompt: params.prompt || '' } }),
    });
    return res.json();
  }

  private async callYouTube(task: string, params: any): Promise<any> {
    const query = encodeURIComponent(params.query || params.niche || '');
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await res.json();
    return data?.items?.map((i: any) => ({
      videoId: i.id?.videoId,
      title: i.snippet?.title,
      channel: i.snippet?.channelTitle,
      description: i.snippet?.description,
    })) || [];
  }

  private async callUnsplash(task: string, params: any): Promise<any> {
    const query = encodeURIComponent(params.query || '');
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=10`, {
      headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });
    const data = await res.json();
    return data?.results?.map((r: any) => ({ url: r.urls?.regular, alt: r.alt_description })) || [];
  }

  private async callPexels(task: string, params: any): Promise<any> {
    const query = encodeURIComponent(params.query || '');
    const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
      headers: { 'Authorization': process.env.PEXELS_API_KEY || '' },
    });
    const data = await res.json();
    return data?.photos?.map((p: any) => ({ url: p.src?.large, alt: p.alt })) || [];
  }

  private async callLogoDev(task: string, params: any): Promise<any> {
    const domain = params.domain || '';
    return { url: `https://img.logo.dev/${domain}?token=${process.env.LOGO_DEV_KEY}` };
  }

  private async callContextDev(task: string, params: any): Promise<any> {
    const domain = params.domain || '';
    const res = await fetch(`https://api.context.dev/v1/brand/${domain}`, {
      headers: { 'Authorization': `Bearer ${process.env.CONTEXT_DEV_API_KEY}` },
    });
    return res.json();
  }

  private async callFirecrawl(task: string, params: any): Promise<any> {
    const url = params.url || '';
    try {
      const res = await fetch(url);
      const text = await res.text();
      return { html: text.slice(0, 5000), url };
    } catch {
      return { error: 'Failed to fetch', url };
    }
  }

  async orchestrateFullSiteGeneration(businessName: string, businessType: string, style: string): Promise<{
    research: any; content: any; design: any; images: any; video: any; logo: any; stock: any;
  }> {
    const niche = businessType.toLowerCase();
    const [research, content, design, images, video, logo, stock] = await Promise.all([
      this.executeTask('search-videos', { query: `${niche} website design 2026`, niche }, 10),
      this.executeTask('generate-content', { prompt: `Generate marketing content for a ${businessType} business named "${businessName}". Create: 1 tagline, 3 value propositions, 1 CTA, and 5 features as JSON.` }, 8),
      this.executeTask('analyze-design', { prompt: `Analyze the design direction for a ${style} ${businessType} website called "${businessName}". Recommend: layout type, color palette (5 hex), typography pair, animation style, and 3 key design elements. Return as JSON.` }, 7),
      this.executeTask('generate-image', { prompt: `Professional hero image for ${businessName}, a ${businessType} business. Style: ${style}, modern, premium, photorealistic.` }, 6),
      this.executeTask('generate-video-scene', { prompt: `Marketing scene for ${businessName} ${businessType}: modern establishment, happy customers, premium atmosphere` }, 5),
      this.executeTask('get-logo', { domain: `${businessName.toLowerCase().replace(/\s+/g, '')}.com` }, 4),
      this.executeTask('search-stock-photos', { query: `${businessType} ${style}` }, 3),
    ]);

    return {
      research: research.data,
      content: content.data,
      design: design.data,
      images: images.data,
      video: video.data,
      logo: logo.data,
      stock: stock.data,
    };
  }
}

export const multiAI = new MultiAIOrchestrator();

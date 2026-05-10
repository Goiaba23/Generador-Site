export interface WorkerSession {
  id: string;
  businessName: string;
  businessType: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  currentStep: number;
  steps: StepResult[];
  finalResult?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface StepResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface StepConfig {
  id: string;
  name: string;
  description: string;
  execute: (name: string, type: string, previousSteps: StepResult[]) => Promise<any>;
}

export class OpenCodeWorker {
  private sessions: Map<string, WorkerSession> = new Map();
  readonly PROGRAMMED_PATH: StepConfig[];

  constructor() {
    this.PROGRAMMED_PATH = [
      {
        id: 'research',
        name: 'Pesquisa de Mercado',
        description: 'Analisa tendências e concorrência do nicho',
        execute: async (name, type) => {
          const key = process.env.GEMINI_API_KEY;
          if (!key) return { trends: [], insights: 'Pesquisa indisponível' };

          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: `Faça uma pesquisa de mercado rápida para "${name}" (${type}). Retorne JSON: { "trends": ["tendência 1", "tendência 2", "tendência 3"], "keywords": ["palavra1", "palavra2"], "targeting": "público alvo em 1 frase" }` }] }],
                generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
              }),
            }
          );
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
          const json = text.match(/\{[\s\S]*\}/);
          return json ? JSON.parse(json[0]) : { trends: [], keywords: [], targeting: '' };
        },
      },
      {
        id: 'content',
        name: 'Criação de Conteúdo',
        description: 'Gera textos, slogans e calls-to-action',
        execute: async (name, type, steps) => {
          const research = steps.find(s => s.id === 'research')?.result;
          const key = process.env.GEMINI_API_KEY;
          if (!key) return { slogan: '', description: '' };

          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: `Crie conteúdo marketing para "${name}" (${type}). Contexto: ${JSON.stringify(research)}. Retorne JSON: { "slogan": "slogan curto e impactante", "description": "descrição do negócio em 2 frases", "cta": "call to action principal", "pain_points": ["dor 1", "dor 2"], "solutions": ["solução 1", "solução 2"] }` }] }],
                generationConfig: { temperature: 0.4, maxOutputTokens: 512 },
              }),
            }
          );
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
          const json = text.match(/\{[\s\S]*\}/);
          return json ? JSON.parse(json[0]) : { slogan: '', description: '', cta: '' };
        },
      },
      {
        id: 'images',
        name: 'Geração de Imagens',
        description: 'Cria imagens profissionais com DALL-E',
        execute: async (name, type) => {
          const key = process.env.OPENAI_API_KEY;
          if (!key) return { heroImage: null };

          try {
            const res = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: 'dall-e-3',
                prompt: `Professional website hero image for ${type} business called ${name}, modern design, vibrant colors, professional photography style, 16:9`,
                n: 1,
                size: '1792x1024',
              }),
            });
            const data = await res.json();
            return { heroImage: data?.data?.[0]?.url || null };
          } catch {
            return { heroImage: null };
          }
        },
      },
      {
        id: 'video',
        name: 'Geração de Vídeo',
        description: 'Monta cenas de vídeo marketing',
        execute: async (name, type) => {
          const { videoGenerator } = await import('./video-generator');
          const result = await videoGenerator.generateVideo(name, type, 'modern');
          return result;
        },
      },
      {
        id: 'finalize',
        name: 'Finalização',
        description: 'Compila todos os resultados e prepara o deploy',
        execute: async (name, type, steps) => {
          const research = steps.find(s => s.id === 'research')?.result;
          const content = steps.find(s => s.id === 'content')?.result;
          const images = steps.find(s => s.id === 'images')?.result;
          const video = steps.find(s => s.id === 'video')?.result;

          return {
            businessName: name,
            businessType: type,
            summary: {
              slogan: content?.slogan || '',
              description: content?.description || '',
              cta: content?.cta || '',
              targeting: research?.targeting || '',
            },
            assets: {
              heroImage: images?.heroImage || null,
              videoScenes: video?.scenes || [],
            },
            ready: true,
          };
        },
      },
    ];
  }

  async startWorkerSession(name: string, type: string): Promise<string> {
    const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const session: WorkerSession = {
      id,
      businessName: name,
      businessType: type,
      status: 'pending',
      currentStep: 0,
      steps: this.PROGRAMMED_PATH.map(step => ({
        id: step.id,
        name: step.name,
        status: 'pending' as const,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.sessions.set(id, session);
    return id;
  }

  getSession(sessionId: string): WorkerSession | undefined {
    return this.sessions.get(sessionId);
  }

  getAllSessions(): WorkerSession[] {
    return Array.from(this.sessions.values());
  }

  getProgress(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return { current: 0, total: 0, percentage: 0, status: 'not_found' as const };

    const total = session.steps.length;
    const completed = session.steps.filter(s => s.status === 'completed').length;
    const failed = session.steps.filter(s => s.status === 'failed').length;

    return {
      current: completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      status: session.status,
      completedSteps: completed,
      failedSteps: failed,
    };
  }

  async executeStep(sessionId: string, stepIndex: number): Promise<StepResult> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const config = this.PROGRAMMED_PATH[stepIndex];
    if (!config) throw new Error('Step not found');

    const step = session.steps[stepIndex];
    if (!step) throw new Error('Step not found');

    session.status = 'running';
    session.currentStep = stepIndex;
    step.status = 'running';
    step.startedAt = new Date();
    session.updatedAt = new Date();

    try {
      const result = await config.execute(session.businessName, session.businessType, session.steps);
      step.status = 'completed';
      step.result = result;
      step.completedAt = new Date();
    } catch (error: any) {
      step.status = 'failed';
      step.error = error.message;
      step.completedAt = new Date();
      session.status = 'failed';
    }

    session.updatedAt = new Date();

    const allDone = session.steps.every(s => s.status === 'completed' || s.status === 'failed');
    if (allDone) {
      session.status = session.steps.some(s => s.status === 'failed') ? 'failed' : 'completed';
      session.finalResult = session.steps.find(s => s.id === 'finalize')?.result;
    }

    return step;
  }

  async startExecution(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    for (let i = 0; i < this.PROGRAMMED_PATH.length; i++) {
      if (session.status === 'failed') break;
      await this.executeStep(sessionId, i);
    }
  }
}

export const openCodeWorker = new OpenCodeWorker();

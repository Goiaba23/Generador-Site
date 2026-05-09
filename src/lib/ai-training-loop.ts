import * as fs from 'fs';
import * as path from 'path';

interface TrainingExample {
  timestamp: string;
  businessType: string;
  businessName: string;
  style: string;
  sections: string[];
  palette: string[];
  userFeedback?: {
    rating: number;
    comments: string;
    adjustments: string[];
  };
  success: boolean;
  metrics?: {
    buildTime: number;
    bundleSize?: number;
    seoScore?: number;
  };
}

interface KnowledgeEntry {
  pattern: string;
  niche: string;
  successRate: number;
  uses: number;
  lastUsed: string;
  tags: string[];
}

const TRAINING_FILE = path.join(process.cwd(), '.ai-training', 'examples.json');
const KNOWLEDGE_FILE = path.join(process.cwd(), '.ai-training', 'knowledge.json');

function ensureDir() {
  const dir = path.dirname(TRAINING_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadExamples(): TrainingExample[] {
  ensureDir();
  try {
    return JSON.parse(fs.readFileSync(TRAINING_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveExamples(examples: TrainingExample[]) {
  ensureDir();
  fs.writeFileSync(TRAINING_FILE, JSON.stringify(examples, null, 2));
}

function loadKnowledge(): KnowledgeEntry[] {
  ensureDir();
  try {
    return JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveKnowledge(entries: KnowledgeEntry[]) {
  ensureDir();
  fs.writeFileSync(KNOWLEDGE_FILE, JSON.stringify(entries, null, 2));
}

export const trainingLoop = {
  recordGeneration(example: Omit<TrainingExample, 'timestamp'>) {
    const examples = loadExamples();
    const full: TrainingExample = {
      ...example,
      timestamp: new Date().toISOString(),
    };
    examples.push(full);
    saveExamples(examples);
    this.updateKnowledge(full);
  },

  recordFeedback(
    businessName: string,
    feedback: TrainingExample['userFeedback']
  ) {
    const examples = loadExamples();
    const idx = examples.findIndex(
      e => e.businessName === businessName
    );
    if (idx >= 0) {
      examples[idx].userFeedback = feedback;
      examples[idx].success = (feedback?.rating || 0) >= 4;
      saveExamples(examples);
      this.updateKnowledge(examples[idx]);
    }
  },

  updateKnowledge(example: TrainingExample) {
    const knowledge = loadKnowledge();
    const patterns = [
      { pattern: `palette_${example.businessType}`, niche: example.businessType, tags: ['color', example.businessType] },
      { pattern: `style_${example.style}`, niche: example.businessType, tags: ['style', example.style] },
      ...(example.sections || []).map(s => ({
        pattern: `section_${s.toLowerCase().replace(/\s+/g, '_')}`,
        niche: example.businessType,
        tags: ['section', example.businessType],
      })),
    ];

    for (const entry of patterns) {
      const existing = knowledge.find(k => k.pattern === entry.pattern);
      if (existing) {
        existing.uses += 1;
        existing.lastUsed = new Date().toISOString();
        if (example.userFeedback) {
          const oldWeight = existing.successRate * (existing.uses - 1) / existing.uses;
          existing.successRate = oldWeight + (example.userFeedback.rating / 5) / existing.uses;
        }
      } else {
        knowledge.push({
          ...entry,
          successRate: example.userFeedback ? (example.userFeedback.rating || 3) / 5 : 0.5,
          uses: 1,
          lastUsed: new Date().toISOString(),
        });
      }
    }

    saveKnowledge(knowledge);
  },

  getBestPatternsForNiche(niche: string): string[] {
    const knowledge = loadKnowledge();
    return knowledge
      .filter(k => k.niche === niche && k.successRate > 0.6)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5)
      .map(k => k.pattern);
  },

  getTrainingStats() {
    const examples = loadExamples();
    const knowledge = loadKnowledge();
    const successful = examples.filter(e => e.success);
    return {
      totalGenerations: examples.length,
      successfulGenerations: successful.length,
      successRate: examples.length > 0 ? (successful.length / examples.length * 100).toFixed(1) + '%' : '0%',
      totalPatterns: knowledge.length,
      nichesCovered: [...new Set(examples.map(e => e.businessType))].length,
      topPatterns: knowledge.sort((a, b) => b.uses - a.uses).slice(0, 10),
      recentGenerations: examples.slice(-5).reverse(),
    };
  },

  getLearningSuggestions(): string[] {
    const knowledge = loadKnowledge();
    const lowPerforming = knowledge
      .filter(k => k.successRate < 0.4 && k.uses > 1)
      .map(k => `Padrão "${k.pattern}" (${k.niche}) tem apenas ${Math.round(k.successRate * 100)}% de sucesso — reconsiderar`);
    const unexploredNiches = this.getTrainingStats().nichesCovered < 5
      ? ['Poucos nichos explorados — testar mais variações']
      : [];
    return [...lowPerforming, ...unexploredNiches];
  },
};

export function generateTrainingReport(): string {
  const stats = trainingLoop.getTrainingStats();
  const suggestions = trainingLoop.getLearningSuggestions();

  const lines = [
    '## 📊 Relatório de Treinamento da IA',
    '',
    `**Gerações:** ${stats.totalGenerations}`,
    `**Sucesso:** ${stats.successfulGenerations} (${stats.successRate})`,
    `**Padrões aprendidos:** ${stats.totalPatterns}`,
    `**Nichos explorados:** ${stats.nichesCovered}`,
    '',
    '### 🏆 Top 10 Padrões Mais Usados',
    ...stats.topPatterns.map((p, i) => `  ${i + 1}. ${p.pattern} (${p.uses}x, ${Math.round(p.successRate * 100)}% sucesso)`),
    '',
    suggestions.length > 0 ? '### 💡 Sugestões de Melhoria' : '',
    ...suggestions.map(s => `  • ${s}`),
    '',
    '### 🕐 Últimas 5 Gerações',
    ...stats.recentGenerations.map(g =>
      `  • ${g.businessName} (${g.businessType}) — ${g.success ? '✓' : '✗'} — ${new Date(g.timestamp).toLocaleString()}`
    ),
  ];

  return lines.filter(Boolean).join('\n');
}

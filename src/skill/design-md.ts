import { designSystem } from '@/lib/design-system-generator';

interface DesignOutput {
  type: 'component' | 'page' | 'style' | 'preview' | 'tokens';
  data: any;
  format: 'css' | 'html' | 'json' | 'tailwind';
}

export const DESIGN_MD_SKILL = {
  name: 'design-md',
  description: 'DESIGN.md — Google open format for AI-native design systems. Generates consistent UI from design tokens.',
  version: '1.0',
  source: 'https://github.com/google-labs-code/design.md',
  sourceDescription: 'DESIGN.md format specification by Google Stitch for describing visual identity to coding agents',
  credit: 'DesignCode (https://youtube.com/@DesignCode)',
  creditDescription: 'Video: "I made a tool that generated 400+ DESIGN.md that are insanely good at creating landing pages"',
};

export class DesignMDSkill {
  generateComponent(componentName: string): DesignOutput {
    const styles = designSystem.generateComponentStyle(componentName);
    return {
      type: 'component',
      data: { componentName, styles },
      format: 'css',
    };
  }

  generateLandingPageHTML(businessName: string, businessType: string, style: string = 'modern'): DesignOutput {
    const content = `
      <section style="text-align:center;padding:80px 0">
        <h1 style="font-size:48px;font-weight:700;letter-spacing:-0.03em;margin-bottom:16px">${businessName}</h1>
        <p style="font-size:18px;color:#64748b;max-width:600px;margin:0 auto 32px">Premium ${businessType} services powered by AI</p>
        <a href="#" class="btn btn-primary">Comecar Agora</a>
        <a href="#" class="btn btn-secondary" style="margin-left:12px">Saiba Mais</a>
      </section>
      <section style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:64px 0">
        ${['Design Inteligente', 'Conteudo Automatico', 'Otimizacao SEO'].map(title => `
          <div class="card" style="text-align:center">
            <div style="width:48px;height:48px;background:#e0e7ff;border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:24px">✦</div>
            <h3 style="font-size:18px;font-weight:600;margin-bottom:8px">${title}</h3>
            <p style="color:#64748b;font-size:14px">Criado com DESIGN.md para consistencia visual perfeita.</p>
          </div>
        `).join('')}
      </section>
    `;

    return {
      type: 'page',
      data: designSystem.generateHTMLPreview(`${businessName} — ${businessType}`, content),
      format: 'html',
    };
  }

  generateSkillFile(niche: string, insights: string[]): string {
    const skillName = niche.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tokens = designSystem.generateTailwindConfig();

    return `// DESIGN.md — Gerado automaticamente via ${DESIGN_MD_SKILL.source}
// Skill: ${niche}
// Baseado em: ${DESIGN_MD_SKILL.credit}

export const ${skillName.replace(/-/g, '_')}_SKILL = {
  name: '${skillName}',
  niche: '${niche}',
  designTokens: ${tokens},
  insights: ${JSON.stringify(insights, null, 2)},
  createdAt: new Date().toISOString(),
};
`;
  }

  generateComponentLibrary(): string[] {
    return Object.keys(designSystem.generateComponentStyle('chat-message-user')).length > 0
      ? ['chat-message-user', 'chat-message-ai', 'chat-input', 'button-primary', 'button-secondary', 'card-capability', 'card-tool-result', 'badge']
      : [];
  }
}

export const designMd = new DesignMDSkill();

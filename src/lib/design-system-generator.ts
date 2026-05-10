import { readFileSync } from 'fs';
import { join } from 'path';

interface DesignTokens {
  colors: Record<string, string>;
  typography: Record<string, any>;
  layout: Record<string, any>;
  elevation: Record<string, string>;
  shapes: Record<string, string>;
  components: Record<string, Record<string, string>>;
}

export class DesignSystemGenerator {
  private tokens: DesignTokens;

  constructor() {
    this.tokens = this.loadDesignTokens();
  }

  private loadDesignTokens(): DesignTokens {
    try {
      const mdPath = join(process.cwd(), 'DESIGN.md');
      const content = readFileSync(mdPath, 'utf-8');
      const frontMatter = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontMatter) throw new Error('No front matter found');
      return this.parseYamlFrontMatter(frontMatter[1]);
    } catch {
      return this.getDefaultTokens();
    }
  }

  private parseYamlFrontMatter(yaml: string): DesignTokens {
    const tokens: DesignTokens = {
      colors: {},
      typography: {},
      layout: {},
      elevation: {},
      shapes: {},
      components: {},
    };

    const lines = yaml.split('\n');
    let currentSection = '';
    let subSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) continue;

      const sectionMatch = trimmed.match(/^(\w[\w-]*):$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        subSection = '';
        continue;
      }

      const subSectionMatch = trimmed.match(/^  (\w[\w-]*):$/);
      if (subSectionMatch && currentSection) {
        subSection = subSectionMatch[1];
        if (!tokens[currentSection as keyof DesignTokens]) {
          (tokens as any)[currentSection] = {};
        }
        if (typeof (tokens as any)[currentSection] === 'object' && !Array.isArray((tokens as any)[currentSection])) {
          (tokens as any)[currentSection][subSection] = {};
        }
        continue;
      }

      const kvMatch = trimmed.match(/^    (\w[\w-]*):\s*"?(.+?)"?$/);
      if (kvMatch && currentSection && subSection) {
        const key = kvMatch[1];
        const value = kvMatch[2].replace(/^"(.*)"$/, '$1');
        if ((tokens as any)[currentSection]?.[subSection]) {
          (tokens as any)[currentSection][subSection][key] = value;
        }
      } else {
        const directKv = trimmed.match(/^  (\w[\w-]*):\s*"?(.+?)"?$/);
        if (directKv && currentSection && !subSection) {
          const key = directKv[1];
          const value = directKv[2].replace(/^"(.*)"$/, '$1');
          (tokens as any)[currentSection][key] = value;
        }
      }
    }

    return tokens;
  }

  private getDefaultTokens(): DesignTokens {
    return {
      colors: {
        primary: '#6366f1',
        'on-primary': '#ffffff',
        surface: '#ffffff',
        'on-surface': '#0f172a',
        'surface-dim': '#f8fafc',
        outline: '#cbd5e1',
        'outline-variant': '#e2e8f0',
      },
      typography: {
        display: { fontFamily: 'Inter', fontSize: '48px', fontWeight: '700' },
        body: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '400' },
        code: { fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: '400' },
      },
      layout: { 'spacing-unit': '4px', 'max-width': '1200px', 'border-radius': '12px' },
      elevation: { 'level-0': 'none', 'level-1': '0 1px 2px rgba(0,0,0,0.06)' },
      shapes: { card: '12px', button: '8px', input: '8px' },
      components: {
        'chat-message-user': { backgroundColor: '#6366f1', textColor: '#ffffff', rounded: '12px' },
        'chat-message-ai': { backgroundColor: '#f1f5f9', textColor: '#0f172a', rounded: '12px' },
      },
    };
  }

  private resolveReference(value: string): string {
    const match = value.match(/^\{([^}]+)\}$/);
    if (!match) return value;
    const path = match[1].split('.');
    let obj: any = this.tokens;
    for (const key of path) {
      obj = obj?.[key];
      if (!obj) return value;
    }
    return String(obj);
  }

  generateComponentStyle(componentName: string): Record<string, string> {
    const component = this.tokens.components[componentName];
    if (!component) return {};

    const styles: Record<string, string> = {};
    for (const [key, value] of Object.entries(component)) {
      const resolved = this.resolveReference(value);
      styles[this.cssProperty(key)] = resolved;
    }
    return styles;
  }

  private cssProperty(key: string): string {
    const map: Record<string, string> = {
      backgroundColor: 'background-color',
      textColor: 'color',
      borderColor: 'border-color',
      rounded: 'border-radius',
      fontSize: 'font-size',
      fontWeight: 'font-weight',
      padding: 'padding',
      maxWidth: 'max-width',
      shadow: 'box-shadow',
      height: 'height',
    };
    return map[key] || key;
  }

  generateCSS(): string {
    const sections: string[] = [];
    sections.push(`/* NexusAI Design System */`);
    sections.push(`/* Generated from DESIGN.md */\n`);

    sections.push(`/* Colors */`);
    sections.push(`:root {`);
    for (const [key, value] of Object.entries(this.tokens.colors)) {
      sections.push(`  --color-${key.replace(/_/g, '-')}: ${value};`);
    }
    sections.push(`}\n`);

    sections.push(`/* Component Styles */`);
    for (const [name, props] of Object.entries(this.tokens.components)) {
      sections.push(`.${name.replace(/_/g, '-')} {`);
      for (const [key, value] of Object.entries(props)) {
        const resolved = this.resolveReference(value);
        if (!resolved.startsWith('{')) {
          sections.push(`  ${this.cssProperty(key)}: ${resolved};`);
        }
      }
      sections.push(`}\n`);
    }

    return sections.join('\n');
  }

  generateTailwindConfig(): string {
    const colors: Record<string, string> = {};
    for (const [key, value] of Object.entries(this.tokens.colors)) {
      colors[key.replace(/-/g, '')] = value;
    }

    return JSON.stringify({
      theme: {
        extend: {
          colors,
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
          },
          borderRadius: this.tokens.shapes,
          boxShadow: Object.fromEntries(
            Object.entries(this.tokens.elevation).map(([k, v]) => [k.replace('level-', ''), v])
          ),
        },
      },
    }, null, 2);
  }

  generateHTMLPreview(title: string, content: string): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, sans-serif; background: #0f172a; color: #f8fafc; }
    .container { max-width: 1200px; margin: 0 auto; padding: 64px 16px; }
    .card { background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(15,23,42,0.1); }
    .btn { display: inline-block; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; text-decoration: none; }
    .btn-primary { background: #6366f1; color: #ffffff; }
    .btn-secondary { background: #e2e8f0; color: #0f172a; }
    .chat-bubble-user { background: #6366f1; color: #ffffff; border-radius: 12px; padding: 12px 16px; max-width: 80%; margin-left: auto; }
    .chat-bubble-ai { background: #f1f5f9; color: #0f172a; border-radius: 12px; padding: 12px 16px; max-width: 80%; }
    .badge { display: inline-flex; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 500; background: #e0e7ff; color: #6366f1; }
    h1 { font-size: 32px; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
    h2 { font-size: 24px; font-weight: 600; line-height: 1.3; }
    p { font-size: 14px; line-height: 1.5; }
    ${this.generateCSS()}
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>`;
  }

  generateLandingPageSections(): string[] {
    return [
      'hero-section',
      'capabilities-grid',
      'feature-details',
      'tool-showcase',
      'pricing-tiers',
      'cta-section',
      'footer-links',
    ];
  }
}

export const designSystem = new DesignSystemGenerator();

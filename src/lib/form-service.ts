const FORMFORGE_BASE = 'https://formforge-api.vercel.app';

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'tel' | 'url';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormDefinition {
  title: string;
  theme?: 'modern' | 'minimal' | 'dark' | 'rounded';
  submitUrl?: string;
  fields: FormField[];
}

export interface FormResult {
  html: string;
  meta: { theme: string; fieldCount: number; formId: string };
}

const NICHE_FORM_SCHEMAS: Record<string, FormDefinition> = {
  RESTAURANT: {
    title: 'Faça sua Reserva',
    theme: 'modern',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true, placeholder: 'Seu nome' },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true, placeholder: '(11) 99999-9999' },
      { name: 'email', type: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
      { name: 'date', type: 'date', label: 'Data da Reserva', required: true },
      { name: 'guests', type: 'number', label: 'Número de Pessoas', required: true, placeholder: '2' },
      { name: 'message', type: 'textarea', label: 'Observações', placeholder: 'Alguma preferência?' },
    ],
  },
  BARBERSHOP: {
    title: 'Agende seu Horário',
    theme: 'dark',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true, placeholder: 'Seu nome' },
      { name: 'phone', type: 'tel', label: 'WhatsApp', required: true, placeholder: '(11) 99999-9999' },
      { name: 'service', type: 'select', label: 'Serviço', required: true, options: [
        { label: 'Corte', value: 'corte' },
        { label: 'Barba', value: 'barba' },
        { label: 'Corte + Barba', value: 'combo' },
        { label: 'Hidratação', value: 'hidratacao' },
      ]},
      { name: 'date', type: 'date', label: 'Data', required: true },
    ],
  },
  CLINIC: {
    title: 'Agende sua Consulta',
    theme: 'minimal',
    fields: [
      { name: 'name', type: 'text', label: 'Nome Completo', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'specialty', type: 'select', label: 'Especialidade', options: [
        { label: 'Clínico Geral', value: 'clinico' },
        { label: 'Pediatria', value: 'pediatria' },
        { label: 'Cardiologia', value: 'cardio' },
        { label: 'Dermatologia', value: 'dermato' },
      ]},
      { name: 'date', type: 'date', label: 'Data Preferida' },
      { name: 'message', type: 'textarea', label: 'Observações' },
    ],
  },
  GYM: {
    title: 'Experimente Grátis',
    theme: 'rounded',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'WhatsApp', required: true },
      { name: 'goal', type: 'select', label: 'Objetivo', options: [
        { label: 'Emagrecimento', value: 'loss' },
        { label: 'Ganho de Massa', value: 'mass' },
        { label: 'Condicionamento', value: 'conditioning' },
        { label: 'Saúde', value: 'health' },
      ]},
    ],
  },
  HOTEL: {
    title: 'Reserve seu Quarto',
    theme: 'modern',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'checkin', type: 'date', label: 'Check-in', required: true },
      { name: 'checkout', type: 'date', label: 'Check-out', required: true },
      { name: 'guests', type: 'number', label: 'Hóspedes', required: true, placeholder: '2' },
    ],
  },
  SALON: {
    title: 'Agende seu Horário',
    theme: 'rounded',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'phone', type: 'tel', label: 'WhatsApp', required: true },
      { name: 'service', type: 'select', label: 'Serviço', required: true, options: [
        { label: 'Corte', value: 'corte' },
        { label: 'Escova', value: 'escova' },
        { label: 'Coloração', value: 'coloracao' },
        { label: 'Unhas', value: 'unhas' },
        { label: 'Maquiagem', value: 'maquiagem' },
      ]},
      { name: 'date', type: 'date', label: 'Data' },
    ],
  },
  PET_SHOP: {
    title: 'Agende seu Pet',
    theme: 'rounded',
    fields: [
      { name: 'tutor', type: 'text', label: 'Seu Nome', required: true },
      { name: 'phone', type: 'tel', label: 'WhatsApp', required: true },
      { name: 'pet', type: 'text', label: 'Nome do Pet', required: true },
      { name: 'service', type: 'select', label: 'Serviço', required: true, options: [
        { label: 'Banho', value: 'banho' },
        { label: 'Tosa', value: 'tosa' },
        { label: 'Banho + Tosa', value: 'combo' },
        { label: 'Consulta', value: 'consulta' },
      ]},
      { name: 'date', type: 'date', label: 'Data' },
    ],
  },
  CONSULTING: {
    title: 'Solicite uma Proposta',
    theme: 'minimal',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'company', type: 'text', label: 'Empresa' },
      { name: 'phone', type: 'tel', label: 'Telefone' },
      { name: 'service', type: 'select', label: 'Serviço de Interesse', options: [
        { label: 'Consultoria Estratégica', value: 'strategy' },
        { label: 'Gestão de Projetos', value: 'projects' },
        { label: 'Marketing Digital', value: 'marketing' },
        { label: 'TI & Inovação', value: 'tech' },
      ]},
      { name: 'message', type: 'textarea', label: 'Como podemos ajudar?', required: true },
    ],
  },
  TECH: {
    title: 'Solicite uma Demonstração',
    theme: 'dark',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail Corporativo', required: true },
      { name: 'company', type: 'text', label: 'Empresa', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone' },
      { name: 'size', type: 'select', label: 'Porte da Empresa', options: [
        { label: '1-10 funcionários', value: 'startup' },
        { label: '11-50 funcionários', value: 'small' },
        { label: '51-200 funcionários', value: 'medium' },
        { label: '200+ funcionários', value: 'enterprise' },
      ]},
    ],
  },
  SPA: {
    title: 'Reserve seu Horário',
    theme: 'minimal',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'treatment', type: 'select', label: 'Tratamento', options: [
        { label: 'Massagem Relaxante', value: 'massage' },
        { label: 'Facial Premium', value: 'facial' },
        { label: 'Day Spa', value: 'dayspa' },
        { label: 'Banho de Ofurô', value: 'ofuro' },
      ]},
      { name: 'date', type: 'date', label: 'Data' },
      { name: 'message', type: 'textarea', label: 'Observações' },
    ],
  },
  REAL_ESTATE: {
    title: 'Receba Ofertas',
    theme: 'modern',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'type', type: 'select', label: 'Tipo de Imóvel', options: [
        { label: 'Apartamento', value: 'apt' },
        { label: 'Casa', value: 'house' },
        { label: 'Comercial', value: 'commercial' },
        { label: 'Terreno', value: 'land' },
      ]},
      { name: 'budget', type: 'select', label: 'Faixa de Preço', options: [
        { label: 'Até R$ 300 mil', value: '300k' },
        { label: 'R$ 300k - R$ 500k', value: '500k' },
        { label: 'R$ 500k - R$ 1M', value: '1m' },
        { label: 'Acima de R$ 1M', value: '2m' },
      ]},
    ],
  },
  EDUCATION: {
    title: 'Matrícula Online',
    theme: 'modern',
    fields: [
      { name: 'student', type: 'text', label: 'Nome do Aluno', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'course', type: 'select', label: 'Curso de Interesse', required: true, options: [
        { label: 'Ensino Fundamental', value: 'fundamental' },
        { label: 'Ensino Médio', value: 'medio' },
        { label: 'Curso Técnico', value: 'tecnico' },
        { label: 'Idiomas', value: 'idiomas' },
      ]},
    ],
  },
  EVENT_PLANNER: {
    title: 'Solicite um Orçamento',
    theme: 'rounded',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true },
      { name: 'email', type: 'email', label: 'E-mail', required: true },
      { name: 'phone', type: 'tel', label: 'Telefone', required: true },
      { name: 'event_type', type: 'select', label: 'Tipo de Evento', options: [
        { label: 'Casamento', value: 'wedding' },
        { label: 'Aniversário', value: 'birthday' },
        { label: 'Corporativo', value: 'corporate' },
        { label: 'Formatura', value: 'graduation' },
      ]},
      { name: 'guests', type: 'number', label: 'Número de Convidados' },
      { name: 'date', type: 'date', label: 'Data do Evento' },
      { name: 'message', type: 'textarea', label: 'Detalhes' },
    ],
  },
};

const DEFAULT_FORM: FormDefinition = {
  title: 'Entre em Contato',
  theme: 'modern',
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true, placeholder: 'Seu nome' },
    { name: 'email', type: 'email', label: 'E-mail', required: true, placeholder: 'seu@email.com' },
    { name: 'phone', type: 'tel', label: 'Telefone', placeholder: '(11) 99999-9999' },
    { name: 'message', type: 'textarea', label: 'Mensagem', required: true, placeholder: 'Sua mensagem' },
  ],
};

export function getFormSchemaForNiche(businessType: string): FormDefinition {
  const normalized = businessType?.toUpperCase() || 'DEFAULT';
  return NICHE_FORM_SCHEMAS[normalized] || DEFAULT_FORM;
}

export async function generateFormHTML(formDef: FormDefinition): Promise<FormResult | null> {
  try {
    const res = await fetch(`${FORMFORGE_BASE}/api/json-to-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formDef.title,
        theme: formDef.theme || 'modern',
        submitUrl: formDef.submitUrl || 'https://formforge-api.vercel.app/api/submit',
        fields: formDef.fields,
      }),
    });

    if (!res.ok) {
      console.warn(`[FormForge] API error ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!data?.html) {
      console.warn('[FormForge] Empty response');
      return null;
    }

    console.log(`[FormForge] ✓ Form generated: ${formDef.title} (${formDef.fields.length} fields, ${data.meta?.theme || formDef.theme} theme)`);
    return {
      html: data.html,
      meta: data.meta || { theme: formDef.theme || 'modern', fieldCount: formDef.fields.length, formId: '' },
    };
  } catch (err) {
    console.warn('[FormForge] Request failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

export function buildFallbackFormHTML(formDef: FormDefinition): string {
  const fields = formDef.fields.map(f => {
    const required = f.required ? 'required' : '';
    switch (f.type) {
      case 'textarea':
        return `<div style="margin-bottom:1rem">
          <label style="display:block;margin-bottom:0.35rem;font-size:0.85rem;font-weight:600">${f.label}${f.required ? ' <span style="color:#ef4444">*</span>' : ''}</label>
          <textarea name="${f.name}" ${required} placeholder="${f.placeholder || ''}" style="width:100%;padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:inherit;font-size:0.85rem;resize:vertical;box-sizing:border-box">${f.placeholder || ''}</textarea>
        </div>`;
      case 'select':
        const opts = (f.options || []).map(o => `<option value="${o.value}">${o.label}</option>`).join('');
        return `<div style="margin-bottom:1rem">
          <label style="display:block;margin-bottom:0.35rem;font-size:0.85rem;font-weight:600">${f.label}${f.required ? ' <span style="color:#ef4444">*</span>' : ''}</label>
          <select name="${f.name}" ${required} style="width:100%;padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:inherit;font-size:0.85rem;box-sizing:border-box">${opts}</select>
        </div>`;
      case 'checkbox':
        return `<div style="margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem">
          <input type="checkbox" name="${f.name}" id="ff_${f.name}" ${required} style="width:1rem;height:1rem">
          <label for="ff_${f.name}" style="font-size:0.85rem">${f.label}</label>
        </div>`;
      default:
        return `<div style="margin-bottom:1rem">
          <label style="display:block;margin-bottom:0.35rem;font-size:0.85rem;font-weight:600">${f.label}${f.required ? ' <span style="color:#ef4444">*</span>' : ''}</label>
          <input type="${f.type}" name="${f.name}" ${required} placeholder="${f.placeholder || ''}" style="width:100%;padding:0.7rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:inherit;font-size:0.85rem;box-sizing:border-box">
        </div>`;
    }
  }).join('\n');

  return `<form class="nexus-form" style="max-width:500px;margin:0 auto;padding:2rem;background:rgba(255,255,255,0.03);border-radius:1rem;border:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px)">
    <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;text-align:center">${formDef.title}</h3>
    ${fields}
    <button type="submit" style="width:100%;padding:0.85rem;border-radius:0.5rem;border:none;background:linear-gradient(135deg,var(--cyan,#06B6D4),var(--blue,#3B82F6));color:#fff;font-size:0.95rem;font-weight:700;cursor:pointer">Enviar</button>
  </form>`;
}

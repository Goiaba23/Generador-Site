export interface TempEmail {
  address: string;
  inbox: TempMessage[];
  createdAt: Date;
}

export interface TempMessage {
  from: string;
  subject: string;
  body: string;
  receivedAt: Date;
}

export interface ServiceAccount {
  service: string;
  email: string;
  password: string;
  apiKey?: string;
  creditsRemaining: number;
  createdAt: Date;
  lastUsedAt: Date;
}

export class AccountManager {
  private accounts: Map<string, ServiceAccount[]> = new Map();

  private tempMailProviders = [
    { name: 'temp-mail', url: 'https://api.temp-mail.org', generate: () => `user${Date.now()}@tempmail.org` },
    { name: 'guerrilla-mail', url: 'https://api.guerrillamail.com', generate: () => `user${Date.now()}@guerrillamail.com` },
    { name: 'mail.tm', url: 'https://api.mail.tm', generate: () => `user${Date.now()}@mail.tm` },
    { name: '10minutemail', url: 'https://api.10minutemail.com', generate: () => `user${Date.now()}@10minutemail.com` },
  ];

  async getTempEmail(): Promise<TempEmail> {
    const provider = this.tempMailProviders[Math.floor(Math.random() * this.tempMailProviders.length)];
    const address = provider.generate();

    for (const p of this.tempMailProviders) {
      try {
        const res = await fetch(`${p.url}/request/domains`);
        if (res.ok) {
          const domains = await res.json();
          if (Array.isArray(domains) && domains.length > 0) {
            const domain = typeof domains[0] === 'string' ? domains[0] : domains[0]?.name;
            const name = `user${Date.now()}`;
            return { address: `${name}@${domain}`, inbox: [], createdAt: new Date() };
          }
        }
      } catch { continue; }
    }

    return { address, inbox: [], createdAt: new Date() };
  }

  async waitForVerification(email: TempEmail, maxWaitMs: number = 60000): Promise<TempMessage | null> {
    const provider = this.tempMailProviders.find(p => email.address.includes(p.name.replace('-', '')));
    if (!provider) return null;

    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      try {
        const hash = Buffer.from(email.address).toString('hex');
        const res = await fetch(`${provider.url}/request/mail/id/${hash}`);
        if (res.ok) {
          const messages = await res.json();
          const msgs = Array.isArray(messages) ? messages : [];
          if (msgs.length > 0) {
            return {
              from: msgs[0].from || msgs[0].sender || '',
              subject: msgs[0].subject || '',
              body: msgs[0].body_text || msgs[0].body_html || '',
              receivedAt: new Date(),
            };
          }
        }
      } catch { /* retry */ }
      await new Promise(r => setTimeout(r, 3000));
    }
    return null;
  }

  async createServiceAccount(
    service: string,
    email: string,
    password: string
  ): Promise<ServiceAccount> {
    const account: ServiceAccount = {
      service,
      email,
      password,
      creditsRemaining: 0,
      createdAt: new Date(),
      lastUsedAt: new Date(),
    };

    switch (service) {
      case 'pippit':
        account.apiKey = `pip_auto_${Date.now()}`;
        account.creditsRemaining = 3;
        break;
      case 'replicate':
        account.apiKey = `r8_auto_${Date.now()}`;
        account.creditsRemaining = 10;
        break;
      default:
        account.creditsRemaining = 1;
    }

    const existing = this.accounts.get(service) || [];
    existing.push(account);
    this.accounts.set(service, existing);
    return account;
  }

  async getOrCreateServiceAccount(service: string): Promise<ServiceAccount | null> {
    const existing = this.accounts.get(service) || [];
    const valid = existing.filter(a => a.creditsRemaining > 0);

    if (valid.length > 0) {
      const account = valid[0];
      account.lastUsedAt = new Date();
      return account;
    }

    if (existing.length >= 3) {
      return existing.reduce((a, b) => a.creditsRemaining < b.creditsRemaining ? a : b);
    }

    const tempEmail = await this.getTempEmail();
    const password = `Auto_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
    return this.createServiceAccount(service, tempEmail.address, password);
  }

  useCredits(service: string, amount: number = 1): void {
    const accounts = this.accounts.get(service);
    if (accounts && accounts.length > 0) {
      accounts[0].creditsRemaining = Math.max(0, accounts[0].creditsRemaining - amount);
    }
  }

  getStatus(): { service: string; accounts: number; totalCredits: number }[] {
    const status: { service: string; accounts: number; totalCredits: number }[] = [];
    for (const [service, accs] of this.accounts) {
      status.push({
        service,
        accounts: accs.length,
        totalCredits: accs.reduce((s, a) => s + a.creditsRemaining, 0),
      });
    }
    return status;
  }

  getPassword(): string {
    return `Auto_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
  }

  generateEmail(prefix: string = 'user'): string {
    const domains = ['tempmail.org', 'guerrillamail.com', 'mail.tm', '10minutemail.com', 'inboxkitten.com'];
    return `${prefix}${Date.now().toString(36)}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }
}

export const accountManager = new AccountManager();

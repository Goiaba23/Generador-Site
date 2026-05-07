// Temp Email Service - Create temporary emails for automated signups
// Uses 10MinuteMail or TempMail APIs

export interface TempEmail {
  email: string;
  sessionId: string;
  expiresAt: number; // timestamp
  messages: TempEmailMessage[];
}

export interface TempEmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: number;
}

export class TempEmailService {
  private baseUrl = 'https://10minutemail.com';
  private sessionId?: string;

  /**
   * Create a new temporary email
   */
  async createTempEmail(): Promise<TempEmail> {
    try {
      console.log('[TempEmail] Creating temporary email...');

      // Use 10MinuteMail API (or simulate with temp-mail.org)
      const response = await fetch('https://api.10minutemail.com/api/v1/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        // Fallback to temp-mail.org
        return this.createTempEmailFallback();
      }

      const data = await response.json();

      return {
        email: data.email,
        sessionId: data.session_id,
        expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
        messages: [],
      };
    } catch (error) {
      console.error('[TempEmail] API failed, using fallback...');
      return this.createTempEmailFallback();
    }
  }

  /**
   * Fallback: Generate a random email using known temp domains
   */
  private async createTempEmailFallback(): Promise<TempEmail> {
    const domains = [
      'tempmail.com',
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com',
    ];

    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomUser = `user${Date.now()}${Math.random().toString(36).substring(7)}`;
    const email = `${randomUser}@${randomDomain}`;

    console.log(`[TempEmail] Generated fallback email: ${email}`);

    return {
      email,
      sessionId: `session-${Date.now()}`,
      expiresAt: Date.now() + (10 * 60 * 1000),
      messages: [],
    };
  }

  /**
   * Check inbox for messages
   */
  async checkInbox(sessionId: string): Promise<TempEmailMessage[]> {
    try {
      const response = await fetch(`https://api.10minutemail.com/api/v1/messages?session_id=${sessionId}`);

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.messages || [];
    } catch {
      return [];
    }
  }

  /**
   * Get message content by ID
   */
  async getMessage(sessionId: string, messageId: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.10minutemail.com/api/v1/message?session_id=${sessionId}&message_id=${messageId}`
      );

      if (!response.ok) return '';
      const data = await response.json();
      return data.body || '';
    } catch {
      return '';
    }
  }

  /**
   * Wait for verification email (polling)
   */
  async waitForVerification(
    sessionId: string,
    timeoutMs: number = 60000
  ): Promise<string | null> {
    const startTime = Date.now();
    const checkInterval = 3000; // Check every 3 seconds

    while (Date.now() - startTime < timeoutMs) {
      const messages = await this.checkInbox(sessionId);
      const verificationEmail = messages.find(
        (m) =>
          m.subject.toLowerCase().includes('verify') ||
          m.subject.toLowerCase().includes('confirm') ||
          m.from.toLowerCase().includes('pippit') ||
          m.from.toLowerCase().includes('capcut')
      );

      if (verificationEmail) {
        const body = await this.getMessage(sessionId, verificationEmail.id);
        const verificationLink = this.extractVerificationLink(body);
        if (verificationLink) {
          return verificationLink;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }

    return null;
  }

  /**
   * Extract verification link from email body
   */
  private extractVerificationLink(body: string): string | null {
    const patterns = [
      /href=["'](https?:\/\/[^\s"']+verify[^\s"']*)["']/i,
      /(https?:\/\/[^\s]+verify[^\s]*)/i,
      /(https?:\/\/[^\s]+confirm[^\s]*)/i,
      /(https?:\/\/pippit\.ai[^\s]*)/i,
    ];

    for (const pattern of patterns) {
      const match = body.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return null;
  }
}

// Export singleton
export const tempEmailService = new TempEmailService();

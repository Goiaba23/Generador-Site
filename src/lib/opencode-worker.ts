// Stub for OpenCode Worker - to be implemented
export interface WorkerSession {
  id: string;
  businessName: string;
  businessType: string;
  status: string;
  currentStep: number;
  steps: any[];
  finalResult?: any;
}

export interface StepConfig {
  id: string;
  name: string;
  description: string;
  prompt: (name: string, type: string, previousSteps: any) => string;
}

export const openCodeWorker = {
  getProgress: (sessionId: string) => ({ current: 0, total: 0, percentage: 0, status: 'not_found' }),
  getSession: (sessionId: string): WorkerSession | undefined => undefined,
  getAllSessions: (): WorkerSession[] => [],
  startExecution: async (sessionId: string) => {},
  startWorkerSession: async (name: string, type: string) => 'stub-session',
  executeStep: async (sessionId: string, stepIndex: number) => ({ step: 'stub', result: 'stub' }),
  PROGRAMMED_PATH: [] as StepConfig[],
};

export class OpenCodeWorker {
  private sessions: Map<string, WorkerSession> = new Map();
  readonly PROGRAMMED_PATH: StepConfig[] = [];
  
  getProgress(sessionId: string) {
    return { current: 0, total: 0, percentage: 0, status: 'not_found' };
  }
  getSession(sessionId: string): WorkerSession | undefined {
    return undefined;
  }
  getAllSessions(): WorkerSession[] {
    return [];
  }
  startExecution(sessionId: string): void {}
  async startWorkerSession(name: string, type: string): Promise<string> {
    return 'stub-session';
  }
  async executeStep(sessionId: string, stepIndex: number): Promise<any> {
    return { step: 'stub', result: 'stub' };
  }
}
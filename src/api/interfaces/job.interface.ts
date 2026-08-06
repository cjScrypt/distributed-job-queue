export interface EnqueueInput {
  type: string;
  payload: unknown;
  idempotencyKey?: string;
  delaySeconds?: number;
  maxAttempts?: number;
}

export interface EnqueuedJob {
  id: string;
  state: string;
  deduped: boolean;
}

export interface EnqueueInput {
  handler: string;
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

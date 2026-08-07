import { JobHandlerKey } from "src/worker/enums";

export interface EnqueueInput {
  type: JobHandlerKey;
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

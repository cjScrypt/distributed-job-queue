import { JobHandler } from "../../worker/enums";

export interface EnqueueInput {
  type: JobHandler;
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

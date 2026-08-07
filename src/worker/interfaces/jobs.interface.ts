import { JobHandlerKey } from '../enums';

export type JobState = "pending" | "active" | "completed" | "dead";

export interface Job {
  id: string;
  handler: string;
  type: JobHandlerKey;
  state: JobState;
  payload: any;

  run_at: Date;

  lease_expires_at: Date | null;
  locked_by: string | null;

  attempts: number;
  max_attempts: number;
  last_error: string | null;

  idempotency_key: string | null;

  created_at: Date;
}

export type JobHandler = (payload: any) => Promise<void>;

export type HandlerRegistry = Record<JobHandlerKey, JobHandler>;

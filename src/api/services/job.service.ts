import { DatabaseClient } from "../..//database";
import { EnqueueInput, EnqueuedJob } from "../interfaces";

export class JobService {
  private db = DatabaseClient.getInstance();

  async enqueue(input: EnqueueInput): Promise<EnqueuedJob> {
    const { handler, payload, idempotencyKey, delaySeconds, maxAttempts } = input;

    const insert = await this.db.query<{id: string, state: string}>(
      `INSERT INTO jobs (handler, payload, idempotency_key, run_at, max_attempts)
      VALUES ($1, $2, $3, now() + ($4 * interval '1 second'), COALESCE($5, 5))
      ON CONFLICT (idempotency_key) DO NOTHING
      RETURNING id, state`,
      [handler, payload, idempotencyKey ?? null, delaySeconds ?? 0, maxAttempts ?? null],
    );
    if (insert.rows.length > 0) {
      const row = insert.rows[0];

      return { id: row.id, state: row.state, deduped: false };
    }

    const existing = await this.db.query<{id: string, state: string}>(
      `SELECT id, state FROM jobs WHERE idempotency_key = $1`,
      [idempotencyKey],
    );
    const row = existing.rows[0];

    return { id: row.id, state: row.state, deduped: true };
  }
}

CREATE TYPE JOB_STATE AS ENUM ('pending', 'active', 'completed', 'dead');

-- Queue table, each row represents a job
CREATE TABLE jobs (
  id                BIGSERIAL       PRIMARY KEY,
  type              TEXT,
  state             JOB_STATE       NOT NULL DEFAULT 'pending', -- The current state of teh job
  payload           JSONB           NOT NULL,

  run_at           TIMESTAMPTZ     NOT NULL DEFAULT now(),

  lease_expires_at  TIMESTAMPTZ,
  locked_by         TEXT,

  attempts          INT             NOT NULL DEFAULT 0,
  max_attempts      INT             NOT NULL DEFAULT 5,
  last_error        TEXT,

  idempotency_key   TEXT            UNIQUE,

  created_at        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

-- A guard the worker writes to in the same transaction.
-- A reclaimed duplicate sets `job_id` and rolls back.
CREATE TABLE processed_jobs (
  job_id            BIGINT          PRIMARY KEY REFERENCES jobs(id),
  processed_at      TIMESTAMPTZ     NOT NULL DEFAULT now()
);

-- Makes the claim fast. Holds claimable rows and stays small even with millions of completed jobs.
CREATE INDEX jobs_claim_idx ON jobs (run_at) WHERE state = 'pending';

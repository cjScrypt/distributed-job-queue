export const CLAIM_JOB_SQL = `
  UPDATE jobs SET
    state = 'active',
    locked_by = $1,
    attempts = attempts + 1,
    lease_expires_at = now() + interval '30 seconds'
  WHERE id in (
    SELECT id FROM jobs
    WHERE state = 'pending' AND run_at <= now()
    ORDER BY run_at
    FOR UPDATE SKIP LOCKED
    LIMIT 1
  )
  RETURNING *;
`;

export const COMPLETE_JOB_SQL = `
  UPDATE jobs SET state = 'completed', updated_at = now()
  WHERE id = $1 AND locked_by = $2;
`;

export const FAIL_JOB_SQL = `
  UPDATE jobs
  SET state = CASE WHEN attempts >= max_attempts THEN 'dead' ELSE 'pending' END,
    locked_by = NULL,
    lease_expires_at = NULL,
    last_error = $3,
    updated_at = now()
  WHERE id = $1 AND locked_by = $2;
`;

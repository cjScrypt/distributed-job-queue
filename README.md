# Distributed Job Queue

A distributed job queue built with **Node.js**, and **PostgreSQL**. Jobs are persisted in Postgres as rows, workers claim them using `SELECT … FOR UPDATE SKIP LOCKED` and a time-based lease mechanism. This enables safe concurrent processing and automatic job recovery when workers crash.

## Key Features

- **Lease-based crash recovery**: workers borrow jobs for a period of time. If a worker dies, the lease expires and another worker picks the job up.
- **At-least-once delivery**: a `processed_jobs` record commits inside the same transaction as the side effect which prevent duplicates.
- **Delayed jobs**: schedule jobs using `run_at` column.
- **Dead-letter queue**: jobs that exhaust their retry count move to a `dead` state.
- **Producer-side deduplication**: an optional `idempotency_key` unique constraint prevents the same job from being enqueued twice by the producer(API in our case).

## Tech Stack

- TypeScript
- PostgreSQL
- Express
- Docker

## Getting Started

```bash
# Start Postgres (+ Adminer on :8080)
docker compose up

# Install dependencies and build
npm install
npm run build

# Run the API and a worker in separate terminals
npm run start:api
npm run start:worker
```

## Project Structure

```
src/
├── api/            # Express REST API (enqueue jobs via POST /jobs)
│   ├── controllers/
│   ├── dto/
│   ├── middlewares/
│   ├── routers/
│   └── services/
├── worker/         # Poll-based worker loop + sweeper
│   ├── services/
│   ├── utils/
│   └── enums/
├── database/       # Postgres connection pool
└── config/         # Environment configuration
migrations/         # SQL schema (jobs + processed_jobs tables)
```

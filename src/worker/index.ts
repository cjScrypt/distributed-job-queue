import { hostname } from "node:os";
import { DatabaseClient } from "../database";
import { WorkerService } from "./services";

const workerApp = async () => {
  const db = DatabaseClient.getInstance();
  db.connect();

  const workerId = `${hostname()}-${process.pid}`;

  const service = new WorkerService();
  await service.runLoop(workerId);
}

workerApp().catch((err: unknown) => {
  console.error("Worker crashed:", err);
  process.exit(1);
});

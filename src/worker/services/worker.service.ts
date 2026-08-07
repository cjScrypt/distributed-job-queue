import { DatabaseClient } from "../../database";
import { Job } from "../interfaces";
import {
  CLAIM_JOB_SQL,
  COMPLETE_JOB_SQL,
  FAIL_JOB_SQL,
  handlerRegistry,
  sleep,
} from "../utils";

export class WorkerService {
  private db = DatabaseClient.getInstance();

  constructor() {}

  async runLoop(workerId: string) {
    while (true) {
      console.log('Next iteration');
      let claimQueryResult;
      try {
        claimQueryResult = await this.db.query<Job>(CLAIM_JOB_SQL, [workerId]);
      } catch (err) {
        console.error('Claim failed', err);
        await sleep(5000);
        continue;
      }

      if (claimQueryResult.rows.length == 0) {
        await sleep(5000);
        continue;
      }
      const claimedJob = claimQueryResult.rows[0];

      try {
        const handler = handlerRegistry[claimedJob.type];
        await handler(claimedJob.payload);
        await this.db.query(COMPLETE_JOB_SQL, [claimedJob.id, workerId]);
      } catch (error) {
        console.error(`Job ${claimedJob.id} failed`, error);
        await this.db.query(FAIL_JOB_SQL, [claimedJob.id, workerId, String(error)]);
      } finally {
        await sleep(5000);
      }
    }
  }
}

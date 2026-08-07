import { JobHandlerKey } from '../enums';
import { HandlerRegistry } from "../interfaces";
import { sleep } from './sleep';

/**
 * Mock an email request. Simply logs and sleeps to simulate send latency.
 * Succeed always.
 */
const sendEmail = async (payload: {id: string, email: string}) => {
  console.log(`Sent email to ${payload.email}`);
  await sleep(500);
}

/**
 * Simulate a slow job that will be killed using `kill -9` mid run.
 * Another worker should claim the job
 */
const slowDown = async (_payload: unknown) => {
  await sleep(10_000);
}

/**
 * Fails everytime a worker processes it.
 * Will end up in the Dead Letter Queue.
 */
const poison = async (_payload: unknown) => {
  await sleep(1000); //
  throw new Error('Poison job, fail always');
}

export const handlerRegistry: HandlerRegistry = {
  [JobHandlerKey.SEND_EMAIL]: sendEmail,
  [JobHandlerKey.SLOW_DOWN]: slowDown,
  [JobHandlerKey.POISON]: poison,
}

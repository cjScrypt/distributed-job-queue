import { JobHandler } from "../enums"

const sendEmail = async (_payload: unknown) => {}

export const handlerRegistry: Record<JobHandler, (payload: unknown) => Promise<void>> = {
  [JobHandler.SEND_EMAIL]: sendEmail,
}

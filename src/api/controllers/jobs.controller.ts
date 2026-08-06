import { NextFunction, Request, Response } from "express";
import { CreateJobDto } from "../dto";
import { JobService } from "../services";

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as CreateJobDto;

    await new JobService().enqueue({
      type: data.type,
      payload: data.payload,
      idempotencyKey: data.idempotencyKey,
      delaySeconds: data.delaySeconds,
      maxAttempts: data.maxAttempts,
    });

    res.status(200).json({
      success: true,
      message: 'Job successfully enqueued',
    })
  } catch (error) {
    next(error);
  }
}

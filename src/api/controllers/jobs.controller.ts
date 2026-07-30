import { NextFunction, Request, Response } from "express";
import { CreateJobDto } from "../dto";

export const createJob = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as CreateJobDto

    res.status(200).json({
      success: true,
      message: 'Job successfully enqueued',
    })
  } catch (error) {
    next(error);
  }
}

import { Router } from "express";
import { createJob } from "../controllers/jobs.controller";
import { AppMiddleware } from "../middlewares";
import { CreateJobDto } from "../dto";

export const jobRouter = Router();

jobRouter.post(
  '/jobs',
  AppMiddleware.validateBodyDto(CreateJobDto),
  createJob,
);

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { APIError, APIValidationError } from "../utils";

export const appErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      fields: err instanceof APIValidationError ? err.fields : undefined,
    });
    return;
  }

  res.status(500).json({ success: false, message: 'Internal Server Error' });
}

import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { APIValidationError, formatValidationErrors } from "../utils";

export const validateBodyDto = <T extends object>(dtoClass: ClassConstructor<T>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const data = req.body as T;
    const dtoInstance = plainToInstance(dtoClass, data);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      throw new APIValidationError(
        "Validation Error",
        400,
        formattedErrors
      );
    }

    req.body = data;
    next();
  }
}

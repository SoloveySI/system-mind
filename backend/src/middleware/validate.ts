import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { AppError } from "../utils/appError.js";

export const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues
          .map((err: { message: string }) => err.message)
          .join(", ");
        return next(new AppError(`Ошибка валидации: ${errorMessage}`, 400));
      }
      next(error);
    }
  };

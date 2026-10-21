import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Если произошла непредвиденная ошибка
  console.error("НЕПРЕДВИДЕННАЯ ОШИБКА:", err);
  return res.status(500).json({
    error: "Внутренняя ошибка сервера",
  });
};

import { Request, Response, NextFunction } from "express";
import { SubmissionService } from "../services/submission.service.js";

export class SubmissionController {
  static async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = Number(req.params.id);
      if (!Number.isInteger(taskId) || taskId < 1) {
        return res.status(400).json({ error: "Некорректный номер упражнения" });
      }

      const { answer, timeSpentSeconds, variantId } = req.body ?? {};
      if (
        timeSpentSeconds !== undefined &&
        (!Number.isFinite(timeSpentSeconds) || timeSpentSeconds < 0)
      ) {
        return res.status(400).json({ error: "Некорректное время выполнения" });
      }
      if (variantId !== undefined && typeof variantId !== "string") {
        return res
          .status(400)
          .json({ error: "Некорректный вариант упражнения" });
      }

      const result = await SubmissionService.submit(
        res.locals.userId,
        taskId,
        answer,
        timeSpentSeconds,
        variantId,
      );

      if (result.status === "not_found") {
        return res.status(404).json({ error: "Упражнение не найдено" });
      }
      if (result.status === "bad_variant") {
        return res
          .status(400)
          .json({ error: "Не указан или неизвестен вариант упражнения" });
      }
      if (result.status === "unsupported") {
        return res
          .status(422)
          .json({ error: "Для этого упражнения проверка ещё не реализована" });
      }

      const { status, ...payload } = result;
      return res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  }
}

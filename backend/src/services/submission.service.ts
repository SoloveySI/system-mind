import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { evaluateAnswer } from "./evaluate.service.js";

export class SubmissionService {
  // Проверяет ответ, сохраняет попытку в базу и возвращает результат
  static async submit(
    userId: number,
    taskId: number,
    answer: unknown,
    timeSpentSeconds?: number,
  ) {
    const task = await prisma.tasks.findUnique({ where: { id: taskId } });
    if (!task) return { status: "not_found" as const };

    const result = evaluateAnswer(task.content as Record<string, any>, answer);
    if (!result) return { status: "unsupported" as const };

    const saved = await prisma.user_submissions.create({
      data: {
        user_id: userId,
        task_id: taskId,
        is_correct: result.isCorrect,
        score: result.score,
        user_answer: {
          answer,
          timeSpentSeconds: timeSpentSeconds ?? null,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    return { status: "ok" as const, submissionId: saved.id, ...result };
  }
}

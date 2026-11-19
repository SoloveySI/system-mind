import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { evaluateAnswer } from "./evaluate.service.js";
import { VariantService } from "./variant.service.js";

export class SubmissionService {
  // Проверяет ответ именно по тому варианту текста, который видел пользователь, и сохраняет попытку
  static async submit(
    userId: number,
    taskId: number,
    answer: unknown,
    timeSpentSeconds?: number,
    variantCode?: string,
  ) {
    const task = await prisma.tasks.findUnique({ where: { id: taskId } });
    if (!task) return { status: "not_found" as const };

    // Код варианта обязателен: иначе сервер проверил бы ответ по другому тексту
    const picked = await VariantService.pick(
      taskId,
      task.content as Record<string, any>,
      variantCode,
      false,
    );
    if (!picked) return { status: "bad_variant" as const };

    const result = evaluateAnswer(picked.merged, answer);
    if (!result) return { status: "unsupported" as const };

    const saved = await prisma.user_submissions.create({
      data: {
        user_id: userId,
        task_id: taskId,
        is_correct: result.isCorrect,
        score: result.score,
        user_answer: {
          answer,
          variantId: picked.variantId,
          timeSpentSeconds: timeSpentSeconds ?? null,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    return { status: "ok" as const, submissionId: saved.id, ...result };
  }
}

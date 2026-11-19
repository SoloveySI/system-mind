import { prisma } from "../config/prisma.js";

type Json = Record<string, any>;

export class VariantService {
  // Выбирает один вариант текста упражнения из таблицы task_variants и
  // объединяет его с общими настройками упражнения (шаблон, таймер и т. д.).
  // allowRandom = true: если код варианта не указан, берём случайный (для показа упражнения).
  // allowRandom = false: код обязателен (для проверки ответа).
  static async pick(
    taskId: number,
    base: Json,
    code?: string,
    allowRandom = true,
  ): Promise<{ merged: Json; variantId: string | null } | null> {
    const total = await prisma.task_variants.count({
      where: { task_id: taskId },
    });

    // У упражнения нет вариантов в таблице: работаем только с общими настройками
    if (total === 0) return { merged: base, variantId: null };

    let variant: { code: string; content: unknown } | null = null;
    if (code) {
      variant = await prisma.task_variants.findUnique({
        where: { task_id_code: { task_id: taskId, code } },
      });
    } else if (allowRandom) {
      variant = await prisma.task_variants.findFirst({
        where: { task_id: taskId },
        orderBy: { id: "asc" },
        skip: Math.floor(Math.random() * total),
      });
    }
    if (!variant) return null;

    return {
      merged: { ...base, ...(variant.content as Json) },
      variantId: variant.code,
    };
  }
}

import { prisma } from "../config/prisma.js";
import { stripAnswers } from "../utils/sanitizeContent.js";
import { VariantService } from "./variant.service.js";

export class CatalogService {
  // Все блоки вместе с упражнениями (для главного меню плитками)
  static async getBlocks() {
    return await prisma.categories.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        tasks: {
          orderBy: { id: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
          },
        },
      },
    });
  }

  // Упражнение с одним вариантом текста (случайным или указанным) и без правильных ответов
  static async getTask(id: number, variantCode?: string) {
    const task = await prisma.tasks.findUnique({
      where: { id },
      include: {
        categories: { select: { id: true, slug: true, title: true } },
      },
    });
    if (!task) return { status: "not_found" as const };

    const picked = await VariantService.pick(
      id,
      task.content as Record<string, any>,
      variantCode,
      true,
    );
    if (!picked) return { status: "bad_variant" as const };

    return {
      status: "ok" as const,
      task: {
        ...task,
        variantId: picked.variantId,
        content: stripAnswers(picked.merged),
      },
    };
  }
}

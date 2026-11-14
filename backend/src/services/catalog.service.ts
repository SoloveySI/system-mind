import { prisma } from "../config/prisma.js";
import { stripAnswers } from "../utils/sanitizeContent.js";

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

  // Одно упражнение целиком (для экрана упражнения), но без правильных ответов
  static async getTask(id: number) {
    const task = await prisma.tasks.findUnique({
      where: { id },
      include: {
        categories: { select: { id: true, slug: true, title: true } },
      },
    });
    if (!task) return null;
    return { ...task, content: stripAnswers(task.content) };
  }
}

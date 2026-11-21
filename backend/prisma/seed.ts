import { PrismaClient, Prisma } from "@prisma/client";
import { BLOCKS, TASKS } from "./seed-data.js";

const prisma = new PrismaClient();

type Json = Record<string, any>;

async function main() {
  // Блоки: создаём или обновляем по уникальному slug
  const blockIds: Record<string, number> = {};
  for (const b of BLOCKS) {
    const row = await prisma.categories.upsert({
      where: { slug: b.slug },
      update: { title: b.title, description: b.description },
      create: b,
    });
    blockIds[b.slug] = row.id;
  }

  for (const t of TASKS) {
    // В таблице tasks остаются только общие настройки упражнения (шаблон, таймер),
    const { variants = [], ...base } = t.content as Json;

    const data = {
      category_id: blockIds[t.block],
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      content: base as Prisma.InputJsonValue,
    };

    // Ищем по названию, чтобы повторный запуск обновлял данные, а не создавал дубликаты
    const existing = await prisma.tasks.findFirst({
      where: { title: t.title },
    });
    const task = existing
      ? await prisma.tasks.update({ where: { id: existing.id }, data })
      : await prisma.tasks.create({ data });

    const codes: string[] = [];
    for (const v of variants as Json[]) {
      const { id: code, ...content } = v;
      codes.push(code);
      await prisma.task_variants.upsert({
        where: { task_id_code: { task_id: task.id, code } },
        update: { content: content as Prisma.InputJsonValue },
        create: {
          task_id: task.id,
          code,
          content: content as Prisma.InputJsonValue,
        },
      });
    }
    await prisma.task_variants.deleteMany({
      where: { task_id: task.id, code: { notIn: codes } },
    });
  }

  const blocks = await prisma.categories.count();
  const tasks = await prisma.tasks.count();
  const variants = await prisma.task_variants.count();
  console.log(
    `Готово: блоков ${blocks}, упражнений ${tasks}, вариантов текстов ${variants}`,
  );
}

main()
  .catch((err) => {
    console.error("Ошибка заливки:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

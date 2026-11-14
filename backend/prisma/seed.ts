import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Блоки (таблица categories). Создаём только те, в которых есть упражнения
const BLOCKS = [
  {
    slug: "memory-focus",
    title: "Кратковременная память и фокус",
    description: "Удержание фактов и данных в памяти, концентрация внимания.",
  },
  {
    slug: "critical-thinking",
    title: "Критическое мышление и фильтрация информации",
    description: "Отделение фактов от мнений и поиск скрытых манипуляций.",
  },
  {
    slug: "systems-analysis",
    title: "Системный анализ и быстрый разбор ситуаций",
    description: "Причинно-следственные связи и быстрая диагностика кейсов.",
  },
  {
    slug: "data-tables",
    title: "Прикладная работа с таблицами и данными",
    description: "Поиск ошибок и аномалий, выбор по строгим критериям.",
  },
];

type Level = "easy" | "medium" | "hard";

interface TaskSeed {
  block: string;
  title: string;
  description: string;
  difficulty: Level;
  content: Record<string, unknown>;
}

// Упражнения (таблица tasks). Поле content хранит настройки шаблона упражнения
const TASKS: TaskSeed[] = [
  {
    block: "memory-focus",
    title: "Вспышка",
    difficulty: "easy",
    description: "Показ карточки с фактом и ввод точных данных по памяти.",
    content: {
      template: "memory_flash",
      rounds: [
        {
          card: "Заказ №48213 оформлен 14 марта. Сумма: 12450 ₽. Доставка: Казань.",
          showSeconds: 6,
          questions: [
            { id: "q1", label: "Номер заказа", answer: "48213" },
            { id: "q2", label: "Сумма (₽)", answer: "12450" },
            { id: "q3", label: "Город доставки", answer: "Казань" },
          ],
        },
        {
          card: "Рейс SU 1427, вылет в 07:45, выход B12, место 18C.",
          showSeconds: 6,
          questions: [
            { id: "q1", label: "Время вылета", answer: "07:45" },
            { id: "q2", label: "Выход", answer: "B12" },
            { id: "q3", label: "Место", answer: "18C" },
          ],
        },
      ],
    },
  },
  {
    block: "critical-thinking",
    title: "Факты vs Мнения",
    difficulty: "easy",
    description:
      "Разметка предложений на объективные данные и субъективные оценки.",
    content: {
      template: "classify",
      options: [
        { value: "fact", label: "Факт" },
        { value: "opinion", label: "Мнение" },
      ],
      items: [
        {
          id: "s1",
          text: "Выручка за квартал выросла на 12%.",
          answer: "fact",
        },
        {
          id: "s2",
          text: "Это невероятный успех для всей команды.",
          answer: "opinion",
        },
        {
          id: "s3",
          text: "Отток клиентов остался на уровне 4%.",
          answer: "fact",
        },
        {
          id: "s4",
          text: "Новый дизайн сайта выглядит гораздо лучше прежнего.",
          answer: "opinion",
        },
        {
          id: "s5",
          text: "Среднее время ответа поддержки составляет 3 часа.",
          answer: "fact",
        },
        {
          id: "s6",
          text: "Клиентам явно нравится наш сервис.",
          answer: "opinion",
        },
      ],
    },
  },
  {
    block: "critical-thinking",
    title: "Поиск логических уловок",
    difficulty: "medium",
    description: "Распознавание скрытых манипуляций в аргументации.",
    content: {
      template: "choice",
      timeLimitSeconds: 60,
      case: "В рекламе сказано: «Этим кремом пользуются все звёзды, значит, он лучший на рынке».",
      question: "Какая логическая уловка использована?",
      options: [
        {
          id: "a",
          text: "Апелляция к популярности: «все так делают, значит, это правильно»",
        },
        { id: "b", text: "Переход на личности вместо разбора аргумента" },
        { id: "c", text: "Ложная дилемма: предлагаются только два варианта" },
        {
          id: "d",
          text: "Подмена понятий: слово меняет значение по ходу рассуждения",
        },
      ],
      correct: "a",
      explanation:
        "Вывод о качестве крема сделан только из того, что им пользуются многие, а свойства самого крема не названы.",
    },
  },
  {
    block: "systems-analysis",
    title: "Экспресс-Диагностика",
    difficulty: "medium",
    description:
      "Быстрое чтение бизнес-кейса и выбор верного диагноза по таймеру.",
    content: {
      template: "choice",
      timeLimitSeconds: 60,
      case: "В интернет-магазине за месяц посещаемость сайта выросла на 30%, а число заказов и средний чек остались прежними.",
      question: "Что вероятнее всего объясняет ситуацию?",
      options: [
        {
          id: "a",
          text: "Выросла доля нецелевого трафика: пришли посетители, которые не собираются покупать",
        },
        {
          id: "b",
          text: "Покупатели стали заказывать товары на большую сумму",
        },
        {
          id: "c",
          text: "Сайт стал работать быстрее, поэтому заказов должно быть больше",
        },
        {
          id: "d",
          text: "Конкуренты подняли цены, и все клиенты перешли к нам",
        },
      ],
      correct: "a",
      explanation:
        "Рост трафика без роста заказов говорит о том, что новые посетители не покупают. Остальные версии противоречат данным: средний чек и число заказов не менялись.",
    },
  },
  {
    block: "data-tables",
    title: "Фин-Аудит",
    difficulty: "medium",
    description:
      "Оперативный поиск математической ошибки или аномалии в финансовой таблице.",
    content: {
      template: "choice",
      timeLimitSeconds: 90,
      case: "Отчёт о выручке за первый квартал.",
      table: {
        columns: ["Месяц", "Выручка, ₽"],
        rows: [
          ["Январь", "410 000"],
          ["Февраль", "385 000"],
          ["Март", "440 000"],
          ["Итого за квартал", "1 325 000"],
        ],
      },
      question: "Что не так в этой таблице?",
      options: [
        { id: "a", text: "Неверно посчитан итог за квартал" },
        { id: "b", text: "Февраль указан с ошибкой" },
        { id: "c", text: "В таблице нет ошибок" },
      ],
      correct: "a",
      explanation:
        "410 000 + 385 000 + 440 000 = 1 235 000, а в таблице указано 1 325 000: цифры переставлены местами.",
    },
  },
  {
    block: "data-tables",
    title: "Экспресс-Смета",
    difficulty: "medium",
    description:
      "Выбор подходящего подрядчика по строгим критериям за ограниченное время.",
    content: {
      template: "choice",
      timeLimitSeconds: 90,
      case: "Нужно выбрать подрядчика для ремонта офиса. Условия: бюджет не более 500 000 ₽, срок не более 30 дней, опыт не менее 3 лет.",
      table: {
        columns: ["Подрядчик", "Цена, ₽", "Срок, дней", "Опыт, лет"],
        rows: [
          ["СтройА", "480 000", "25", "2"],
          ["СтройБ", "520 000", "20", "6"],
          ["СтройВ", "470 000", "28", "5"],
          ["СтройГ", "430 000", "35", "4"],
        ],
      },
      question: "Какой подрядчик подходит по всем критериям?",
      options: [
        { id: "a", text: "СтройА" },
        { id: "b", text: "СтройБ" },
        { id: "c", text: "СтройВ" },
        { id: "d", text: "СтройГ" },
      ],
      correct: "c",
      explanation:
        "СтройА не проходит по опыту (2 года), СтройБ по цене (520 000), СтройГ по сроку (35 дней). СтройВ укладывается во все три условия.",
    },
  },
];

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

  // Упражнения: ищем по названию, чтобы повторный запуск не создавал дубликаты
  for (const t of TASKS) {
    const data = {
      category_id: blockIds[t.block],
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      content: t.content as Prisma.InputJsonValue,
    };
    const existing = await prisma.tasks.findFirst({
      where: { title: t.title },
    });
    if (existing) {
      await prisma.tasks.update({ where: { id: existing.id }, data });
    } else {
      await prisma.tasks.create({ data });
    }
  }

  const blocks = await prisma.categories.count();
  const tasks = await prisma.tasks.count();
  console.log(`Готово: блоков ${blocks}, упражнений ${tasks}`);
}

main()
  .catch((err) => {
    console.error("Ошибка заливки:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

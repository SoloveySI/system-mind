import type { Exercise } from "../types/exercise";

// Запасные данные: показываются, если сервер недоступен
export const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: "1",
    title: "Деконструкция аргументов",
    description:
      "Разделите тезис на объективные факты и субъективные суждения автора. Найдите пропущенную предпосылку.",
    difficulty: "EASY",
    category: "LOGIC",
  },
  {
    id: "2",
    title: "Анализ каузальности (5 Why)",
    description:
      "Исследуйте аномалию в данных и определите фундаментальную причину отклонения.",
    difficulty: "MEDIUM",
    category: "STATISTICS",
  },
];

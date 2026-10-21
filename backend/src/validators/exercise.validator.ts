import { z } from "zod";

export const createExerciseSchema = z.object({
  title: z
    .string()
    .min(1, "Название упражнения обязательно")
    .min(3, "Название должно содержать минимум 3 символа"),

  description: z
    .string()
    .min(1, "Описание задачи обязательно")
    .min(5, "Описание должно быть подробнее"),

  category: z.string().min(1, "Категория обязательна"),

  difficulty: z.string().min(1, "Сложность обязательна"),

  answer: z.string().min(1, "Ответ обязателен"),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;

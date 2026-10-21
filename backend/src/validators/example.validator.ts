import { z } from "zod";

export const createItemSchema = z.object({
  name: z
    .string({ message: "Поле name должно быть строкой" })
    .min(2, "Имя должно содержать минимум 2 символа"),

  age: z
    .number({ message: "Поле age должно быть числом" })
    .min(0, "Возраст не может быть отрицательным"),
});

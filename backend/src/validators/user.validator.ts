import { z } from "zod";

// Схема для создания пользователя
export const createUserSchema = z.object({
  email: z.string().email({ message: "Некорректный формат email" }),
  name: z
    .string()
    .min(2, { message: "Имя должно содержать хотя бы 2 символа" }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

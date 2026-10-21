import { Request, Response } from "express";
import { userService } from "../services/user.service.js";
import { createUserSchema } from "../validators/user.validator.js";

export const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Не удалось получить пользователей" });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      // Валидация тела запроса через Zod
      const validationResult = createUserSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({
          error: "Ошибка валидации",
          details: validationResult.error.format(),
        });
      }

      const { email, name } = validationResult.data;
      const newUser = await userService.createUser({ email, name });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({
        error:
          "Ошибка при создании пользователя (возможно, такой email уже существует)",
      });
    }
  },
};

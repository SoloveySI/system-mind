import { Router } from "express";
import { UserRepository } from "../infrastructure/UserRepository.js";

const router = Router();
const userRepository = new UserRepository();

// GET /api/users — получить список всех пользователей
router.get("/users", async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

// POST /api/users — создать нового пользователя
router.post("/users", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Email и имя обязательны" });
    }

    const newUser = await userRepository.create({ email, name });
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Ошибка при создании пользователя:", error);
    if (error.code === "23505") {
      // Ошибка уникальности PostgreSQL (например, дубликат email)
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

export default router;

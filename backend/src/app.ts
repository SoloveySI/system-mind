import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Получить список всех пользователей
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Не удалось получить пользователей" });
  }
});

// Создать нового пользователя
app.post("/users", async (req, res) => {
  try {
    const { email, name } = req.body;
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({
      error:
        "Ошибка при создании пользователя (возможно, такой email уже существует)",
    });
  }
});

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./api/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для чтения JSON-тела запросов
app.use(express.json());

// Подключаем наши маршруты API
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "System Mind API работает!" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

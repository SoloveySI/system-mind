import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRoutes } from "./routes/user.routes.js";
import { exerciseRoutes } from "./routes/exercise.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Маршруты
app.use(userRoutes);
app.use(exerciseRoutes);

// Централизованная обработка ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

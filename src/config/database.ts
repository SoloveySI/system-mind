import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then((client) => {
    console.log(
      "Успешное подключение к базе данных PostgreSQL (system_mind_db)",
    );
    client.release();
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err.message);
  });

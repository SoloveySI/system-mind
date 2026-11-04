import type { Exercise } from "../types/exercise";

const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export async function fetchExercises(): Promise<Exercise[]> {
  const response = await fetch(`${API_URL}/exercises`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Сервер вернул неожиданный ответ");
  return data as Exercise[];
}

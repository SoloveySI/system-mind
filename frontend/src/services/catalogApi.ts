import type { Block, TaskDetail } from "../types/catalog";

const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return (await response.json()) as T;
}

export const fetchBlocks = () => request<Block[]>("/blocks");
export const fetchTask = (id: number) => request<TaskDetail>(`/tasks/${id}`);

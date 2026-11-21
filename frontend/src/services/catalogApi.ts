import type { Block, SubmitResult, TaskDetail } from "../types/catalog";
import { getGuestId } from "../utils/guest";

const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
  return (await response.json()) as T;
}

export const fetchBlocks = () => request<Block[]>("/blocks");
export const fetchTask = (id: number) => request<TaskDetail>(`/tasks/${id}`);

export interface SubmitPayload {
  answer: unknown;
  variantId: string | null;
  timeSpentSeconds: number;
}

// Отправляет ответ на проверку; сервер сохраняет попытку за «гостем» с этим кодом
export const submitAnswer = (taskId: number, payload: SubmitPayload) =>
  request<SubmitResult>(`/tasks/${taskId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-guest-id": getGuestId() },
    body: JSON.stringify({
      ...payload,
      variantId: payload.variantId ?? undefined,
    }),
  });

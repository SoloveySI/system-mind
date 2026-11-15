// Упражнение в списке блока
export interface TaskSummary {
  id: number;
  title: string;
  description: string;
  difficulty: string | null;
}

// Блок упражнений вместе с его упражнениями
export interface Block {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  tasks: TaskSummary[];
}

// Одно упражнение целиком
export interface TaskDetail {
  id: number;
  title: string;
  description: string;
  difficulty: string | null;
  content: Record<string, unknown>;
  categories: { id: number; slug: string; title: string } | null;
}

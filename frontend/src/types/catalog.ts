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

// Шаблон «Выбор ответа» (с таймером, может содержать таблицу)
export interface ChoiceContent {
  template: "choice";
  timeLimitSeconds?: number;
  case: string;
  table?: { columns: string[]; rows: string[][] };
  question: string;
  options: { id: string; text: string }[];
}

// Шаблон «Разметка»: каждое предложение нужно отнести к одной из категорий
export interface ClassifyContent {
  template: "classify";
  options: { value: string; label: string }[];
  items: { id: string; text: string }[];
}

// Шаблон «Запомни и введи»: карточка на несколько секунд, потом вопросы
export interface MemoryContent {
  template: "memory_flash";
  rounds: {
    card: string;
    showSeconds: number;
    questions: { id: string; label: string }[];
  }[];
}

export type TaskContent = ChoiceContent | ClassifyContent | MemoryContent;

// Одно упражнение целиком. variantId нужно вернуть серверу вместе с ответом
export interface TaskDetail {
  id: number;
  title: string;
  description: string;
  difficulty: string | null;
  variantId: string | null;
  content: TaskContent;
  categories: { id: number; slug: string; title: string } | null;
}

// Что сервер отвечает после проверки ответа
export interface SubmitResult {
  submissionId: number;
  isCorrect: boolean;
  score: number;
  details: unknown;
}

export interface ChoiceDetails {
  correct: string;
  explanation: string | null;
}
export interface ClassifyDetails {
  items: { id: string; text: string; correct: boolean; right: string }[];
}
export interface MemoryDetails {
  rounds: {
    questions: { id: string; label: string; correct: boolean; right: string }[];
  }[];
}

type Json = Record<string, any>;

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // процент правильных ответов, от 0 до 100
  details: unknown; // что показать пользователю после проверки
}

// Приводим ответ к единому виду: без регистра, пробелов и разницы между «е» и «ё»
const normalize = (value: unknown) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, "");

const percent = (right: number, total: number) =>
  total === 0 ? 0 : Math.round((right / total) * 100);

// Шаблон «Запомни и введи»: answer = [{ q1: "...", q2: "..." }, ...] по одному объекту на раунд
function evaluateMemory(content: Json, answer: unknown): EvaluationResult {
  const given: unknown[] = Array.isArray(answer) ? answer : [];
  let right = 0;
  let total = 0;

  const rounds = (content.rounds ?? []).map((round: Json, i: number) => {
    const roundAnswers = (given[i] ?? {}) as Json;
    return {
      questions: (round.questions ?? []).map((q: Json) => {
        total += 1;
        const correct = normalize(roundAnswers[q.id]) === normalize(q.answer);
        if (correct) right += 1;
        return { id: q.id, label: q.label, correct, right: q.answer };
      }),
    };
  });

  const score = percent(right, total);
  return { isCorrect: score === 100, score, details: { rounds } };
}

// Шаблон «Разметка»: answer = { s1: "fact", s2: "opinion", ... }
function evaluateClassify(content: Json, answer: unknown): EvaluationResult {
  const given = (answer && typeof answer === "object" ? answer : {}) as Json;
  let right = 0;

  const items = (content.items ?? []).map((item: Json) => {
    const correct = given[item.id] === item.answer;
    if (correct) right += 1;
    return { id: item.id, text: item.text, correct, right: item.answer };
  });

  const score = percent(right, items.length);
  return { isCorrect: score === 100, score, details: { items } };
}

// Шаблон «Выбор ответа»: answer = "a" (код выбранного варианта) или null, если время вышло
function evaluateChoice(content: Json, answer: unknown): EvaluationResult {
  const chosen = typeof answer === "string" ? answer : null;
  const correct = chosen !== null && chosen === content.correct;
  return {
    isCorrect: correct,
    score: correct ? 100 : 0,
    details: {
      correct: content.correct,
      explanation: content.explanation ?? null,
    },
  };
}

// Возвращает null, если для шаблона ещё нет проверки
export function evaluateAnswer(
  content: Json,
  answer: unknown,
): EvaluationResult | null {
  switch (content?.template) {
    case "memory_flash":
      return evaluateMemory(content, answer);
    case "classify":
      return evaluateClassify(content, answer);
    case "choice":
      return evaluateChoice(content, answer);
    default:
      return null;
  }
}

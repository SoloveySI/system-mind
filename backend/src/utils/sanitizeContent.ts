type Json = Record<string, any>;

// Убирает из настроек упражнения правильные ответы, чтобы их нельзя было подсмотреть в браузере
export function stripAnswers(content: unknown): unknown {
  if (!content || typeof content !== "object") return content;

  const c = structuredClone(content) as Json;

  switch (c.template) {
    case "memory_flash":
      c.rounds?.forEach((round: Json) =>
        round.questions?.forEach((q: Json) => delete q.answer),
      );
      break;
    case "classify":
      c.items?.forEach((item: Json) => delete item.answer);
      break;
    case "choice":
      delete c.correct;
      delete c.explanation;
      break;
  }
  return c;
}

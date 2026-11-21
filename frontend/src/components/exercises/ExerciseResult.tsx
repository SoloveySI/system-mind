import type {
  ChoiceDetails,
  ClassifyDetails,
  MemoryDetails,
  SubmitResult,
  TaskContent,
} from "../../types/catalog";

interface ExerciseResultProps {
  content: TaskContent;
  result: SubmitResult;
  userAnswer: unknown;
}

const verdict = (score: number) =>
  score === 100
    ? "Отлично!"
    : score >= 50
      ? "Неплохо, но есть ошибки"
      : "Попробуйте ещё раз";

// Показывает результат и разбор ответов по шаблону упражнения
export const ExerciseResult = ({
  content,
  result,
  userAnswer,
}: ExerciseResultProps) => (
  <div>
    <div className={`rt-score ${result.isCorrect ? "is-right" : ""}`}>
      <span className="rt-score-num">{result.score}%</span>
      <span className="rt-score-text">{verdict(result.score)}</span>
    </div>

    {content.template === "choice" && (
      <ChoiceBreakdown
        content={content}
        details={result.details as ChoiceDetails}
        userAnswer={userAnswer as string | null}
      />
    )}
    {content.template === "classify" && (
      <ClassifyBreakdown
        content={content}
        details={result.details as ClassifyDetails}
        userAnswer={userAnswer as Record<string, string>}
      />
    )}
    {content.template === "memory_flash" && (
      <MemoryBreakdown
        details={result.details as MemoryDetails}
        userAnswer={userAnswer as Record<string, string>[]}
      />
    )}
  </div>
);

const ChoiceBreakdown = ({
  content,
  details,
  userAnswer,
}: {
  content: Extract<TaskContent, { template: "choice" }>;
  details: ChoiceDetails;
  userAnswer: string | null;
}) => {
  const text = (id: string | null) =>
    content.options.find((o) => o.id === id)?.text;
  return (
    <div className="rt-breakdown">
      <div
        className={`rt-result-row ${userAnswer === details.correct ? "is-right" : "is-wrong"}`}
      >
        <strong>Ваш ответ</strong>
        <span>
          {userAnswer ? text(userAnswer) : "Ответ не выбран (время вышло)"}
        </span>
      </div>
      {userAnswer !== details.correct && (
        <div className="rt-result-row is-right">
          <strong>Правильный ответ</strong>
          <span>{text(details.correct)}</span>
        </div>
      )}
      {details.explanation && (
        <p className="rt-explanation">{details.explanation}</p>
      )}
    </div>
  );
};

const ClassifyBreakdown = ({
  content,
  details,
  userAnswer,
}: {
  content: Extract<TaskContent, { template: "classify" }>;
  details: ClassifyDetails;
  userAnswer: Record<string, string>;
}) => {
  const label = (value: string | undefined) =>
    content.options.find((o) => o.value === value)?.label ?? "—";
  return (
    <ul className="rt-breakdown">
      {details.items.map((item) => (
        <li
          key={item.id}
          className={`rt-result-row ${item.correct ? "is-right" : "is-wrong"}`}
        >
          <strong>{item.text}</strong>
          <span>
            Ваш ответ: {label(userAnswer[item.id])}
            {!item.correct && ` · Правильно: ${label(item.right)}`}
          </span>
        </li>
      ))}
    </ul>
  );
};

const MemoryBreakdown = ({
  details,
  userAnswer,
}: {
  details: MemoryDetails;
  userAnswer: Record<string, string>[];
}) => (
  <div className="rt-breakdown">
    {details.rounds.map((round, i) => (
      <ul key={i} className="rt-breakdown-group">
        <li className="rt-group-title">Карточка {i + 1}</li>
        {round.questions.map((q) => (
          <li
            key={q.id}
            className={`rt-result-row ${q.correct ? "is-right" : "is-wrong"}`}
          >
            <strong>{q.label}</strong>
            <span>
              Ваш ответ: {userAnswer[i]?.[q.id] || "—"}
              {!q.correct && ` · Правильно: ${q.right}`}
            </span>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

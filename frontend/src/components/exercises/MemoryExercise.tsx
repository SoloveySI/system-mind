import { useRef, useState } from "react";
import type { MemoryContent } from "../../types/catalog";
import { useCountdown } from "../../hooks/useCountdown";

interface MemoryExerciseProps {
  content: MemoryContent;
  saving: boolean;
  onSubmit: (answer: Record<string, string>[], seconds: number) => void;
}

type Phase = "show" | "answer";

// Шаблон «Запомни и введи»: карточка показывается несколько секунд, затем нужно ввести данные
export const MemoryExercise = ({
  content,
  saving,
  onSubmit,
}: MemoryExerciseProps) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("show");
  const [answers, setAnswers] = useState<Record<string, string>[]>(() =>
    content.rounds.map(() => ({})),
  );
  const startedAt = useRef(Date.now());

  const round = content.rounds[roundIndex];
  const isLast = roundIndex === content.rounds.length - 1;
  const left = useCountdown(
    round.showSeconds,
    () => setPhase("answer"),
    phase === "show",
  );

  const setValue = (questionId: string, value: string) =>
    setAnswers((all) =>
      all.map((a, i) => (i === roundIndex ? { ...a, [questionId]: value } : a)),
    );

  const next = () => {
    if (!isLast) {
      setRoundIndex((i) => i + 1);
      setPhase("show");
      return;
    }
    onSubmit(answers, Math.round((Date.now() - startedAt.current) / 1000));
  };

  return (
    <div>
      <p className="rt-hint-text">
        Карточка {roundIndex + 1} из {content.rounds.length}
      </p>

      {phase === "show" ? (
        <>
          <div className="rt-flash">{round.card}</div>
          <div className="rt-timer">
            <div className="rt-timer-text">
              <span>Запоминайте</span>
              <span>{left} с</span>
            </div>
            <div className="rt-timer-bar">
              <span style={{ width: `${(left / round.showSeconds) * 100}%` }} />
            </div>
          </div>
          <button
            type="button"
            className="rt-btn rt-btn-ghost"
            onClick={() => setPhase("answer")}
          >
            Я запомнил, показать вопросы
          </button>
        </>
      ) : (
        <>
          <h2 className="rt-question">Что было на карточке?</h2>
          <div className="rt-fields">
            {round.questions.map((q, i) => (
              <label key={q.id} className="rt-field">
                <span>{q.label}</span>
                <input
                  type="text"
                  autoComplete="off"
                  autoFocus={i === 0}
                  value={answers[roundIndex][q.id] ?? ""}
                  disabled={saving}
                  onChange={(e) => setValue(q.id, e.target.value)}
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="rt-btn"
            disabled={saving}
            onClick={next}
          >
            {saving
              ? "Проверяем…"
              : isLast
                ? "Проверить"
                : "Следующая карточка"}
          </button>
        </>
      )}
    </div>
  );
};

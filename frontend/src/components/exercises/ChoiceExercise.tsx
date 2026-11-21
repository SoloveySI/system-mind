import { useRef, useState } from "react";
import type { ChoiceContent } from "../../types/catalog";
import { useCountdown } from "../../hooks/useCountdown";

interface ChoiceExerciseProps {
  content: ChoiceContent;
  saving: boolean;
  onSubmit: (answer: string | null, seconds: number) => void;
}

// Шаблон «Выбор ответа с таймером»: кейс (и таблица), вопрос и варианты
export const ChoiceExercise = ({
  content,
  saving,
  onSubmit,
}: ChoiceExerciseProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const sent = useRef(false);
  const limit = content.timeLimitSeconds ?? 60;

  const finish = (answer: string | null) => {
    if (sent.current) return;
    sent.current = true;
    onSubmit(answer, Math.round((Date.now() - startedAt.current) / 1000));
  };

  // Если время вышло, отправляем то, что успели выбрать (или пустой ответ)
  const left = useCountdown(limit, () => finish(selected));

  return (
    <div>
      <div className={`rt-timer ${left <= 10 ? "is-low" : ""}`}>
        <div className="rt-timer-text">
          <span>Осталось времени</span>
          <span>{left} с</span>
        </div>
        <div className="rt-timer-bar">
          <span style={{ width: `${(left / limit) * 100}%` }} />
        </div>
      </div>

      <div className="rt-case">{content.case}</div>

      {content.table && (
        <div className="rt-table-wrap">
          <table className="rt-table">
            <thead>
              <tr>
                {content.table.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="rt-question">{content.question}</h2>
      <div className="rt-options">
        {content.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`rt-option ${selected === o.id ? "is-active" : ""}`}
            aria-pressed={selected === o.id}
            disabled={saving}
            onClick={() => setSelected(o.id)}
          >
            {o.text}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="rt-btn"
        disabled={selected === null || saving}
        onClick={() => finish(selected)}
      >
        {saving ? "Проверяем…" : "Ответить"}
      </button>
    </div>
  );
};

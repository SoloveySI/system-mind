import { useEffect, useState } from "react";
import type { Exercise } from "../types/exercise";

interface ExerciseModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const ExerciseModal = ({ exercise, onClose }: ExerciseModalProps) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="rt-overlay" onClick={onClose}>
      <div
        className="rt-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="rt-close" aria-label="Закрыть" onClick={onClose}>
          ✕
        </button>
        <h2>{exercise.title}</h2>
        <div className="rt-case">{exercise.description}</div>

        {sent ? (
          <>
            <p>Вывод сохранён. Вернитесь к списку и возьмите следующий кейс.</p>
            <div className="rt-actions">
              <button className="rt-btn" onClick={onClose}>
                К практикумам
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="answer">Ваш вывод</label>
            <textarea
              id="answer"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Выпишите проверяемые факты и вывод, который из них следует"
            />
            {showHint && (
              <div className="rt-hint">
                <strong>Подсказка.</strong> Уберите оценочные слова и найдите
                пропущенное звено в рассуждении.
              </div>
            )}
            <div className="rt-actions">
              <button
                className="rt-btn rt-ghost"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? "Скрыть подсказку" : "Показать подсказку"}
              </button>
              <button
                className="rt-btn"
                disabled={!answer.trim()}
                onClick={() => setSent(true)}
              >
                Отправить вывод
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

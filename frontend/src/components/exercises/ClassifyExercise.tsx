import { useRef, useState } from "react";
import type { ClassifyContent } from "../../types/catalog";

interface ClassifyExerciseProps {
  content: ClassifyContent;
  saving: boolean;
  onSubmit: (answer: Record<string, string>, seconds: number) => void;
}

// Шаблон «Разметка»: у каждого предложения нужно выбрать одну из категорий
export const ClassifyExercise = ({
  content,
  saving,
  onSubmit,
}: ClassifyExerciseProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const startedAt = useRef(Date.now());
  const total = content.items.length;
  const answered = Object.keys(answers).length;

  return (
    <div>
      <p className="rt-hint-text">
        Отметьте каждое предложение. Размечено: {answered} из {total}.
      </p>

      <ul className="rt-sentences">
        {content.items.map((item) => (
          <li key={item.id} className="rt-sentence">
            <span>{item.text}</span>
            <div className="rt-choice-row">
              {content.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`rt-choice ${answers[item.id] === opt.value ? "is-active" : ""}`}
                  aria-pressed={answers[item.id] === opt.value}
                  disabled={saving}
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [item.id]: opt.value }))
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="rt-btn"
        disabled={answered < total || saving}
        onClick={() =>
          onSubmit(answers, Math.round((Date.now() - startedAt.current) / 1000))
        }
      >
        {saving ? "Проверяем…" : "Проверить"}
      </button>
    </div>
  );
};

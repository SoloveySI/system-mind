import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { SubmitResult, TaskDetail } from "../types/catalog";
import { fetchTask, submitAnswer } from "../services/catalogApi";
import { LEVELS } from "../utils/labels";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChoiceExercise } from "../components/exercises/ChoiceExercise";
import { ClassifyExercise } from "../components/exercises/ClassifyExercise";
import { MemoryExercise } from "../components/exercises/MemoryExercise";
import { ExerciseResult } from "../components/exercises/ExerciseResult";
import { ExerciseIntro } from "../components/exercises/ExerciseIntro";

type Phase = "intro" | "play" | "result";

export const TaskPage = () => {
  const { id } = useParams();
  const taskId = Number(id);

  const [task, setTask] = useState<TaskDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [userAnswer, setUserAnswer] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [attempt, setAttempt] = useState(0); // растёт при «Пройти ещё раз» и загружает новый текст
  const lastVariant = useRef<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!Number.isInteger(taskId) || taskId < 1) {
      setError("Некорректный номер упражнения");
      return;
    }

    let cancelled = false;
    setTask(null);
    setError(null);
    setPhase("intro");
    setResult(null);

    (async () => {
      try {
        let data = await fetchTask(taskId);
        // Чтобы «ещё раз» не показывал тот же текст, при совпадении просим другой
        if (
          attempt > 0 &&
          data.variantId &&
          data.variantId === lastVariant.current
        ) {
          data = await fetchTask(taskId);
        }
        if (cancelled) return;
        lastVariant.current = data.variantId;
        setTask(data);
      } catch {
        if (!cancelled)
          setError(
            "Не удалось загрузить упражнение. Проверьте, что сервер запущен.",
          );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [taskId, attempt]);

  const handleSubmit = async (answer: unknown, seconds: number) => {
    if (!task) return;
    setSaving(true);
    try {
      const res = await submitAnswer(task.id, {
        answer,
        variantId: task.variantId,
        timeSpentSeconds: seconds,
      });
      setUserAnswer(answer);
      setResult(res);
      setPhase("result");
    } catch {
      setError("Не удалось отправить ответ. Проверьте, что сервер запущен.");
    } finally {
      setSaving(false);
    }
  };

  const backTo = task?.categories ? `/blocks/${task.categories.slug}` : "/";

  return (
    <>
      <Header />
      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <Link className="rt-back" to={backTo}>
            {task?.categories ? "← К блоку" : "← Ко всем блокам"}
          </Link>

          {error && (
            <div className="rt-empty">
              <p>{error}</p>
              <button
                type="button"
                className="rt-btn"
                onClick={() => setAttempt((a) => a + 1)}
              >
                Попробовать снова
              </button>
            </div>
          )}
          {!error && !task && <p className="rt-empty">Загружаем упражнение…</p>}

          {!error && task && (
            <article className="rt-task">
              {task.categories && (
                <span className="rt-tag">{task.categories.title}</span>
              )}
              <h1>{task.title}</h1>
              {phase !== "result" && (
                <p className="rt-lead">{task.description}</p>
              )}
              {phase !== "result" && (
                <p className="rt-level rt-task-level">
                  Уровень: {LEVELS[task.difficulty ?? ""] ?? "не указан"}
                </p>
              )}

              <div className="rt-exercise">
                {phase === "intro" && (
                  <ExerciseIntro
                    content={task.content}
                    onStart={() => setPhase("play")}
                  />
                )}

                {phase === "play" && task.content.template === "choice" && (
                  <ChoiceExercise
                    key={`${task.id}-${task.variantId}-${attempt}`}
                    content={task.content}
                    saving={saving}
                    onSubmit={handleSubmit}
                  />
                )}
                {phase === "play" && task.content.template === "classify" && (
                  <ClassifyExercise
                    key={`${task.id}-${task.variantId}-${attempt}`}
                    content={task.content}
                    saving={saving}
                    onSubmit={handleSubmit}
                  />
                )}
                {phase === "play" &&
                  task.content.template === "memory_flash" && (
                    <MemoryExercise
                      key={`${task.id}-${task.variantId}-${attempt}`}
                      content={task.content}
                      saving={saving}
                      onSubmit={handleSubmit}
                    />
                  )}

                {phase === "result" && result && (
                  <>
                    <ExerciseResult
                      content={task.content}
                      result={result}
                      userAnswer={userAnswer}
                    />
                    <div className="rt-actions-row">
                      <button
                        type="button"
                        className="rt-btn"
                        onClick={() => setAttempt((a) => a + 1)}
                      >
                        Пройти ещё раз (другой текст)
                      </button>
                      <Link className="rt-btn rt-btn-ghost" to={backTo}>
                        К упражнениям блока
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { TaskDetail } from "../types/catalog";
import { fetchTask } from "../services/catalogApi";
import { LEVELS } from "../utils/labels";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const taskId = Number(id);
    if (!Number.isInteger(taskId) || taskId < 1) {
      setError("Некорректный номер упражнения");
      return;
    }

    let cancelled = false;
    fetchTask(taskId)
      .then((data) => {
        if (!cancelled) setTask(data);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить упражнение");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Header />
      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <Link className="rt-back" to="/">
            ← Ко всем блокам
          </Link>

          {error && <p className="rt-empty">{error}</p>}
          {!error && !task && <p className="rt-empty">Загружаем упражнение…</p>}

          {task && (
            <article className="rt-task">
              {task.categories && (
                <span className="rt-tag">{task.categories.title}</span>
              )}
              <h1>{task.title}</h1>
              <p className="rt-lead">{task.description}</p>
              <p className="rt-level rt-task-level">
                Уровень: {LEVELS[task.difficulty ?? ""] ?? "не указан"}
              </p>
              <p className="rt-empty">
                Экран выполнения упражнения появится на следующем шаге.
              </p>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

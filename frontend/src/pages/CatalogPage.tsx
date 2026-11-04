import { useState } from "react";
import type { Exercise } from "../types/exercise";
import { useExercises } from "../hooks/useExercises";
import { LEVELS } from "../utils/labels";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Pillars } from "../components/Pillars";
import { ExerciseCard } from "../components/ExerciseCard";
import { ExerciseModal } from "../components/ExerciseModal";
import { Footer } from "../components/Footer";

export const CatalogPage = () => {
  const { exercises, loading, offline } = useExercises();
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [filter, setFilter] = useState("ALL");

  const visible =
    filter === "ALL"
      ? exercises
      : exercises.filter((e) => e.difficulty === filter);

  return (
    <>
      <Header />
      <Hero />
      <Pillars />

      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <div className="rt-head" id="practicums">
            <h2>
              Практикумы<span>{visible.length}</span>
            </h2>
            <div className="rt-chips">
              {[["ALL", "Все"], ...Object.entries(LEVELS)].map(
                ([key, label]) => (
                  <button
                    key={key}
                    className="rt-chip"
                    aria-pressed={filter === key}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>

          {offline && (
            <p className="rt-empty" style={{ marginBottom: 24 }}>
              Сервер недоступен, показаны примеры упражнений.
            </p>
          )}

          <div className="rt-grid">
            {!loading && visible.length === 0 && (
              <div className="rt-empty">
                На этом уровне пока нет практикумов. Выберите другой.
              </div>
            )}
            {visible.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {selected && (
        <ExerciseModal
          key={selected.id}
          exercise={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

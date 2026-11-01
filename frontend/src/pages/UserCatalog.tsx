import React, { useEffect, useState } from "react";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category?: string;
}

interface UserCatalogProps {
  exercises: Exercise[];
}

const LEVELS: Record<string, string> = {
  EASY: "Базовый",
  MEDIUM: "Продвинутый",
  HARD: "Сложный",
};

const CATEGORIES: Record<string, string> = {
  LOGIC: "Логика",
  STATISTICS: "Данные",
  DECISION: "Решения",
};

export const UserCatalog: React.FC<UserCatalogProps> = ({ exercises }) => {
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sent, setSent] = useState(false);
  const [filter, setFilter] = useState("ALL");

  // Закрытие по Escape и блокировка скролла фона при открытой модалке
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const open = (ex: Exercise) => {
    setSelected(ex);
    setAnswer("");
    setShowHint(false);
    setSent(false);
  };

  const visible =
    filter === "ALL"
      ? exercises
      : exercises.filter((e) => e.difficulty === filter);

  return (
    <>
      <header className="rt-header">
        <div className="rt-wrap">
          <a className="rt-logo" href="#top">
            <span className="rt-logo-mark">R</span>Ratium
          </a>
          <nav className="rt-nav">
            <a href="#top">Главная</a>
            <a href="#practicums">Практикумы</a>
          </nav>
        </div>
      </header>

      <section className="rt-hero" id="top">
        <div className="rt-wrap">
          <h1>
            Факты отдельно.
            <em>Шум отдельно.</em>
          </h1>
          <p className="rt-lead">
            Практикумы по аналитическому мышлению: читаете кейс, отсекаете
            оценки, оставляете только проверяемое и делаете вывод.
          </p>
          <a className="rt-cta" href="#practicums">
            Выбрать практикум
          </a>
        </div>
      </section>

      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <div className="rt-head" id="practicums">
            <h2>
              Практикумы<span>{visible.length}</span>
            </h2>
            <div
              className="rt-chips"
              role="tablist"
              aria-label="Фильтр сложности"
            >
              {[["ALL", "Все"], ...Object.entries(LEVELS)].map(([k, l]) => (
                <button
                  key={k}
                  className="rt-chip"
                  aria-pressed={filter === k}
                  onClick={() => setFilter(k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="rt-grid">
            {visible.length === 0 && (
              <div className="rt-empty">
                На этом уровне пока нет практикумов. Выберите другой.
              </div>
            )}
            {visible.map((ex) => (
              <article key={ex.id} className="rt-card">
                <div className="rt-card-top">
                  {ex.category ? (
                    <span className="rt-tag">
                      {CATEGORIES[ex.category] ?? ex.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className={`rt-level rt-lv-${ex.difficulty}`}>
                    <i />
                    {LEVELS[ex.difficulty] ?? ex.difficulty}
                  </span>
                </div>
                <h3>{ex.title}</h3>
                <p>{ex.description}</p>
                <button className="rt-btn" onClick={() => open(ex)}>
                  Разобрать кейс
                </button>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className="rt-footer">
        <div className="rt-wrap">
          <div className="rt-footer-grid">
            <div>
              <a className="rt-logo" href="#top">
                <span className="rt-logo-mark">R</span>Ratium
              </a>
              <p>
                Тренажёр аналитического мышления: факты, логика и работа с
                данными.
              </p>
            </div>
            <nav className="rt-footer-nav">
              <a href="#top">Наверх</a>
              <a href="#practicums">Практикумы</a>
            </nav>
          </div>
          <div className="rt-copy">© {new Date().getFullYear()} Ratium</div>
        </div>
      </footer>

      {selected && (
        <div className="rt-overlay" onClick={() => setSelected(null)}>
          <div
            className="rt-dialog"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="rt-close"
              aria-label="Закрыть"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <h2>{selected.title}</h2>
            <div className="rt-case">{selected.description}</div>
            {sent ? (
              <>
                <p style={{ marginBottom: "20px" }}>
                  Вывод сохранён. Вернитесь к списку и возьмите следующий кейс.
                </p>
                <div className="rt-actions">
                  <button className="rt-btn" onClick={() => setSelected(null)}>
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
                    <strong>Подсказка.</strong> Уберите оценочные слова и
                    найдите пропущенное звено в рассуждении.
                  </div>
                )}
                <div className="rt-actions">
                  <button
                    type="button"
                    className="rt-btn rt-ghost"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? "Скрыть подсказку" : "Показать подсказку"}
                  </button>
                  <button
                    type="button"
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
      )}
    </>
  );
};

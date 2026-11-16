import { Link, useParams } from "react-router-dom";
import { useBlocks } from "../hooks/useBlocks";
import { LEVELS } from "../utils/labels";
import { plural } from "../utils/plural";
import { Header } from "../components/Header";
import { Reveal } from "../components/Reveal";
import { Footer } from "../components/Footer";

export const BlockPage = () => {
  const { slug } = useParams();
  const { blocks, loading, error } = useBlocks();

  const index = blocks.findIndex((b) => b.slug === slug);
  const block = index >= 0 ? blocks[index] : null;

  return (
    <>
      <Header />
      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <Link className="rt-back" to="/">
            ← Ко всем блокам
          </Link>

          {loading && <p className="rt-empty">Загружаем блок…</p>}
          {error && <p className="rt-empty">{error}</p>}
          {!loading && !error && !block && (
            <p className="rt-empty">Такого блока нет.</p>
          )}

          {block && (
            <>
              <div className={`rt-block-head rt-tone-${index % 4}`}>
                {" "}
                <span className="rt-block-num">Блок {index + 1}</span>
                <h1>{block.title}</h1>
                {block.description && (
                  <p className="rt-lead">{block.description}</p>
                )}
                <p className="rt-block-count">
                  {block.tasks.length}{" "}
                  {plural(block.tasks.length, [
                    "упражнение",
                    "упражнения",
                    "упражнений",
                  ])}
                </p>
              </div>

              {block.tasks.length === 0 && (
                <p className="rt-empty">В этом блоке пока нет упражнений.</p>
              )}

              <div className="rt-task-rows">
                {block.tasks.map((task, i) => (
                  <Reveal key={task.id} delay={Math.min(i, 4) * 70}>
                    <Link className="rt-task-row" to={`/tasks/${task.id}`}>
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                      </div>
                      <span className={`rt-level rt-lv-${task.difficulty}`}>
                        <i />
                        {LEVELS[task.difficulty ?? ""] ?? ""}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

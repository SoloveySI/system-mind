import { useBlocks } from "../hooks/useBlocks";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { BlockCard } from "../components/BlockCard";
import { Reveal } from "../components/Reveal";
import { Footer } from "../components/Footer";

export const DashboardPage = () => {
  const { blocks, loading, error } = useBlocks();

  return (
    <>
      <Header />
      <Hero />

      <main className="rt-main rt-section">
        <div className="rt-wrap">
          <div className="rt-head" id="blocks">
            <h2>Блоки упражнений </h2>
          </div>

          {loading && <p className="rt-empty">Загружаем блоки…</p>}
          {error && <p className="rt-empty">{error}</p>}
          {!loading && !error && blocks.length === 0 && (
            <p className="rt-empty">Блоков пока нет.</p>
          )}

          <div className="rt-blocks-grid">
            {blocks.map((block, i) => (
              <Reveal key={block.id} delay={(i % 2) * 120}>
                <BlockCard block={block} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

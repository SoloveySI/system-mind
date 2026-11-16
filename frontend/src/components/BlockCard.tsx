import { Link } from "react-router-dom";
import type { Block } from "../types/catalog";
import { plural } from "../utils/plural";

interface BlockCardProps {
  block: Block;
  index: number;
}

// Плитка блока целиком является ссылкой на страницу со всеми упражнениями блока
export const BlockCard = ({ block, index }: BlockCardProps) => {
  const count = block.tasks.length;

  return (
    <Link
      className={`rt-block rt-tone-${index % 4}`}
      to={`/blocks/${block.slug}`}
    >
      <span className="rt-block-num">{String(index + 1).padStart(2, "0")}</span>
      <h3>{block.title}</h3>
      {block.description && <p>{block.description}</p>}
      <div className="rt-block-foot">
        <span>
          {count} {plural(count, ["упражнение", "упражнения", "упражнений"])}
        </span>
        <span className="rt-block-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
};

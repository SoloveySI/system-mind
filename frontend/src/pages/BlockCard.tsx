import { Link } from "react-router-dom";
import type { Block } from "../types/catalog";
import { LEVELS } from "../utils/labels";
import { plural } from "../utils/plural";

const PREVIEW_COUNT = 3;

interface BlockCardProps {
  block: Block;
  index: number;
}

export const BlockCard = ({ block, index }: BlockCardProps) => {
  const preview = block.tasks.slice(0, PREVIEW_COUNT);
  const rest = block.tasks.length - preview.length;
  const count = block.tasks.length;

  return (
    <article className="rt-block">
      <div className="rt-block-top">
        <span className="rt-block-num">Блок {index + 1}</span>
        <span className="rt-block-count">
          {count} {plural(count, ["упражнение", "упражнения", "упражнений"])}
        </span>
      </div>
      <h3>{block.title}</h3>
      {block.description && <p>{block.description}</p>}

      <ul className="rt-task-list">
        {preview.map((task) => (
          <li key={task.id}>
            <Link className="rt-task-link" to={`/tasks/${task.id}`}>
              <span>{task.title}</span>
              <span className={`rt-level rt-lv-${task.difficulty}`}>
                <i />
                {LEVELS[task.difficulty ?? ""] ?? ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {rest > 0 && <p className="rt-block-rest">и ещё {rest}</p>}

      <Link className="rt-block-open" to={`/blocks/${block.slug}`}>
        Открыть блок →
      </Link>
    </article>
  );
};

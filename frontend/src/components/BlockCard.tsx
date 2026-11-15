import { Link } from "react-router-dom";
import type { Block } from "../types/catalog";
import { LEVELS } from "../utils/labels";

interface BlockCardProps {
  block: Block;
  index: number;
}

export const BlockCard = ({ block, index }: BlockCardProps) => (
  <article className="rt-block">
    <span className="rt-block-num">Блок {index + 1}</span>
    <h3>{block.title}</h3>
    {block.description && <p>{block.description}</p>}
    <ul className="rt-task-list">
      {block.tasks.map((task) => (
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
  </article>
);

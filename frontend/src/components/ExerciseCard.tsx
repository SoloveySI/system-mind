import type { Exercise } from "../types/exercise";
import { CATEGORIES, LEVELS } from "../utils/labels";

interface ExerciseCardProps {
  exercise: Exercise;
  onOpen: (exercise: Exercise) => void;
}

export const ExerciseCard = ({ exercise, onOpen }: ExerciseCardProps) => (
  <article className="rt-card">
    <div className="rt-card-top">
      {exercise.category ? (
        <span className="rt-tag">
          {CATEGORIES[exercise.category] ?? exercise.category}
        </span>
      ) : (
        <span />
      )}
      <span className={`rt-level rt-lv-${exercise.difficulty}`}>
        <i />
        {LEVELS[exercise.difficulty] ?? exercise.difficulty}
      </span>
    </div>
    <h3>{exercise.title}</h3>
    <p>{exercise.description}</p>
    <button className="rt-btn" onClick={() => onOpen(exercise)}>
      Разобрать кейс
    </button>
  </article>
);

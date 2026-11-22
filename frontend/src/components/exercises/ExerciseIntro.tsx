import type { TaskContent } from "../../types/catalog";
import { plural } from "../../utils/plural";

interface ExerciseIntroProps {
  content: TaskContent;
  onStart: () => void;
}

// Правила упражнения по шаблону: что покажут, что нужно сделать и сколько времени дано
function getRules(content: TaskContent): string[] {
  switch (content.template) {
    case "choice": {
      const limit = content.timeLimitSeconds ?? 60;
      const seconds = plural(limit, ["секунда", "секунды", "секунд"]);
      return [
        content.table
          ? "Вы увидите короткий кейс и таблицу с данными."
          : "Вы увидите короткий кейс.",
        "Под ним будет вопрос и несколько вариантов ответа: выберите один.",
        `На ответ даётся ${limit} ${seconds}. Таймер запустится, когда вы нажмёте «Начать».`,
        "Если время выйдет, ответ отправится автоматически (с тем вариантом, который вы успели выбрать).",
      ];
    }
    case "classify": {
      const n = content.items.length;
      return [
        `Вы увидите ${n} ${plural(n, ["предложение", "предложения", "предложений"])}.`,
        "Отметьте каждое: это факт (то, что можно проверить) или мнение (оценка, предположение).",
        "Ограничения по времени нет: можно спокойно подумать.",
        "Кнопка «Проверить» включится, когда будут размечены все предложения.",
      ];
    }
    case "memory_flash": {
      const n = content.rounds.length;
      const sec = content.rounds[0]?.showSeconds ?? 7;
      return [
        `Вам покажут ${n} ${plural(n, ["карточку", "карточки", "карточек"])} с данными: номера, суммы, названия.`,
        `Каждая видна около ${sec} ${plural(sec, ["секунды", "секунд", "секунд"])}, потом исчезнет.`,
        "Когда карточка пропадёт, нужно ввести то, что запомнили. Если запомнили раньше, нажмите «Я запомнил».",
        "Регистр букв и пробелы не важны.",
      ];
    }
  }
}

// Экран перед упражнением: сначала человек читает правила, потом сам нажимает «Начать»
export const ExerciseIntro = ({ content, onStart }: ExerciseIntroProps) => (
  <div className="rt-intro">
    <h2 className="rt-intro-title">Что нужно сделать</h2>
    <ol className="rt-rules">
      {getRules(content).map((rule) => (
        <li key={rule}>{rule}</li>
      ))}
    </ol>
    <p className="rt-hint-text">
      Когда будете готовы, нажмите кнопку: упражнение и таймер начнутся сразу.
    </p>
    <button type="button" className="rt-btn" onClick={onStart}>
      Начать упражнение
    </button>
  </div>
);

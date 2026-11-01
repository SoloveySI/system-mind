import { useEffect, useState } from "react";
import { UserCatalog, type Exercise } from "./pages/UserCatalog";

const INITIAL_EXERCISES: Exercise[] = [
  {
    id: "1",
    title: "Деконструкция аргументов",
    description:
      "Разделите тезис на объективные факты и субъективные суждения автора. Найдите пропущенную предпосылку.",
    difficulty: "EASY",
    category: "LOGIC",
  },
  {
    id: "2",
    title: "Анализ каузальности (5 Why)",
    description:
      "Исследуйте аномалию в данных и определите фундаментальную причину отклонения.",
    difficulty: "MEDIUM",
    category: "STATISTICS",
  },
];

export default function App() {
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/exercises");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setExercises(data);
        }
      } catch (err) {
        console.warn("Ratium: работаем на локальных данных:", err);
      }
    })();
  }, []);

  return <UserCatalog exercises={exercises} />;
}

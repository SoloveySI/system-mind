import { useEffect, useState } from "react";
import "./App.css";

// Описываем интерфейс для упражнения
interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
}

function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");

  // Функция для загрузки упражнений с бэкенда
  const fetchExercises = async () => {
    try {
      const response = await fetch("http://localhost:5000/exercises");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Ошибка при загрузке упражнений:", error);
    }
  };

  // Загружаем упражнения при монтировании компонента
  useEffect(() => {
    fetchExercises();
  }, []);

  // Функция для создания нового упражнения
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, difficulty }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        fetchExercises(); // Обновляем список
      } else {
        alert("Ошибка при создании упражнения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Аналитическое мышление: Упражнения</h1>

      {/* Форма добавления */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Название упражнения"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="EASY">Легкий</option>
          <option value="MEDIUM">Средний</option>
          <option value="HARD">Сложный</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Добавить упражнение
        </button>
      </form>

      <hr />

      {/* Список упражнений */}
      <h2>Список заданий</h2>
      {exercises.length === 0 ? (
        <p>Пока нет добавленных упражнений.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {exercises.map((ex) => (
            <li
              key={ex.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{ex.title}</h3>
              <p>{ex.description}</p>
              <small>
                Сложность: <b>{ex.difficulty}</b>
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

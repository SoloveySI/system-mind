import logicImg from "../assets/logic.svg";
import dataImg from "../assets/data.svg";
import decisionImg from "../assets/decision.svg";

const PILLARS = [
  {
    title: "Логика",
    text: "Находите скрытые предпосылки и ошибки в рассуждениях.",
    img: logicImg,
  },
  {
    title: "Данные",
    text: "Отличайте факты от оценок и ищите причины отклонений.",
    img: dataImg,
  },
  {
    title: "Решения",
    text: "Взвешивайте варианты и делайте выводы, которые можно обосновать.",
    img: decisionImg,
  },
];

export const Pillars = () => (
  <section className="rt-pillars" id="how">
    <div className="rt-wrap">
      <h2 className="rt-sec-title">Что вы тренируете</h2>
      <p className="rt-sec-sub">
        Упражнения собраны по направлениям. Каждое отрабатывает свой навык на
        коротком практическом задании.
      </p>
      <div className="rt-pillars-grid">
        {PILLARS.map((p) => (
          <div key={p.title} className="rt-pillar">
            <img className="rt-pillar-img" src={p.img} alt="" />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

import lensImg from "../assets/lens.svg";

export const Hero = () => (
  <section className="rt-hero" id="top">
    <div className="rt-wrap rt-hero-grid">
      <div>
        <h1>
          Тренируйте
          <em>аналитическое мышление</em>
        </h1>
        <p className="rt-lead">
          Короткие практические упражнения на память, критическое мышление,
          работу с данными и дедукцию. Выбирайте направление и развивайте навык
          шаг за шагом.
        </p>
        <div className="rt-cta-row">
          <a className="rt-cta" href="#practicums">
            Выбрать практикум
          </a>
          <a className="rt-cta rt-outline" href="#how">
            Как это работает
          </a>
        </div>
      </div>
      <div className="rt-visual">
        <img src={lensImg} alt="Лупа выделяет факты среди оценок" />
      </div>
    </div>
  </section>
);

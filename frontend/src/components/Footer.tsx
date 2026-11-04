import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="rt-footer">
    <div className="rt-wrap">
      <div className="rt-footer-grid">
        <div className="rt-footer-brand">
          <Logo />
          <p>
            Тренажёр аналитического мышления: короткие практические упражнения
            на логику, данные и принятие решений.
          </p>
        </div>
        <div>
          <h4>Платформа</h4>
          <ul>
            <li>
              <a href="#top">Главная</a>
            </li>
            <li>
              <a href="#how">Как это работает</a>
            </li>
            <li>
              <a href="#practicums">Практикумы</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Направления</h4>
          <ul>
            <li>Логика</li>
            <li>Данные</li>
            <li>Решения</li>
          </ul>
        </div>
      </div>
      <div className="rt-copy">
        <span>© {new Date().getFullYear()} Ratium</span>
        <span>Тренажёр аналитического мышления</span>
      </div>
    </div>
  </footer>
);

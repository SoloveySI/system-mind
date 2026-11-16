import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="rt-footer">
    <div className="rt-wrap">
      <div className="rt-footer-grid">
        <div className="rt-footer-brand">
          <Logo />
          <p>
            Тренажёр аналитического мышления: короткие практические упражнения
            на память, критическое мышление и работу с данными.
          </p>
        </div>
        <div>
          <h4>Разделы</h4>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <a href="/#blocks">Блоки упражнений</a>
            </li>
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

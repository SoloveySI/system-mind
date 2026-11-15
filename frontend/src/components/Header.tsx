import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Header = () => (
  <header className="rt-header">
    <div className="rt-wrap">
      <Logo tagline />
      <nav className="rt-nav">
        <Link to="/">Главная</Link>
        <a href="/#blocks">Блоки упражнений</a>
      </nav>
    </div>
  </header>
);

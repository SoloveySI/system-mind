import { Logo } from "./Logo";

export const Header = () => (
  <header className="rt-header">
    <div className="rt-wrap">
      <Logo tagline />
      <nav className="rt-nav">
        <a href="#top">Главная</a>
        <a href="#how">Как это работает</a>
        <a href="#practicums">Практикумы</a>
      </nav>
    </div>
  </header>
);

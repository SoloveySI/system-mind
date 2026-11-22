import { Link } from "react-router-dom";

interface LogoProps {
  tagline?: boolean;
}

export const Logo = ({ tagline = false }: LogoProps) => (
  <Link className={tagline ? "rt-logo" : "rt-logo rt-logo--solo"} to="/">
    <span className="rt-logo-mark">L</span>
    <span className="rt-logo-name">Logia</span>
    {tagline && (
      <small className="rt-logo-tag">
        тренажёр системного и аналитического мышления
      </small>
    )}
  </Link>
);

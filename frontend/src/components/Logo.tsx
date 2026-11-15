import { Link } from "react-router-dom";

interface LogoProps {
  tagline?: boolean;
}

export const Logo = ({ tagline = false }: LogoProps) => (
  <Link className="rt-logo" to="/">
    <span className="rt-logo-mark">R</span>
    <span className="rt-logo-text">
      Ratium
      {tagline && <small>тренажёр аналитического мышления</small>}
    </span>
  </Link>
);

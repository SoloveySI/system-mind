import { Link } from "react-router-dom";

interface LogoProps {
  tagline?: boolean;
}

export const Logo = ({ tagline = false }: LogoProps) => (
  <Link className={tagline ? "rt-logo" : "rt-logo rt-logo--solo"} to="/">
    <span className="rt-logo-mark">R</span>
    <span className="rt-logo-name">Ratium</span>
    {tagline && (
      <small className="rt-logo-tag">тренажёр аналитического мышления</small>
    )}
  </Link>
);

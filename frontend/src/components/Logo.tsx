interface LogoProps {
  tagline?: boolean;
}

export const Logo = ({ tagline = false }: LogoProps) => (
  <a className="rt-logo" href="#top">
    <span className="rt-logo-mark">R</span>
    <span className="rt-logo-text">
      Ratium
      {tagline && <small>тренажёр аналитического мышления</small>}
    </span>
  </a>
);

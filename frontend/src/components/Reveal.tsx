import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number; // задержка появления в миллисекундах
  className?: string;
}

// Плавно показывает содержимое, когда оно доезжает до экрана
export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rt-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

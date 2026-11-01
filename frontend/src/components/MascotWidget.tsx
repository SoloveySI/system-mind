import React from "react";

interface MascotWidgetProps {
  mascotId?: string;
  name?: string;
  quote?: string;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({
  mascotId = "prof-racio",
  name = "Проф. Рацио",
  quote = "«Разбираем суть»",
}) => {
  return (
    <div
      style={{
        backgroundColor: "#eae1d6",
        borderRadius: "16px",
        padding: "16px",
        textAlign: "center",
        border: "1px solid #c8bebd",
        boxShadow: "4px 4px 0px #1c1917",
      }}
    >
      {/* Здесь рендерится выбранный персонаж (позже здесь будет смена аватарок/магазин) */}
      <svg
        width="65"
        height="65"
        viewBox="0 0 100 100"
        style={{ margin: "0 auto", display: "block" }}
      >
        <polygon points="20,70 25,25 45,45" fill="#1c1917" />
        <polygon points="80,70 75,25 55,45" fill="#1c1917" />
        <circle cx="50" cy="55" r="30" fill="#1c1917" />
        <circle cx="50" cy="62" r="16" fill="#fcf9f5" />
        <polygon points="47,56 53,56 50,60" fill="#8c2e2b" />
        <circle
          cx="38"
          cy="50"
          r="11"
          fill="none"
          stroke="#8c2e2b"
          strokeWidth="3"
        />
        <circle
          cx="62"
          cy="50"
          r="11"
          fill="none"
          stroke="#8c2e2b"
          strokeWidth="3"
        />
        <line
          x1="49"
          y1="50"
          x2="51"
          y2="50"
          stroke="#8c2e2b"
          strokeWidth="3"
        />
        <circle cx="38" cy="50" r="3" fill="#1c1917" />
        <circle cx="62" cy="50" r="3" fill="#1c1917" />
      </svg>
      <div
        style={{
          fontFamily: "Georgia",
          fontStyle: "italic",
          fontWeight: "bold",
          marginTop: "6px",
          fontSize: "0.9rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "#2b5c8f",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        {quote}
      </div>
    </div>
  );
};

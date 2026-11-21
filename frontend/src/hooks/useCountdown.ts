import { useEffect, useRef, useState } from "react";

// Обратный отсчёт в секундах. Когда время вышло, один раз вызывается onExpire.
// Отсчёт запускается заново, если меняется totalSeconds или active.
export function useCountdown(
  totalSeconds: number,
  onExpire: () => void,
  active = true,
) {
  const [left, setLeft] = useState(totalSeconds);
  const expireRef = useRef(onExpire);

  useEffect(() => {
    expireRef.current = onExpire;
  });

  useEffect(() => {
    setLeft(totalSeconds);
    if (!active) return;

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const remaining = Math.max(
        0,
        totalSeconds - Math.floor((Date.now() - startedAt) / 1000),
      );
      setLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        expireRef.current();
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [totalSeconds, active]);

  return left;
}

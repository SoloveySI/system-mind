import { useEffect, useState } from "react";
import type { Block } from "../types/catalog";
import { fetchBlocks } from "../services/catalogApi";

export function useBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchBlocks()
      .then((data) => {
        if (!cancelled) setBlocks(data);
      })
      .catch((err) => {
        console.warn("Ratium: не удалось загрузить блоки:", err);
        if (!cancelled)
          setError(
            "Не удалось загрузить блоки. Проверьте, что сервер запущен.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { blocks, loading, error };
}

import { useEffect, useState } from "react";
import type { Exercise } from "../types/exercise";
import { fetchExercises } from "../services/exercisesApi";
import { SAMPLE_EXERCISES } from "../data/sampleExercises";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(SAMPLE_EXERCISES);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchExercises()
      .then((data) => {
        if (cancelled) return;
        if (data.length > 0) setExercises(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn(
          "Ratium: сервер недоступен, показаны запасные данные:",
          err,
        );
        setOffline(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { exercises, loading, offline };
}

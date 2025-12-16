import { useCallback, useEffect, useState } from "react";
import type { ITripItem } from "../types";

const STORAGE_KEY = "bardiner_trip_progress_v1";

const DEFAULT: ITripItem = {
  country: false,
  planning: false,
  tripDay: false,
  hotel: false,
  dayPlanning: false,
  finish: false,
};

export function useTripProgress() {
  const [completed, setCompleted] = useState<ITripItem>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? { ...DEFAULT, ...(JSON.parse(raw) as Partial<ITripItem>) }
        : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  const setStepCompleted = useCallback((patch: Partial<ITripItem>) => {
    setCompleted((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setCompleted(DEFAULT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const isStepReachable = useCallback(
    (index: number, items: { key: keyof ITripItem }[]) => {
      if (index === 0) return true;
      const prevKey = items[index - 1].key as keyof ITripItem;
      return Boolean(completed[prevKey]);
    },
    [completed]
  );

  return { completed, setStepCompleted, reset, isStepReachable };
}

import { useEffect, useState } from "react";

export const useDebounce = <T>(text: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(text);
  useEffect(() => {
    let handler = setTimeout(() => {
      setDebouncedValue(text);
    });
    return () => clearTimeout(handler);
  }, [text, delay]);
  return debouncedValue;
};

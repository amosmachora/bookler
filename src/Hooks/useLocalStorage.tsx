import { useState, useEffect } from "react";

function getSavedValue<T>(key: string, initialValue: T): T {
  const savedValue: string | null = localStorage.getItem(key);
  if (savedValue) {
    return JSON.parse(savedValue);
  }

  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export function useLocalStorage<T>(initialValue: T, key: string) {
  const [value, setValue] = useState<T>(() =>
    getSavedValue<T>(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
}

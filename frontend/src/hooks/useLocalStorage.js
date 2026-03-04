import { useState, useCallback } from "react";

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Handles JSON serialization, corrupted data, and quota errors.
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (err) {
          console.warn(`[useLocalStorage] Failed to write "${key}":`, err);
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

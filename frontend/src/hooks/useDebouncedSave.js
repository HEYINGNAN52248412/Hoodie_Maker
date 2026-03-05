import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Keyed debounce hook — each key (project ID) gets its own independent timer
 * so switching projects doesn't lose pending saves.
 */
export default function useDebouncedSave(saveFn, delay = 1000) {
  const [saveStatus, setSaveStatus] = useState("idle");
  const timersRef = useRef(new Map());
  const pendingRef = useRef(new Map());
  const saveFnRef = useRef(saveFn);
  saveFnRef.current = saveFn;

  const flush = useCallback(async (key) => {
    const timer = timersRef.current.get(key);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(key);

    const data = pendingRef.current.get(key);
    if (!data) return;
    pendingRef.current.delete(key);

    setSaveStatus("saving");
    try {
      await saveFnRef.current(data);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, []);

  const requestSave = useCallback(
    (key, data) => {
      pendingRef.current.set(key, data);
      setSaveStatus("saving");

      const existing = timersRef.current.get(key);
      if (existing) clearTimeout(existing);

      const timer = setTimeout(() => {
        flush(key);
      }, delay);
      timersRef.current.set(key, timer);
    },
    [delay, flush]
  );

  const flushAll = useCallback(() => {
    const keys = [...pendingRef.current.keys()];
    return Promise.all(keys.map((key) => flush(key)));
  }, [flush]);

  // On unmount: fire-and-forget flush of all pending saves
  useEffect(() => {
    return () => {
      for (const timer of timersRef.current.values()) clearTimeout(timer);
      // Fire-and-forget — we can't await in a cleanup function
      const keys = [...pendingRef.current.keys()];
      for (const key of keys) {
        const data = pendingRef.current.get(key);
        if (data) saveFnRef.current(data).catch(() => {});
      }
    };
  }, []);

  return { requestSave, saveStatus, flushAll };
}

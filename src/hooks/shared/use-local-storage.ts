import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string | null) {
  // ===== State =====
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    if (typeof window === "undefined") return initialValue;

    // get from local storage
    return window.localStorage.getItem(key) || initialValue;
  });

  // ===== Set Value =====
  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  // ===== Remove Value =====
  const removeValue = () => {
    setStoredValue(null);
    window.localStorage.removeItem(key);
  };

  // ===== Sync between tabs =====
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) setStoredValue(e.newValue);

      if (e.key === key && e.newValue === null) setStoredValue(initialValue);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return { storedValue, setValue, removeValue } as const;
}

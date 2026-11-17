import { useEffect, useState } from "react";

export default function useLocalStorage(key: any, initialValue: any) {
  const readValue = () => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [key, value]);

  useEffect(() => {
    const onStorage = (e: any) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {
          /* ignorar */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, setValue];
}
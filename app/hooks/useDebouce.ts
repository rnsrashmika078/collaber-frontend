/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export const useDebounce = (data: {
  delay: number;
  text: string;
  enable: boolean;
}) => {
  const [debounced, setDebounced] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(data.text);
    }, data.delay);
    return () => clearTimeout(timeout);
  }, [data.text, data.delay]);
  if (!data.enable) return null;

  return debounced;
};

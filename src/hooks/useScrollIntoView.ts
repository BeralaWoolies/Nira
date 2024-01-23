import { useCallback } from "react";

export default function useScrollIntoView<T extends Element>() {
  return useCallback((ref: T | null) => {
    ref?.scrollIntoView({ behavior: "smooth" });
  }, []);
}

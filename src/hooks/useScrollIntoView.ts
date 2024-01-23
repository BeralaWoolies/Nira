import { useCallback } from "react";

export default function useScrollIntoView() {
  return useCallback((ref: Element | null) => {
    ref?.scrollIntoView();
  }, []);
}

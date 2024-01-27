import { useCallback, useRef } from "react";

type UseSubmitOnKeyReturnType = [React.RefObject<HTMLFormElement>, React.KeyboardEventHandler];

export default function useSubmitOnKey<K extends KeyboardEvent["key"]>(
  key: K = "Enter" as K
): UseSubmitOnKeyReturnType {
  const ref = useRef<HTMLFormElement>(null);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault();
        ref?.current?.requestSubmit();
      }
    },
    [key]
  );

  return [ref, onKeyDown];
}

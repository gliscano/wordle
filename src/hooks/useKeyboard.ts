import { useEffect } from "react";

export function useKeyboard(eventName: keyof WindowEventMap, onKeyPressReal: any) {
  useEffect(() => {
    window.addEventListener(eventName, (event) => onKeyPressReal(event.target));

    return () => {
      window.removeEventListener(eventName, onKeyPressReal);
    };
  });
}
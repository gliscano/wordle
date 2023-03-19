import { useEffect } from "react";

interface KeyDownProps {
  eventName: string,
  onKeyPress: (eventName: string) => void
}

export function useKeyboard ({eventName, onKeyPress}: KeyDownProps) {

  const getKey = (event: KeyboardEvent | any) => {   
    if (event.target && event.key) {
      const { keyCode } = event;

      if ((keyCode >= 65 && keyCode <= 90) || keyCode === 192 ||  keyCode === 8 || keyCode === 13) {
        onKeyPress(event.key);
      }
    }
  };

  useEffect(() => {
    document.addEventListener(eventName, getKey);

    return () => {
      document.removeEventListener(eventName, getKey);
    };
  });
}
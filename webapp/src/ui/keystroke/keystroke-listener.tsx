import { useKeystrokeStore } from "@/lib/store/keystroke-store";
import { useEffect } from "react";

function KeystrokeListener() {
  const { keyDown, keyUp, reset } = useKeystrokeStore();

  function handleKeyDown(e: KeyboardEvent) {
    keyDown(e.key);
  }

  function handleKeyUp(e: KeyboardEvent) {
    keyUp(e.key);
  }

  function handleBlur() {
    reset();
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  return null;
}

export default KeystrokeListener;

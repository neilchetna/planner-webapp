import { useEffect } from "react";
import { useKeystrokeStore } from "../store";

export type KeystrokeMap = {
  keys: string[];
  onPress: () => void;
};

type Props = {
  keysMap: KeystrokeMap[];
};

export function useKeystroke({ keysMap = [] }: Props) {
  const pressedKeys = useKeystrokeStore((s) => s.pressedKeys);

  function handleKeypress() {
    keysMap.forEach(({ keys, onPress }) => {
      const isPressed = keys.every((key) => pressedKeys.has(key));
      if (isPressed) onPress();
    });
  }

  useEffect(() => {
    handleKeypress();
  }, [pressedKeys]);
}

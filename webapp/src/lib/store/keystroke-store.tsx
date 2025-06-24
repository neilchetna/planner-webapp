import { create } from "zustand";

type State = {
  pressedKeys: Set<string>;
};

type Action = {
  keyDown: (key: string) => void;
  keyUp: (key: string) => void;
  reset: () => void;
};

export const useKeystrokeStore = create<State & Action>(set => ({
  pressedKeys: new Set(),
  keyDown: (key: string) =>
    set(state => {
      const newSet = new Set(state.pressedKeys);
      newSet.add(key);
      return { pressedKeys: newSet };
    }),
  keyUp: (key: string) => {
    set(state => {
      const newSet = new Set(state.pressedKeys);
      newSet.delete(key);
      return { pressedKeys: newSet };
    });
  },
  reset: () => set({ pressedKeys: new Set() }),
}));

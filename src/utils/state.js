/**
 * For some statement management in the browser
 */
import create from "zustand";

export const [useStore, apiStore] = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

export const saveState = () => {
  if (typeof window === "undefined") return false;
  return true;
};

const getLocalState = () => {
  if (typeof window === "undefined") return {};
  return {};
};

export const stateInitialization = (newValues, overrideLocal = false) => {
  getLocalState();
};

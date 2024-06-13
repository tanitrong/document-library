import { create } from "zustand";

const useMenuAction = create((set) => ({
  menuActive: "user",
  setMenuActive: (menuActive) => set({ menuActive }),
}));

export default useMenuAction;

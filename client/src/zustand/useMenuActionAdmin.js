import { create } from "zustand";

const useMenuActionAdmin = create((set) => ({
  menuActive: "user",
  setMenuActive: (menuActive) => set({ menuActive }),
}));

export default useMenuActionAdmin;

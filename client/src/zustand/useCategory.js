import { create } from "zustand";

const useMenuCategory = create((set) => ({
  menuCategory: "lvbc",
  setMenuCategory: (menuCategory) => set({ menuCategory }),
}));

export default useMenuCategory;

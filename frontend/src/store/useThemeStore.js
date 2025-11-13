import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chatmate-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chatmate-theme", theme);
    set({ theme });
  },
}));
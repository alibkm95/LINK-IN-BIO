import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'cupcake',
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
  },
  toggleTheme: () => {
    const currentTheme = localStorage.getItem('theme')
    const newTheme = currentTheme === 'cupcake' ? 'dracula' : 'cupcake'
    set({ theme: newTheme })
    localStorage.setItem('theme', newTheme)
  }
}))
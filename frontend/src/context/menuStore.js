import { create } from 'zustand'

export const useMenuStore = create((set) => ({
  isOpen: false,
  closeSideMenu: () => set(() => ({ isOpen: false })),
  openSideMenu: () => set(() => ({ isOpen: true })),
}))
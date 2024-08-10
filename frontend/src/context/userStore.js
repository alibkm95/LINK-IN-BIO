import { create } from 'zustand'

export const useUserStore = create((set) => ({
  authUser: null,
  fetchLoggedInUser: async () => {
    const res = await fetch('/api/user')
    if (res.status === 200) {
      const data = await res.json()
      set({ authUser: data.user })
    } else {
      set({ authUser: null })
    }
  },
  setAuthUser: (userObj) => set(() => ({ authUser: userObj }))
}))
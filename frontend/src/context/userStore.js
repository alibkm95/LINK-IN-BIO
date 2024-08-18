import { create } from 'zustand'

export const useUserStore = create((set) => ({
  authUser: null,
  userStats: null,
  fetchLoggedInUser: async () => {
    const res = await fetch('/api/user')
    if (res.status === 200) {
      const data = await res.json()
      set({ authUser: data.user })
    } else {
      set({ authUser: null })
    }
  },
  setAuthUser: (userObj) => set(() => ({ authUser: userObj })),
  fetchUserStats: async () => {
    const res = await fetch('/api/stat/user')
    const data = await res.json()
    if (res.status === 200) {
      set({ userStats: data.userStats })
    } else {
      set({ userStats: null })
    }
  },
  setUserStats: (newStats) => set(() => ({ userStats: newStats }))
}))
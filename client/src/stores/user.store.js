import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useUser = create(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearUser: () => set({ currentUser: null }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
)
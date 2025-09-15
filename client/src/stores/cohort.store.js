import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useCohortNumber = create(
  persist(
    (set) => ({
      cohort: 0,
      setCohortNumber: (cohortNumber) => set({ cohort: cohortNumber })
    }),
    {
      name: 'cohort-number',
      getStorage: () => localStorage,
    }
  )
)
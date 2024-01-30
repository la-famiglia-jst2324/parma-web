'use client'

import React, { createContext, useState } from 'react'
import type { Bucket, Company } from '@prisma/client'

export const SideBarContext = createContext<{
  companies: Company[]
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
  buckets: Bucket[]
  setBuckets: React.Dispatch<React.SetStateAction<Bucket[]>>
}>({
  companies: [],
  setCompanies: () => {},
  buckets: [],
  setBuckets: () => {}
})

interface SideBarProviderProps {
  children: React.ReactNode
}

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [buckets, setBuckets] = useState<Bucket[]>([])

  return (
    <SideBarContext.Provider value={{ companies, setCompanies, buckets, setBuckets }}>
      {children}
    </SideBarContext.Provider>
  )
}

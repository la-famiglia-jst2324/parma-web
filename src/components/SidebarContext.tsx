'use client'

import React, { createContext, useState } from 'react'
import type { Bucket, Company } from '@prisma/client'

export const SideBarContext = createContext<{
  companies: Company[]
  subscribedCompanies: Company[]
  setSubscribedCompanies: React.Dispatch<React.SetStateAction<Company[]>>
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
  buckets: Bucket[]
  setBuckets: React.Dispatch<React.SetStateAction<Bucket[]>>
}>({
  companies: [],
  subscribedCompanies: [],
  setCompanies: () => {},
  setSubscribedCompanies: () => {},
  buckets: [],
  setBuckets: () => {}
})

interface SideBarProviderProps {
  children: React.ReactNode
}

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [buckets, setBuckets] = useState<Bucket[]>([])
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])

  return (
    <SideBarContext.Provider
      value={{ companies, subscribedCompanies, setCompanies, setSubscribedCompanies, buckets, setBuckets }}
    >
      {children}
    </SideBarContext.Provider>
  )
}

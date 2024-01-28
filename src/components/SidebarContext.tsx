'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import type { Bucket, Company } from '@prisma/client'
import BucketFunctions from '@/app/services/bucket.service'
import { AuthContext } from '@/lib/firebase/auth'

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

  const user = useContext(AuthContext)
  const uid = user !== 'loading' && user !== null ? user.uid : ''

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        try {
          const companiesData = await BucketFunctions.getAllCompanies()
          setCompanies(companiesData)
        } catch (error) {
          console.error('Failed to fetch companies:', error)
        }
      }
    }
    fetchData()
  }, [uid])

  useEffect(() => {
    const fetchBuckets = async () => {
      if (uid) {
        try {
          const bucketsData = await BucketFunctions.getMyOwnBuckets()
          setBuckets(bucketsData)
        } catch (error) {
          console.error('Error in fetching buckets:', error)
        }
      }
    }
    fetchBuckets()
  }, [uid])

  return (
    <SideBarContext.Provider value={{ companies, setCompanies, buckets, setBuckets }}>
      {children}
    </SideBarContext.Provider>
  )
}

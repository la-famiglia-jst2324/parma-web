import type { ReactNode, Dispatch, SetStateAction } from 'react'
import React, { createContext, useState } from 'react'
import type { CompanyData } from '@/types/companies'

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  frequency: string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maxRunSeconds: number
  invocationEndpoint: string
  additionalParams: null | string
}

export interface CompanyContextProps {
  companyDatasources: CompanyDataSource[]
  setCompanyDatasources: Dispatch<SetStateAction<CompanyDataSource[]>>
  companyData: CompanyData
  setCompanyData: Dispatch<SetStateAction<CompanyData>>
}

export const CompanyContext = createContext<CompanyContextProps | undefined>(undefined)

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companyDatasources, setCompanyDatasources] = useState<CompanyDataSource[]>([])
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    description: ''
  })

  return (
    <CompanyContext.Provider value={{ companyData, setCompanyData, companyDatasources, setCompanyDatasources }}>
      {children}
    </CompanyContext.Provider>
  )
}

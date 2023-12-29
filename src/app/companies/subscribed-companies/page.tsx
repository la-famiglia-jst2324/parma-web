'use client'

import React, { useState, useEffect } from 'react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/companies/CompanyCard'
import GoBackButton from '@/components/companies/GoBackButton'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { getSubscribedCompanies } from '@/services/company/companyService'

interface SubscribedCompaniesPageProps {}

const SubscribedCompaniesPage: React.FC<SubscribedCompaniesPageProps> = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscribedCompanies()
        setSubscribedCompanies(data)
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className="m-3 flex min-h-[calc(100vh-90px)] flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex items-center justify-start space-x-4">
          <div className="pl-2">
            <GoBackButton />
          </div>
          <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
        </div>
        <div className="flex w-full flex-wrap">
          {subscribedCompanies?.map((company, index) => (
            <div className="md:w-1/3">
              <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(SubscribedCompaniesPage)

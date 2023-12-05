'use client'

import React, { useState, useEffect } from 'react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'
import GoBackButton from '@/components/Companies/GoBackButton'

async function getSubscribedCompanies() {
  try {
    const res = await fetch('/api/companies/subscribed-companies', {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const SubscribedCompaniesPage: React.FC = () => {
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
    <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
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
  )
}

export default SubscribedCompaniesPage

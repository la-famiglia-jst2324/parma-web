'use client'

import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { TextInput } from '@tremor/react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'
import { MainLayout } from '@/components/MainLayout'

async function getCompanies() {
  try {
    const res = await fetch('/api/companies', {
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

const CompaniesPage: React.FC = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    getSubscribedCompanies()
      .then((res) => setSubscribedCompanies(res.slice(0, 3)))
      .catch((error) => {
        console.error('Failed to fetch subscribed companies:', error)
      })
  }, [])

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
      })
  }, [])

  return (
    <MainLayout>
      <div>
        <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
          <div className="mb-3 flex items-center justify-start space-x-4">
            <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
          </div>
          <div className="flex flex-wrap">
            {subscribedCompanies?.map((company, index) => (
              <div className="md:w-1/3">
                <CompanyCard
                  key={index}
                  name={company.name}
                  description={company.description}
                  activeDatasources={company.activeDatasources}
                  inactiveDatasources={company.inactiveDatasources}
                />
              </div>
            ))}
          </div>
          <div className="flex w-full justify-end p-2">
            <a href="/companies/subscribed-companies" className="text-blue-500">
              See all subscribed companies
            </a>
          </div>
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-start space-x-4 pl-2">
              <h1 className="mb-2 text-2xl font-bold">Search for all companies</h1>
            </div>
            <div className="pl-2">
              <TextInput icon={SearchIcon} placeholder="Search..." />
            </div>
          </div>
          <div className="flex flex-wrap">
            {companies.map((company, index) => (
              <div className="md:w-1/3">
                <CompanyCard
                  key={index}
                  name={company.name}
                  description={company.description}
                  activeDatasources={company.activeDatasources}
                  inactiveDatasources={company.inactiveDatasources}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CompaniesPage

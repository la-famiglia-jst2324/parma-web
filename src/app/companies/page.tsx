'use client'

import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { TextInput } from '@tremor/react'
import { dummyCompanies, moreDummyCompanies } from '../../components/companies/dummydata'
import CompanyCard from '@/components/companies/CompanyCard'

const CompaniesPage: React.FC = () => {
  return (
    <div>
      <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex items-center justify-start space-x-4">
          <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
        </div>
        <div className="flex flex-wrap">
          {dummyCompanies.map((company, index) => (
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
          {moreDummyCompanies.map((company, index) => (
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
  )
}

export default CompaniesPage

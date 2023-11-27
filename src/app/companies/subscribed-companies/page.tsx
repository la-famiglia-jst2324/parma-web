'use client'

import React from 'react'
import { dummyCompanies } from '../../../components/Companies/dummydata'
import CompanyCard from '@/components/Companies/CompanyCard'
import GoBackButton from '@/components/Companies/GoBackButton'

const SubscribedCompaniesPage: React.FC = () => {
  return (
    <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
      <div className="mb-3 flex items-center justify-start space-x-4">
        <div className="pl-2">
          <GoBackButton />
        </div>
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
    </div>
  )
}

export default SubscribedCompaniesPage

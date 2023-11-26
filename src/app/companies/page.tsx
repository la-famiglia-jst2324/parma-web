'use client'

import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { TextInput } from '@tremor/react'
import CompanyCard from '@/components/Companies/CompanyCard'

interface Company {
  name: string
  description: string
  activeDatasources: number
  inactiveDatasources: number
}

const dummyCompanies: Company[] = [
  {
    name: 'Pharmaceutical Company A',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue lacus odio, in molestie neque cursus at. Name consequat lobortis nulla, id consectetur eros iaculis in. Sed rhoncus ac ante id placerat. Sed quis velit luctus, convallis arcu eu, posuere turpis. Name id vehicula ante. ',
    activeDatasources: 10,
    inactiveDatasources: 2
  },
  {
    name: 'Tech Innovators Inc.',
    description:
      'Maecenas auctor velit sed arcu vehicula, vitae aliquam sem pellentesque. Curabitur venenatis, sapien ac laoreet semper, diam quam placerat ex, id auctor orci risus aliquet odio. Aenean dignissim lacinia tincidunt.',
    activeDatasources: 8,
    inactiveDatasources: 4
  },
  {
    name: 'Global Services Ltd.',
    description:
      'tiam tincidunt arcu bibendum velit viverra laoreet eu accumsan orci. Cras non nisl finibus, aliquam lectus ac, ultricies urna. Nullam dolor sem, dapibus vitae quam volutpat, commodo bibendum nulla.',
    activeDatasources: 12,
    inactiveDatasources: 1
  }
]

const moreDummyCompanies: Company[] = Array.from({ length: 12 }, (_, index) => ({
  name: `Company ${index + 4}`,
  description:
    'Maecenas auctor velit sed arcu vehicula, vitae aliquam sem pellentesque. Curabitur venenatis, sapien ac laoreet semper, diam quam placerat ex, id auctor orci risus aliquet odio. Aenean dignissim lacinia tincidunt.',
  activeDatasources: 5,
  inactiveDatasources: 3
}))

const SeeAllSubscribedLink: React.FC = () => (
  <div className="flex w-full justify-end p-2">
    <a href="/companies/subscribed-companies" className="text-blue-500">
      See all subscribed companies
    </a>
  </div>
)

const SearchCompanies: React.FC = () => (
  <div className="mb-4">
    <div className="mb-2 flex items-center justify-start space-x-4 pl-2">
      <h1 className="mb-2 text-2xl font-bold">Search for all companies</h1>
    </div>
    <div className="pl-2">
      <TextInput icon={SearchIcon} placeholder="Search..." />
    </div>
  </div>
)

const CompaniesPage: React.FC = () => {
  return (
    <>
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
          <SeeAllSubscribedLink />
          <SearchCompanies />
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
    </>
  )
}

export default CompaniesPage

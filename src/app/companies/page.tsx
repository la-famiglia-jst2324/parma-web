'use client'

import React, { useState, useEffect } from 'react'
// import { SearchIcon } from '@heroicons/react/20/solid'
import { Button, TextInput } from '@tremor/react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'

async function getCompanies(offset: number): Promise<Company[]> {
  try {
    const res = await fetch(`/api/companies?offset=${offset}`, {
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
    return []
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

async function getCompaniesByName(companyName: string): Promise<Company[]> {
  try {
    const res = await fetch(`/api/companies/search?name=${companyName}`, {
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
    return []
  }
}

const CompaniesPage: React.FC = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchedCompanies, setSearchedCompanies] = useState<Company[]>([])
  const [displaySearchCompanies, setDisplaySearchCompanies] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [offset, setOffset] = useState<number>(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscribedCompanies()
        setSubscribedCompanies(data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanies(offset)
        setCompanies(data)
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      }
    }

    fetchData()
    setOffset((prevOffset) => prevOffset + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMoreCompanies = async () => {
    try {
      const moreCompanies = await getCompanies(offset)
      setCompanies((prevCompanies) => [...prevCompanies, ...moreCompanies])
      setOffset((prevOffset) => prevOffset + 1)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
    }
  }

  const fetchSearchedCompanies = async () => {
    try {
      const searchCompanies = await getCompaniesByName(searchQuery)
      setSearchedCompanies(searchCompanies)
      setDisplaySearchCompanies(true)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
    }
  }

  return (
    <div>
      <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex items-center justify-start space-x-4">
          <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
        </div>
        <div className="flex w-full flex-wrap">
          {subscribedCompanies?.map((company, index) => (
            <div className="md:w-1/3">
              <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
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
          <div className="flex pl-2">
            <TextInput
              // icon={SearchIcon}
              placeholder="Search for companies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pl-2">
              <Button onClick={() => fetchSearchedCompanies()}>Search</Button>
            </div>
            <div className="pl-2">
              <Button
                onClick={() => {
                  setDisplaySearchCompanies(false)
                }}
                color="red"
                disabled={!displaySearchCompanies}
              >
                Clear Results
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          {displaySearchCompanies
            ? searchedCompanies.map((company, index) => (
                <div className="md:w-1/3">
                  <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
                </div>
              ))
            : companies.map((company, index) => (
                <div className="md:w-1/3">
                  <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
                </div>
              ))}
        </div>
        <div className="flex w-full justify-center p-2">
          {displaySearchCompanies ? null : <Button onClick={() => fetchMoreCompanies()}>See more companies</Button>}
        </div>
      </div>
    </div>
  )
}

export default CompaniesPage

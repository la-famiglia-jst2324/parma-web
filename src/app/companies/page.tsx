'use client'

import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Button, TextInput } from '@tremor/react'
import { useRouter } from 'next/navigation'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'
import { getCompanies, getSubscribedCompanies, getCompaniesByName } from '@/services/company/companyService'

interface CompaniesPageProps {}

const CompaniesPage: React.FC<CompaniesPageProps> = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchedCompanies, setSearchedCompanies] = useState<Company[]>([])
  const [displaySearchCompanies, setDisplaySearchCompanies] = useState<boolean>(false)
  const [disableSeeMore, setDisableSeeMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [offset, setOffset] = useState<number>(1)
  const [showSeeMoreSubscribedCompanies, setShowSeeMoreSubscribedCompanies] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscribedCompanies()
        setShowSeeMoreSubscribedCompanies(data.length > 3)
        setSubscribedCompanies(data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [setShowSeeMoreSubscribedCompanies, setSubscribedCompanies])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanies(offset)
        setCompanies(data)
        setOffset(2)
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMoreCompanies = async () => {
    try {
      const moreCompanies = await getCompanies(offset)

      if (moreCompanies.length === 0) {
        setDisableSeeMore(true)
      } else {
        setCompanies((prevCompanies) => [...prevCompanies, ...moreCompanies])
        setOffset((prevOffset) => prevOffset + 1)
      }
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

  const handleAddCompanyPressed = () => {
    router.push('/companies/add-company')
  }

  return (
    <MainLayout>
      <div className="m-3 flex min-h-[calc(100vh-90px)] flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex w-full items-center justify-between space-x-4">
          <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
          <Button onClick={handleAddCompanyPressed}>Create a new company</Button>
        </div>
        <div className="flex w-full flex-wrap">
          {subscribedCompanies?.length > 0 ? (
            subscribedCompanies?.map((company, index) => (
              <div className="md:w-1/3">
                <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
              </div>
            ))
          ) : (
            <h3 className="px-2">You do not have any subscribed companies</h3>
          )}
        </div>
        <div className="flex w-full justify-end p-2">
          {showSeeMoreSubscribedCompanies ? (
            <a href="/companies/subscribed-companies" className="text-blue-500">
              See all subscribed companies
            </a>
          ) : null}
        </div>
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-start space-x-4 pl-2">
            <h1 className="mb-2 text-2xl font-bold">Search for all companies</h1>
          </div>
          <div className="flex pl-2">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search for companies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pl-2">
              <Button onClick={fetchSearchedCompanies}>Search</Button>
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
          {displaySearchCompanies ? (
            searchedCompanies?.length > 0 ? (
              searchedCompanies?.map((company, index) => (
                <div className="md:w-1/3">
                  <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
                </div>
              ))
            ) : (
              <h3 className="px-2 font-bold">No companies found</h3>
            )
          ) : (
            companies?.map((company, index) => (
              <div className="md:w-1/3">
                <CompanyCard key={index} id={company.id} name={company.name} description={company.description} />
              </div>
            ))
          )}
        </div>
        <div className="flex w-full justify-center p-2">
          {displaySearchCompanies ? null : (
            <Button onClick={fetchMoreCompanies} disabled={disableSeeMore}>
              See more companies
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AuthCheck(CompaniesPage)

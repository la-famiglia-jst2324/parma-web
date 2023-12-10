'use client'

import React, { useState, useEffect, useContext } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Button, TextInput } from '@tremor/react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'
import { AuthContext } from '@/lib/firebase/auth'

interface CompaniesPageProps {}

async function getCompanies(offset: number, idToken: string): Promise<Company[]> {
  try {
    const res = await fetch(`/api/company?page=${offset}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: idToken
      }
    })

    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json?.companies
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}

async function getSubscribedCompanies(idToken: string) {
  try {
    const res = await fetch('/api/company/subscribed', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: idToken
      }
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

async function getCompaniesByName(companyName: string, idToken: string): Promise<Company[]> {
  try {
    const res = await fetch(`/api/company/?name=${companyName}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: idToken
      }
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json?.company
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}

const CompaniesPage: React.FC<CompaniesPageProps> = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchedCompanies, setSearchedCompanies] = useState<Company[]>([])
  const [displaySearchCompanies, setDisplaySearchCompanies] = useState<boolean>(false)
  const [disableSeeMore, setDisableSeeMore] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [offset, setOffset] = useState<number>(1)
  const [showSeeMoreSubscribedCompanies, setShowSeeMoreSubscribedCompanies] = useState<boolean>(false)
  const [idToken, setIdToken] = useState<string>('')

  const user = useContext(AuthContext)

  useEffect(() => {
    const setToken = async () => {
      if (user) {
        const token = await user.getIdToken()
        setIdToken(token)
      }
    }

    setToken()
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idToken) {
          const data = await getSubscribedCompanies(idToken)
          setShowSeeMoreSubscribedCompanies(data.length > 3)
          setSubscribedCompanies(data.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [idToken, setShowSeeMoreSubscribedCompanies, setSubscribedCompanies])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idToken) {
          const data = await getCompanies(offset, idToken)
          setCompanies(data)
          setOffset((prevOffset) => prevOffset + 1)
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken, setCompanies, setOffset])

  const fetchMoreCompanies = async () => {
    try {
      const moreCompanies = await getCompanies(offset, idToken)

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
      const searchCompanies = await getCompaniesByName(searchQuery, idToken)
      setSearchedCompanies(searchCompanies)
      setDisplaySearchCompanies(true)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
    }
  }

  return (
    <>
      <div className="m-3 flex min-h-[calc(100vh-90px)] flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex items-center justify-start space-x-4">
          <h1 className="py-2 pl-2 text-2xl font-bold">Subscribed companies</h1>
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
    </>
  )
}

export default CompaniesPage

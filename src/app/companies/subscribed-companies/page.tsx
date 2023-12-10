'use client'

import React, { useState, useEffect, useContext } from 'react'
import type { Company } from '@/types/companies'
import CompanyCard from '@/components/Companies/CompanyCard'
import GoBackButton from '@/components/Companies/GoBackButton'
import { AuthContext } from '@/lib/firebase/auth'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'

interface SubscribedCompaniesPageProps {}

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

const SubscribedCompaniesPage: React.FC<SubscribedCompaniesPageProps> = () => {
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [idToken, setIdToken] = useState<string>('')
  const user = useContext(AuthContext)

  useEffect(() => {
    const setToken = async () => {
      try {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
        }
      } catch (error) {
        console.error('Error setting token:', error)
      }
    }

    setToken()
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idToken) {
          const data = await getSubscribedCompanies(idToken)
          setSubscribedCompanies(data)
        }
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [idToken, setSubscribedCompanies])

  return (
    <MainLayout>
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
    </MainLayout>
  )
}

export default AuthCheck(SubscribedCompaniesPage)

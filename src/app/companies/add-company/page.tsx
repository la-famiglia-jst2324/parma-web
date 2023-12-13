'use client'

import React, { useState, useEffect, useContext } from 'react'
import type { FormEvent } from 'react'
import type { CalloutProps } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { FormContent } from '@/components/FormContent'
import GoBackButton from '@/components/Companies/GoBackButton'
import { AuthContext } from '@/lib/firebase/auth'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'
import CustomButton from '@/components/BlueButton'
import CompanyPopup from '@/components/Companies/CompanyPopup'

interface PopupContents {
  title: string
  color: CalloutProps['color']
  description: string
}

interface AddCompanyPageProps {}

async function postCompany(companyName: string, companyDescription: string, idToken: string) {
  try {
    const res = await fetch('/api/company', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ name: companyName, description: companyDescription }),
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
    throw new Error('HTTP response was not OK')
  }
}

const AddCompanyPage: React.FC<AddCompanyPageProps> = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupContents, setPopupContents] = useState<PopupContents>({
    title: '',
    color: 'teal',
    description: ''
  })
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
    if (showPopup) {
      const timerId = setTimeout(() => {
        setShowPopup(false)
      }, 5000)

      return () => clearTimeout(timerId)
    }
    return () => {}
  }, [showPopup])

  const handleCompanyCreation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const companyName = formData.get('name') as string
    const companyDescription = formData.get('description') as string

    try {
      await postCompany(companyName, companyDescription, idToken)
      setPopupContents({
        title: `Company ${companyName} created successfully`,
        color: 'teal',
        description: 'You have successfully created a new company!'
      })
      setShowPopup(true)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
      setPopupContents({
        title: `Unable to create company ${companyName}`,
        color: 'red',
        description: 'An error occurred while creating a company! Please try again'
      })
      setShowPopup(true)
    }
  }

  return (
    <MainLayout>
      <div className="m-3 flex min-h-[calc(100vh-90px)] flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 flex items-center justify-start space-x-4">
          <div className="pl-2">
            <GoBackButton />
          </div>
          <h1 className="py-2 pl-2 text-2xl font-bold">Create a company</h1>
        </div>

        <div className="w-full px-4">
          <p className="mb-4">Create a company by providing the name and description.</p>
          <form role="form" data-testid="create-company-form" onSubmit={handleCompanyCreation}>
            <FormContent
              id="name"
              name="name"
              label="Company Name"
              placeholder="Please enter company name"
              type="input"
            />
            <FormContent
              id="description"
              name="description"
              label="Company Description"
              placeholder="Please enter company description"
              type="textarea"
            />
            <div>
              <CustomButton text="Create Company" type="submit" />
            </div>
          </form>
        </div>
        <CompanyPopup
          title={popupContents.title}
          icon={CheckCircleIcon}
          color={popupContents.color}
          description={popupContents.description}
          showPopup={showPopup}
        />
      </div>
    </MainLayout>
  )
}

export default AuthCheck(AddCompanyPage)

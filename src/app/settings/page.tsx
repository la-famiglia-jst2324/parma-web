'use client'

import type { FormEvent } from 'react'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import SelectSection from '@/components/settings/SelectSection'
import ApiKeyConfiguration from '@/components/settings/ApiKeyConfiguration'
import BucketFunctions from '@/app/services/bucket.service'
import useSubscribedCompanies from '@/components/hooks/useSubscribedCompanies'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
// import useCompanies from '@/components/hooks/useCompanies'
// import {user} from '@/pages/api/user/[userId]'

function SettingsPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [subscribedBuckets, setSubscribedBuckets] = useState<string[]>([])
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const subscribedCompanies = useSubscribedCompanies()
  const channels = ['Email', 'Slack']

  // tbd
  const handleConfigureSlack = () => {}
  const handleConfigureAffinity = () => {}

  selectedCompanies.map((company) => console.log(company))
  selectedBuckets.map((bucket) => console.log(bucket))
  selectedChannels.map((channel) => console.log(channel))

  useEffect(() => {
    BucketFunctions.getAllBuckets(1)
      .then((res) => {
        if (Array.isArray(res.buckets)) {
          const uniqueTitles = Array.from(
            new Set(res.buckets.map((bucket: { title: string }) => bucket.title))
          ) as string[]
          setSubscribedBuckets(uniqueTitles)
        } else {
          console.error('Expected an array but received', res)
        }
      })
      .catch((error) => {
        console.error('Failed to fetch buckets', error)
      })
  }, [])

  // const deleteUser = async () => {
  //   const router = useRouter()

  //   try {
  //     const res = await fetch(`/api/user`, {
  //       method: 'DELETE',
  //       cache: 'no-cache'
  //     })
  //     if (!res.ok) {
  //       console.log('Response status:', res.status)
  //       throw new Error('HTTP response was not OK')
  //     }
  //     const json = await res.json()
  //     router.push('/')
  //     // Log out user

  //     return json
  //   } catch (error) {
  //     console.log('An error has occurred: ', error)
  //   }
  // }

  const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //   try {
    //     await notificationSubscription(companyName, "REPORT")
    //     router.push('/companies')
    //   } catch (error) {
    //     console.error('Failed to fetch more companies:', error)
    //     setPopupContents({
    //       title: `Unable to create company ${companyName}`,
    //       color: 'red',
    //       description: 'An error occurred while creating a company! Please try again'
    //     })
    //     setShowPopup(true)
    //   }
    // throw new Error('Function not implemented.')
  }

  return (
    <main>
      <div className="space-x-3 text-white">
        <h1 className="mb-2 p-4 text-3xl font-bold">Preferences</h1>

        <div className="pl-8">
          <h2 className="text-xl font-bold ">Report Configuration</h2>
          <form role="form" data-testid="create-datasource-form" onSubmit={saveChanges}>
            <SelectSection
              id="companies"
              title="Select Companies"
              description="Select companies to receive weekly reports on"
              placeholder="companies"
              options={subscribedCompanies}
              onValueChange={(value) => setSelectedCompanies(value)}
            />
            <SelectSection
              id="buckets"
              title="Select Buckets"
              description="Select buckets to receive weekly reports on"
              placeholder="buckets"
              options={subscribedBuckets}
              onValueChange={(value) => setSelectedBuckets(value)}
            />
            <SelectSection
              id="channel"
              title="Select Channel"
              description="Select channel for receiving reports"
              placeholder="channels"
              options={channels}
              onValueChange={(value) => setSelectedChannels(value)}
              isMultiSelect={false}
            />
          </form>
        </div>

        <div
          className="p-5 pl-8"
          // onSubmit={saveChanges}
        >
          <Button className="rounded bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
            Save changes
          </Button>
        </div>
        <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

        <div className="p-8">
          <h2 className="text-xl font-bold ">API Keys</h2>

          <ApiKeyConfiguration serviceName="OpenAI" onConfigure={handleConfigureSlack} />
          <Input className="w-50 ml-1 mt-2 rounded bg-slate-800" placeholder="Enter Your API Key" color=""></Input>

          <ApiKeyConfiguration serviceName="Affinity" onConfigure={handleConfigureAffinity} />
          <Input className="w-50 ml-1 mt-2 rounded bg-slate-800" placeholder="Enter Your API Key" color=""></Input>
        </div>

        <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

        <div className="flex p-8">
          <h2 className="pt-4 text-xl font-bold">Delete Account</h2>
          <div className=" absolute right-8 w-[180px] pt-2 ">
            <Button className="rounded bg-red-700 font-bold text-white hover:bg-red-600 focus:outline-none">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(SettingsPage)

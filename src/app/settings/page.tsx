'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@tremor/react'
import type { Company } from '@/types/companies'
import type { Bucket } from '@/types/bucket'
import SelectSection from '@/components/Settings/SelectSection'
import ApiKeyConfiguration from '@/components/Settings/ApiKeyConfiguration'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'

async function getSubscribedCompanies() {
  try {
    const res = await fetch('/api/company', {
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

async function getBuckets() {
  try {
    const res = await fetch('/api/bucket', {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    console.log(json)
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

function SettingsPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const [subscribedBuckets, setSubscribedBuckets] = useState<Bucket[]>([])
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const uniqueCompanies = Array.from(new Set(subscribedCompanies?.map((company) => company.name)))
  const uniqueBuckets = Array.from(new Set(subscribedBuckets?.map((company) => company.title)))
  const channels = ['Email', 'Slack']

  // tbd
  const handleConfigureSlack = () => {}
  const handleConfigureAffinity = () => {}

  selectedCompanies.map((company) => console.log(company))
  selectedBuckets.map((bucket) => console.log(bucket))
  selectedChannels.map((channel) => console.log(channel))
  useEffect(() => {
    getSubscribedCompanies()
      .then((res) => setSubscribedCompanies(res))
      .catch((error) => {
        console.error('Failed to fetch subscribed companies:', error)
      })
  }, [])
  useEffect(() => {
    getBuckets()
      .then((res) => setSubscribedBuckets(res))
      .catch((error) => {
        console.error('Failed to fetch buckets', error)
      })
  }, [])

  function saveChanges(): React.MouseEventHandler<HTMLDivElement> | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <MainLayout>
      <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 items-center justify-start space-x-6">
          <div className="mb-3  items-center justify-start space-x-3 ">
            <h1 className="py-2 pl-2 text-3xl font-bold text-slate-700">Preferences</h1>

            <div className="p-8">
              <h2 className="text-xl font-bold ">Report Configuration</h2>

              <SelectSection
                title="Select Companies"
                description="Select companies to receive weekly reports on"
                placeholder="companies"
                options={uniqueCompanies}
                onValueChange={setSelectedCompanies}
              />
              <SelectSection
                title="Select Buckets"
                description="Select buckets to receive weekly reports on"
                placeholder="buckets"
                options={uniqueBuckets}
                onValueChange={setSelectedBuckets}
              />
              <SelectSection
                title="Select Channels"
                description="Select channels for receiving reports"
                placeholder="channels"
                options={channels}
                onValueChange={setSelectedChannels}
                isMultiSelect={false}
              />
            </div>

            <div className="pl-8" onClick={saveChanges}>
              <Button>Save changes</Button>
            </div>
            <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

            <div className="p-8">
              <h2 className="text-xl font-bold ">API Keys</h2>

              <ApiKeyConfiguration serviceName="Slack" onConfigure={handleConfigureSlack} />

              <ApiKeyConfiguration serviceName="Affinity" onConfigure={handleConfigureAffinity} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AuthCheck(SettingsPage)

'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@tremor/react'
import SelectSection from '@/components/settings/SelectSection'
import ApiKeyConfiguration from '@/components/settings/ApiKeyConfiguration'
import BucketFunctions from '@/app/services/bucket.service'
import useSubscribedCompanies from '@/components/hooks/useSubscribedCompanies'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'

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
  function saveChanges(): React.MouseEventHandler<HTMLDivElement> | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <main>
      <div className="space-x-3 text-white">
        <h1 className="p-2 text-3xl font-bold">Preferences</h1>

        <div>
          <h2 className="text-xl font-bold ">Report Configuration</h2>

          <SelectSection
            title="Select Companies"
            description="Select companies to receive weekly reports on"
            placeholder="companies"
            options={subscribedCompanies}
            onValueChange={setSelectedCompanies}
          />
          <SelectSection
            title="Select Buckets"
            description="Select buckets to receive weekly reports on"
            placeholder="buckets"
            options={subscribedBuckets}
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
    </main>
  )
}

export default MainLayoutWrapper(SettingsPage)

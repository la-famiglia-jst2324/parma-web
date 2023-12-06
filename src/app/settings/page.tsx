'use client'

import React, { useEffect, useState } from 'react'
import { Button, MultiSelect, MultiSelectItem } from '@tremor/react'
import type { Company } from '@/types/companies'

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
// async function getBuckets() {
//   try {
//     const res = await fetch('/api/companies/subscribed-companies', {
//       method: 'GET',
//       cache: 'no-cache'
//     })
//     if (!res.ok) {
//       console.log('Response status:', res.status)
//       throw new Error('HTTP response was not OK')
//     }
//     const json = await res.json()
//     return json
//   } catch (error) {
//     console.log('An error has occurred: ', error)
//   }
// }

// async function getChannels() {
//   try {
//     const res = await fetch('/api/companies/subscribed-companies', {
//       method: 'GET',
//       cache: 'no-cache'
//     })
//     if (!res.ok) {
//       console.log('Response status:', res.status)
//       throw new Error('HTTP response was not OK')
//     }
//     const json = await res.json()
//     return json
//   } catch (error) {
//     console.log('An error has occurred: ', error)
//   }
// }
export default function SettingsPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [subscribedCompanies, setSubscribedCompanies] = useState<Company[]>([])
  const uniqueCompanies = Array.from(new Set(subscribedCompanies.map((company) => company.name)))
  selectedCompanies.map((company) => console.log(company))
  useEffect(() => {
    getSubscribedCompanies()
      .then((res) => setSubscribedCompanies(res))
      .catch((error) => {
        console.error('Failed to fetch subscribed companies:', error)
      })
  }, [])

  return (
    <div className="bg-white">
      <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
        <div className="mb-3 items-center justify-start space-x-6">
          <div className="mb-3  items-center justify-start space-x-3 ">
            <h1 className="py-2 pl-2 text-3xl font-bold ">Preferences</h1>

            <div className="p-8">
              <h2 className="text-xl font-bold ">Report Configuration</h2>

              <div className="pb-1 pt-6 font-bold">
                <h3>Select Companies</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="flex">Select companies to receive weekly reports on</h4>
                </div>
                <div className="absolute right-8 w-56 pb-3">
                  <MultiSelect
                    placeholder="companies"
                    onValueChange={(values) => setSelectedCompanies(values)}
                    className=""
                  >
                    {uniqueCompanies.map((companyName, index) => (
                      <MultiSelectItem key={index} value={companyName}>
                        {companyName}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
              </div>

              <div className="pb-1 pt-6 font-bold">
                <h3>Select Buckets</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="flex">Select buckets to receive weekly reports on</h4>
                </div>
                <div className="absolute right-8 w-56 pb-3">
                  <MultiSelect
                    placeholder="buckets"
                    onValueChange={(values) => setSelectedCompanies(values)}
                    className=""
                  >
                    {uniqueCompanies.map((companyName, index) => (
                      <MultiSelectItem key={index} value={companyName}>
                        {companyName}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
              </div>

              <div className="pb-1 pt-6 font-bold">
                <h3>Select Channels</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="text-align: left; flex">Select where you want to receive the report</h4>
                </div>
                <div className="absolute right-8 w-56 pb-3">
                  <MultiSelect
                    placeholder="channels"
                    onValueChange={(values) => setSelectedCompanies(values)}
                    className=""
                  >
                    {uniqueCompanies.map((companyName, index) => (
                      <MultiSelectItem key={index} value={companyName}>
                        {companyName}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
              </div>
            </div>

            <div className="w-full rounded-b border-b border-gray-200 p-2"></div>

            <div className="p-8">
              <h2 className="text-xl font-bold ">API Keys</h2>
              <div className="pt-6 font-bold ">
                <h3>Slack</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="text-align: left; flex">Configure API key for slack </h4>
                </div>
                <div className="absolute right-8 w-[180px] p-2">
                  <Button>Configure</Button>
                </div>
              </div>

              <div className="pt-6 font-bold">
                <h3>Affinity</h3>
              </div>
              <div className="flex">
                <div>
                  <h4 className="flex">Configure API key for Affinity</h4>
                </div>
                <div className="absolute right-8 w-[180px] p-2">
                  <Button>Configure</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

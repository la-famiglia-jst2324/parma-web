'use client'

import React, { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Button, Callout } from '@tremor/react'
import { UserGroupIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { LinkIcon } from '@heroicons/react/outline'
import type { CompanyData, Attachment } from '@/types/companies'
import GoBackButton from '@/components/Companies/GoBackButton'
import CompanyAttachment from '@/components/Companies/CompanyAttachment'
import DataSourcesPanel from '@/components/Companies/DataSourcesPanel'
import PerformancePanel from '@/components/Companies/PerformancePanel'

async function getCompanyAttachments(companyId: string) {
  try {
    const res = await fetch(`/api/companies/attachment?companyId=${companyId}`, {
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

// async function postCompanyAttachment(companyId: string) {
//   // try {
//   //   const res = await fetch(`/api/company/attachment?companyId=${companyId}`, {
//   //     method: 'GET',
//   //     cache: 'no-cache'
//   //   })
//   //   if (!res.ok) {
//   //     console.log('Response status:', res.status)
//   //     throw new Error('HTTP response was not OK')
//   //   }
//   //   const json = await res.json()
//   //   return json
//   // } catch (error) {
//   //   console.log('An error has occurred: ', error)
//   // }
// }

async function deleteCompanyAttachment(companyId: string, attachmentId: string) {
  try {
    const res = await fetch(`/api/companies/${companyId}/attachment/${attachmentId}`, {
      method: 'DELETE',
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

// async function getCompanyAttachmentData(companyId: string) {
//   // try {
//   //   const res = await fetch(`/api/company/attachment?companyId=${companyId}`, {
//   //     method: 'GET',
//   //     cache: 'no-cache'
//   //   })
//   //   if (!res.ok) {
//   //     console.log('Response status:', res.status)
//   //     throw new Error('HTTP response was not OK')
//   //   }
//   //   const json = await res.json()
//   //   return json
//   // } catch (error) {
//   //   console.log('An error has occurred: ', error)
//   // }
// }

async function getCompanyData(companyId: string) {
  try {
    const res = await fetch(`/api/companies/${companyId}`, {
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

async function getCompanySubscription(companyId: string) {
  try {
    const res = await fetch(`/api/newsSubscriptionn/${companyId}`, {
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

async function postCompanySubscription(companyId: string, subscribe: boolean) {
  try {
    const res = await fetch(`/api/newsSubscriptionn/${companyId}`, {
      method: 'POST',
      body: JSON.stringify({ subscribe }),
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

async function getExportData(companyId: string) {
  return `${companyId}`
}

const CompanyPage = ({ params: { companyId } }: { params: { companyId: string } }) => {
  const [companyData, setCompanyData] = useState<CompanyData>()
  const [companyAttachments, setCompanyAttachments] = useState<Attachment[]>()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  let name: string = ''
  let description: string = ''

  if (companyData) {
    name = companyData?.name
    description = companyData?.description
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyAttachments(companyId)
        setCompanyAttachments(data)
      } catch (error) {
        console.error('Failed to fetch company attachments', error)
      }
    }

    fetchData()
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanySubscription(companyId)
        setIsSubscribed(data?.subscribed)
      } catch (error) {
        console.error('Failed to fetch company attachments', error)
      }
    }

    fetchData()
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData(companyId)
        setCompanyData(data)
      } catch (error) {
        console.error('Failed to fetch company data:', error)
      }
    }

    fetchData()
  }, [companyId])

  useEffect(() => {
    if (showSuccess) {
      const timerId = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)

      return () => clearTimeout(timerId)
    }
  }, [showSuccess])

  const handleExport = async (name: string) => {
    try {
      const exportDataResponse = await getExportData(companyId)
      const exportBlob = new Blob([exportDataResponse], { type: 'text/plain' })
      const exportURL = window.URL.createObjectURL(exportBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = exportURL
      downloadLink.setAttribute('download', `${name}-exportdata.json`)
      downloadLink.click()
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  const handleSubscribe = async () => {
    const subscribeValue = true
    try {
      const data = await postCompanySubscription(companyId, subscribeValue)
      if (data.subscribe) {
        setIsSubscribed(data.subscribe)
        setShowSuccess(subscribeValue)
      } else {
        console.error('Failed to subscribe:')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
    }
  }

  const handleUnsubscribe = async () => {
    const subscribeValue = false
    try {
      const data = await postCompanySubscription(companyId, subscribeValue)
      if (data.subscribe === false) {
        setIsSubscribed(data.subscribe)
      } else {
        console.error('Failed to unsubscribe:')
      }
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleDelete = async (attachmentId: string) => {
    try {
      const data = await deleteCompanyAttachment(companyId, attachmentId)
      console.log(data)
      setCompanyAttachments(data)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleDownload = async (attachmentId: string) => {
    console.log(`Download action triggered for attachment ${attachmentId}`)
  }

  return (
    <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
      <div className="mb-3 flex w-full items-center justify-between space-x-4">
        <div className="flex items-center">
          <div className="pl-2">
            <GoBackButton />
          </div>
          <h1 className="py-2 pl-4 text-4xl font-bold">{name}</h1>
        </div>
        <div className="flex">
          <div className="flex items-center space-x-3">
            {isSubscribed ? (
              <Button onClick={handleUnsubscribe}>Subscribed</Button>
            ) : (
              <Button onClick={handleSubscribe}>Subscribe</Button>
            )}
            <Button variant="secondary" onClick={() => handleExport(name)}>
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="pl-10 pr-2">
        <p className="mb-4 overflow-hidden text-sm text-gray-700">{description}</p>
        <div className="mt-4">
          <h3 className="pb-2 font-bold">
            You can also attach data to this company that will only be displayed to you
          </h3>
          <Button icon={LinkIcon}>Attach Data</Button>
          <div className="flex space-x-4 py-4">
            {companyAttachments &&
              companyAttachments?.map((attachment) => (
                <CompanyAttachment
                  key={attachment.id}
                  attachment={attachment}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))}
          </div>
        </div>

        <TabGroup>
          <TabList className="mt-8" variant="solid">
            <Tab icon={UserGroupIcon}>Data Sources</Tab>
            <Tab icon={UserIcon}>Performance</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataSourcesPanel companyID={companyId} />
            </TabPanel>
            <TabPanel>
              <PerformancePanel />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="fixed bottom-0 right-0 m-6 w-96">
        {showSuccess && (
          <Callout title={`Company ${name} subscribed successfully`} icon={CheckCircleIcon} color="teal">
            You have successfully subscribed to this company. You will now receive information about this company on
            your dashboard. You can always unsubscribe by pressing the subscribed button at the top
          </Callout>
        )}
      </div>
    </div>
  )
}

export default CompanyPage

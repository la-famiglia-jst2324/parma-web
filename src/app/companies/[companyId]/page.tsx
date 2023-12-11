'use client'

import type { ChangeEvent } from 'react'
import React, { useState, useEffect, useContext } from 'react'
import type { CalloutProps } from '@tremor/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Button } from '@tremor/react'
import { UserGroupIcon, UserIcon, CheckCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import type { CompanyData } from '@/types/companies'
import GoBackButton from '@/components/Companies/GoBackButton'
import CompanyPopup from '@/components/Companies/CompanyPopup'
import CompanyAttachment from '@/components/Companies/CompanyAttachment'
import DataSourcesPanel from '@/components/Companies/DataSourcesPanel'
import PerformancePanel from '@/components/Companies/PerformancePanel'
import { AuthContext } from '@/lib/firebase/auth'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'

interface PopupContents {
  title: string
  color: CalloutProps['color']
  description: string
}

interface SubscriptionResponse {
  addedBy: number
  createdAt: string
  description: string
  id: number
  modifiedAt: string
  name: string
}

interface Attachment {
  id: number
  companyId: number
  fileType: string
  fileUrl: string
  userId: number
  title: string
  createdAt: string
  modifiedAt: string
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

async function postCompanySubscription(companyId: string, subscribe: boolean, idToken: string) {
  try {
    const res = await fetch(`/api/company/subscribed?subscribe=${subscribe}`, {
      method: 'POST',
      body: JSON.stringify({ companyId: Number(companyId) }),
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
    console.log(json)
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

async function getCompanyData(companyId: string, idToken: string) {
  try {
    const res = await fetch(`/api/company/${companyId}`, {
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
  }
}

async function getCompanyAttachments(companyId: string, idToken: string) {
  // Change to company here
  try {
    const res = await fetch(`/api/company/attachment?companyId=${companyId}`, {
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
  }
}

async function deleteCompanyAttachment(companyId: string, attachmentId: string, idToken: string) {
  // Change to company here
  try {
    const res = await fetch(`/api/company/${companyId}/attachment/${attachmentId}`, {
      method: 'DELETE',
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
  }
}

async function getCompanyAttachmentData(companyId: string, attachmentId: string, idToken: string) {
  // Change to company here
  try {
    const res = await fetch(`/api/company/${companyId}/attachment/${attachmentId}`, {
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
  }
}

async function postCompanyAttachment(companyId: string, data: FormData, idToken: string) {
  // Change to company here
  try {
    const res = await fetch(`/api/company/${companyId}/attachment`, {
      method: 'POST',
      body: data,
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
  }
}

async function getExportData(companyId: string) {
  return `${companyId}`
}

const CompanyPage = ({ params: { companyId } }: { params: { companyId: string } }) => {
  const [companyData, setCompanyData] = useState<CompanyData>()
  const [companyAttachments, setCompanyAttachments] = useState<Attachment[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [idToken, setIdToken] = useState<string>('')
  const [popupContents, setPopupContents] = useState<PopupContents>({
    title: '',
    color: 'teal',
    description: ''
  })
  const user = useContext(AuthContext)

  const [uploadAttachment, setUploadAttachment] = useState<Blob | string>('')

  console.log({ companyAttachments })

  let name: string = ''
  let description: string = ''

  if (companyData) {
    name = companyData?.name
    description = companyData?.description
  }

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
        const data = await getCompanyAttachments(companyId, idToken)
        const returnData = data || []
        setCompanyAttachments(returnData)
      } catch (error) {
        console.error('Failed to fetch company attachments', error)
      }
    }

    fetchData()
  }, [companyId, idToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData(companyId, idToken)
        setCompanyData(data)
      } catch (error) {
        console.error('Failed to fetch company data:', error)
      }
    }

    fetchData()
  }, [companyId, idToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscribedCompanies(idToken)
        const subscribed = data.some((item: SubscriptionResponse) => item.id === Number(companyId))
        setIsSubscribed(subscribed)
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }
    fetchData()
  }, [companyId, idToken])

  useEffect(() => {
    if (showPopup) {
      const timerId = setTimeout(() => {
        setShowPopup(false)
      }, 5000)

      return () => clearTimeout(timerId)
    }
    return () => {}
  }, [showPopup])

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
      await postCompanySubscription(companyId, subscribeValue, idToken)
      setIsSubscribed(subscribeValue)
      setPopupContents({
        title: `Company ${name} subscribed successfully`,
        color: 'teal',
        description:
          'You have successfully subscribed to this company. You will now receive information about this company on your dashboard. You can always unsubscribe by pressing the subscribed button at the top'
      })
      setShowPopup(true)
    } catch (error) {
      console.error('Error subscribing:', error)
    }
  }

  const handleUnsubscribe = async () => {
    const subscribeValue = false
    try {
      await postCompanySubscription(companyId, subscribeValue, idToken)
      setIsSubscribed(subscribeValue)
      setPopupContents({
        title: `Company ${name} unsubscribed successfully`,
        color: 'teal',
        description: 'You have successfully unsubscribed to this company'
      })
      setShowPopup(true)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleDelete = async (attachmentId: string) => {
    try {
      await deleteCompanyAttachment(companyId, attachmentId, idToken)
      const data = await getCompanyAttachments(companyId, idToken)
      const returnData = data || []
      setCompanyAttachments(returnData)
      setPopupContents({
        title: `Attachment deleted successfully`,
        color: 'teal',
        description: 'You have successfully deleted an attachment'
      })
      setShowPopup(true)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleDownload = async (attachmentId: string) => {
    try {
      const data = await getCompanyAttachmentData(companyId, attachmentId, idToken)
      window.open(data.fileUrl, '_blank')
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleUpload = async () => {
    try {
      const data = new FormData()
      data.append('file', uploadAttachment)
      setUploadAttachment('')
      await postCompanyAttachment(companyId, data, idToken)
      const data1 = await getCompanyAttachments(companyId, idToken)
      const returnData = data1 || []
      setCompanyAttachments(returnData)
      setPopupContents({
        title: `Attachment uploaded successfully`,
        color: 'teal',
        description: 'You have successfully uploaded an attachment'
      })
      setShowPopup(true)
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setUploadAttachment(i)
    }
  }

  return (
    <MainLayout>
      <div className="m-3 flex min-h-[calc(100vh-90px)] flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
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
                <Button icon={CheckCircleIcon} onClick={handleUnsubscribe}>
                  Subscribed
                </Button>
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
            <div className="flex items-center">
              <input type="file" className="text-sm text-stone-500" name="attachment" onChange={uploadToClient} />
            </div>
            <div className="pt-2">
              <Button icon={ArrowUpTrayIcon} onClick={handleUpload} disabled={!uploadAttachment}>
                Upload File
              </Button>
            </div>
            <div className="flex space-x-4 py-4">
              {companyAttachments.length > 0 ? (
                companyAttachments?.map((attachment) => (
                  <CompanyAttachment
                    key={attachment?.id}
                    fileId={String(attachment?.id)}
                    fileType={attachment.fileType}
                    title={attachment.title}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                  />
                ))
              ) : (
                <p>No attachments for this company</p>
              )}
            </div>
          </div>

          <TabGroup>
            <TabList className="mt-8" variant="solid">
              <Tab icon={UserGroupIcon}>Data Sources</Tab>
              <Tab icon={UserIcon}>Performance</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DataSourcesPanel
                  companyId={companyId}
                  idToken={idToken}
                  setShowPopup={setShowPopup}
                  setPopupContents={setPopupContents}
                />
              </TabPanel>
              <TabPanel>
                <PerformancePanel />
              </TabPanel>
            </TabPanels>
          </TabGroup>
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

export default AuthCheck(CompanyPage)

'use client'

import type { ChangeEvent } from 'react'
import React, { useState, useEffect } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import { CheckCircle2Icon, FileDownIcon, Loader2Icon, RefreshCcw } from 'lucide-react'
import { LineChart, SearchSelect, SearchSelectItem } from '@tremor/react'
import type { CompanyData } from '@/types/companies'
import CompanyAttachment from '@/components/companies/CompanyAttachment'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import {
  getSubscribedCompanies,
  postCompanySubscription,
  getCompanyData,
  getCompanyAttachments,
  deleteCompanyAttachment,
  getCompanyAttachmentData,
  postCompanyAttachment,
  getExportData,
  editCompany
} from '@/services/company/companyService'
import EditCompanyModal from '@/components/companies/EditCompanyModal'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ConfigureDatasourcesModal from '@/components/companies/ConfigureDatasoursesModal'
import { getAnalyticsDataForCompany, getMeasurementsForCompany } from '@/services/measurement/measurementService'
import { getDataSourcesByCompanyId } from '@/services/datasource/datasourceService'

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

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  frequency: string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maxRunSeconds: number
  invocationEndpoint: string
  additionalParams: null | string
}

interface CompanyMeasurement {
  id: number
  createdAt: string
  measurementName: string
  modifiedAt: string
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
}

interface DataItem {
  date: string
  [key: string]: number | string
}

const CompanyPage = ({ params: { companyId } }: { params: { companyId: string } }) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    description: ''
  })
  const [companyAttachments, setCompanyAttachments] = useState<Attachment[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [uploadAttachment, setUploadAttachment] = useState<Blob | string>('')
  const { toast } = useToast()

  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [companyMeasurements, setCompanyMeasurements] = useState<CompanyMeasurement[]>([])
  const [datasource, setDatasource] = useState<string>('')
  const [measurement, setMeasurement] = useState<string>('')
  const [graphData, setGraphData] = useState<DataItem[]>([])
  const [uploadLoading, setUploadLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyAttachments(companyId)
        const returnData = data || []
        setCompanyAttachments(returnData)
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
    const fetchData = async () => {
      try {
        const data = await getSubscribedCompanies()
        const subscribed = data.some((item: SubscriptionResponse) => item.id === Number(companyId))
        setIsSubscribed(subscribed)
      } catch (error) {
        console.error('Failed to fetch subscribed companies:', error)
      }
    }

    fetchData()
  }, [companyId])

  const handleExport = async (name: string) => {
    try {
      const exportDataResponse = await getExportData(companyId)
      const jsonString = JSON.stringify(exportDataResponse, null, 2)
      const exportBlob = new Blob([jsonString], { type: 'application/json' })
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
      await postCompanySubscription(companyId, subscribeValue)
      setIsSubscribed(subscribeValue)
      toast({
        title: `Company ${companyData.name} subscribed successfully`,
        description:
          'You have successfully subscribed to this company. You will now receive information about this company on your dashboard. You can always unsubscribe by pressing the subscribed button at the top'
      })
    } catch (error) {
      console.error('Error subscribing:', error)
      toast({
        title: `Unable to subscribe to ${companyData.name}`,
        description: 'An error occurred while subscribing to this company! Please try again'
      })
    }
  }

  const handleUnsubscribe = async () => {
    const subscribeValue = false
    try {
      await postCompanySubscription(companyId, subscribeValue)
      setIsSubscribed(subscribeValue)
      toast({
        title: `Company ${companyData.name} unsubscribed successfully`,
        description: 'You have successfully unsubscribed to this company'
      })
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  const handleEditCompany = async (name: string, description: string) => {
    try {
      await editCompany(companyId, name, description)
      const data = await getCompanyData(companyId)
      setCompanyData(data)
      toast({
        title: `Company ${companyData.name} edited successfully`,
        description: 'You have successfully edited this company'
      })
    } catch (error) {
      console.error('Error in editing the company:', error)
      toast({
        title: `Unable to edit ${name}`,
        description: 'An error occurred while editing this company! Please try again'
      })
    }
  }

  const handleDelete = async (attachmentId: string) => {
    try {
      await deleteCompanyAttachment(companyId, attachmentId)
      const data = await getCompanyAttachments(companyId)
      const returnData = data || []
      setCompanyAttachments(returnData)
      toast({
        title: `Attachment deleted successfully`,
        description: 'You have successfully deleted an attachment'
      })
    } catch (error) {
      console.error('Error delete the attachment:', error)
    }
  }

  const handleDownload = async (attachmentId: string) => {
    try {
      const data = await getCompanyAttachmentData(companyId, attachmentId)
      window.open(data.fileUrl, '_blank')
    } catch (error) {
      console.error('Error downloading th file:', error)
    }
  }

  const handleUpload = async () => {
    setUploadLoading(true)
    try {
      const data = new FormData()
      data.append('file', uploadAttachment)
      await postCompanyAttachment(companyId, data)
      const data1 = await getCompanyAttachments(companyId)
      const returnData = data1 || []
      setCompanyAttachments(returnData)
      toast({
        title: `Attachment uploaded successfully`,
        description: 'You have successfully uploaded an attachment'
      })
    } catch (error) {
      console.error('Error uploading the file:', error)
    }
    setUploadLoading(false)
    setUploadAttachment('')
  }

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setUploadAttachment(i)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSourcesByCompanyId(companyId)
        setCompanyDataSources(data)
      } catch (error) {
        console.error('Failed to fetch data sources:', error)
      }
    }

    fetchData()
  }, [companyId])

  const handleDatasourceChange = async (value: string) => {
    setDatasource(value)
    const dataSourceId = value
    try {
      const data = await getMeasurementsForCompany(dataSourceId, companyId)
      setCompanyMeasurements(data)
    } catch (error) {
      console.error('Failed to get the measurement data', error)
    }
  }

  const handleMeasurementChange = (value: string) => {
    setMeasurement(value)
    handleGetMeasurementData()
  }

  const handleGetMeasurementData = async () => {
    try {
      const data = await getAnalyticsDataForCompany(measurement, companyId)
      setGraphData(data)
    } catch (error) {
      console.error('Failed to get the measurement data', error)
    }
  }

  const handleRefetchDatasources = async () => {
    try {
      const data = await getDataSourcesByCompanyId(companyId)
      setCompanyDataSources(data)
    } catch (error) {
      console.error('Failed to fetch data sources:', error)
    }
  }

  return (
    <main role="main">
      <div className="mb-6 flex w-full justify-between px-2">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">{companyData?.name}</h1>
        </div>
        <div className="flex">
          <div className="flex items-center space-x-3">
            {isSubscribed ? (
              <Button variant="outline" onClick={handleUnsubscribe}>
                <CheckCircle2Icon className="mr-2 h-4 w-4" />
                Subscribed
              </Button>
            ) : (
              <Button onClick={handleSubscribe}>Subscribe</Button>
            )}
            <Button variant="secondary" onClick={() => handleExport(companyData?.name)}>
              <FileDownIcon className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <ConfigureDatasourcesModal companyId={companyId} />
          </div>
        </div>
      </div>
      <div className="my-4 flex w-full flex-col">
        <div className="mb-3 flex w-full flex-row space-x-3">
          <SearchSelect onValueChange={handleDatasourceChange} placeholder={'Select datasources'}>
            {companyDataSources?.map((datasource: CompanyDataSource, index) => (
              <SearchSelectItem key={index} value={String(datasource.id)}>
                {datasource.sourceName}
              </SearchSelectItem>
            ))}
          </SearchSelect>
          <SearchSelect
            onValueChange={handleMeasurementChange}
            placeholder={'Select measurement'}
            disabled={datasource === ''}
          >
            {companyMeasurements?.map((measurement, index) => (
              <SearchSelectItem key={index} value={String(measurement.id)}>
                {measurement.measurementName}
              </SearchSelectItem>
            ))}
          </SearchSelect>
          <Button variant="secondary" onClick={handleRefetchDatasources}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <LineChart
            className="mt-6"
            data={graphData}
            index="date"
            categories={[companyData?.name]}
            colors={['emerald']}
            yAxisWidth={40}
          />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Description</CardTitle>
                <EditCompanyModal
                  companyName={companyData?.name}
                  companyDescription={companyData?.description}
                  handleSave={handleEditCompany}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{companyData?.description}</p>
            </CardContent>
          </Card>
        </section>
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">User Attached Data</CardTitle>
              <CardDescription>You can attach pdf, jpg and png files to this company</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-end space-x-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Choose file</Label>
                    <Input id="picture" type="file" name="attachment" onChange={uploadToClient} />
                  </div>
                  {uploadLoading === false ? (
                    <Button onClick={handleUpload} disabled={uploadAttachment === ''}>
                      <ArrowUpTrayIcon className="h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      <Button disabled>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="my-2 flex flex-wrap">
                {companyAttachments.length > 0
                  ? companyAttachments?.map((attachment) => (
                      <CompanyAttachment
                        key={attachment?.id}
                        fileId={String(attachment?.id)}
                        fileType={attachment.fileType}
                        title={attachment.title}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                      />
                    ))
                  : null}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(CompanyPage)

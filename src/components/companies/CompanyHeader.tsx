import React, { useContext, useEffect, useState } from 'react'
import { ArrowUpFromLineIcon, CheckCircle2Icon, FileDownIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
import ConfigureDatasourcesModal from './ConfigureDatasoursesModal'
import { getExportData, getSubscribedCompanies, postCompanySubscription } from '@/services/company/companyService'

interface CompanyHeaderProps {
  companyId: string
}

interface SubscriptionResponse {
  addedBy: number
  createdAt: string
  description: string
  id: number
  modifiedAt: string
  name: string
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()
  const { companyData } = useContext(CompanyContext) as CompanyContextProps

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

  const handleExportToCRM = async () => {
    try {
      // const exportDataResponse = await getExportData(companyId)
    } catch (error) {
      console.error('Error exporting data to CRM:', error)
    }
  }

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

  return (
    <div className="mb-6 flex w-full justify-between px-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">{companyData.name}</h1>
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
          <ConfigureDatasourcesModal companyId={companyId} />
          <Button variant="secondary" onClick={() => handleExport(companyData.name)}>
            <FileDownIcon className="mr-2 h-4 w-4" />
            Download Data
          </Button>
          <Button variant="secondary" onClick={() => handleExportToCRM()}>
            <ArrowUpFromLineIcon className="mr-2 h-4 w-4" />
            Export to CRM
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyHeader

'use client'

import React, { useState, useEffect, useContext } from 'react'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { getCompanyData } from '@/services/company/companyService'
import { getMeasurementsForCompany } from '@/services/measurement/measurementService'
import { getDataSourcesByCompanyId } from '@/services/datasource/datasourceService'
import CompanyCommentsCard from '@/components/companies/CompanyCommentsCard'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import CompanyUserAttachedDataCard from '@/components/companies/CompanyUserAttachedDataCard'
import type { CompanyContextProps } from '@/components/CompanyContext'
import { CompanyContext } from '@/components/CompanyContext'
import CompanyDescriptionCard from '@/components/companies/CompanyDescriptionCard'
import CompanyHeader from '@/components/companies/CompanyHeader'
import CompanyGraphCard from '@/components/companies/CompanyGraphCard'
import { Label } from '@/components/ui/label'

interface CompanyMeasurement {
  id: number
  companyId: number
  createdAt: string
  measurementName: string
  modifiedAt: string
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
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

interface CompanyPageProps {
  params: {
    companyId: string
  }
}

const CompanyPage: React.FC<CompanyPageProps> = ({ params: { companyId } }) => {
  const [companyGraphMeasurements, setCompanyGraphMeasurements] = useState<CompanyMeasurement[]>([])
  const [companyCommentMeasurements, setCompanyCommentMeasurements] = useState<CompanyMeasurement[]>([])
  const [currentDatasource, setCurrentDatasource] = useState<string>('')
  const { companyDatasources, setCompanyDatasources, setCompanyData } = useContext(
    CompanyContext
  ) as CompanyContextProps

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSourcesByCompanyId(companyId)
        setCompanyDatasources(data)
        const defaultDatasource = String(data[0]?.id)
        if (defaultDatasource) {
          setCurrentDatasource(defaultDatasource)
        }
      } catch (error) {
        console.log('Failed to fetch data sources')
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeasurementsForCompany(currentDatasource, companyId)
        const graphData: CompanyMeasurement[] = []
        const commentData: CompanyMeasurement[] = []

        data?.forEach((item: CompanyMeasurement) => {
          const type = item.type.toLowerCase()
          if (type === 'int' || type === 'float' || type === 'nested') {
            graphData.push(item)
          }
          if (type === 'comment' || type === 'nested') {
            commentData.push(item)
          }
        })

        setCompanyGraphMeasurements(graphData)
        setCompanyCommentMeasurements(commentData)
      } catch (error) {
        console.log('Failed to fetch data sources')
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDatasource])

  const handleDatasourceChange = async (value: string) => {
    setCurrentDatasource(value)
  }

  return (
    <main role="main">
      <CompanyHeader companyId={companyId} />
      <CompanyDescriptionCard companyId={companyId} />
      <div className="my-4 flex w-full flex-col">
        <div className="mb-3 w-full">
          <Label className="text-gray-300">Please select a datasource to view all its measurements</Label>
          <Select value={currentDatasource} onValueChange={handleDatasourceChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select datasources" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Datasources</SelectLabel>
                {companyDatasources?.map((datasource: CompanyDataSource, index) => (
                  <SelectItem key={index} value={String(datasource.id)}>
                    {datasource.sourceName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CompanyGraphCard companyId={companyId} measurements={companyGraphMeasurements} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CompanyCommentsCard companyId={companyId} measurements={companyCommentMeasurements} />
        <CompanyUserAttachedDataCard companyId={companyId} />
      </div>
    </main>
  )
}

export default MainLayoutWrapper(CompanyPage)

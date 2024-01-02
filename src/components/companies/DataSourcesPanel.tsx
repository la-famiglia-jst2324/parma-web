import React, { useEffect, useState } from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { Link2Icon } from 'lucide-react'
import DatasourceHealth from './DatasourceHealth'
import {
  getDataSourcesByCompanyId,
  addDatasourceToCompany,
  deleteCompanyDataSource,
  getDataSources
} from '@/services/datasource/datasourceService'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  frequency: string
  frequencyPattern: null | string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maxRunSeconds: number
  invocationEndpoint: string
  additionalParams: null | string
}

interface Props {
  companyId: string
}

const DataSourcesPanel: React.FC<Props> = ({ companyId }) => {
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [allDataSources, setAllDataSources] = useState<CompanyDataSource[]>([])
  const [filteredDataSources, setFilteredDataSources] = useState<CompanyDataSource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const { toast } = useToast()

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSources()
        setAllDataSources(data)
      } catch (error) {
        console.error('Error fetching data sources:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (allDataSources && companyDataSources) {
      const filtered = allDataSources.filter((dataSource: CompanyDataSource) => {
        return !companyDataSources.some(
          (companyDataSource: CompanyDataSource) => companyDataSource?.id === dataSource?.id
        )
      })
      setFilteredDataSources(filtered)
    }
  }, [allDataSources, companyDataSources])

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedValues(values)
  }

  const handleUnlinkDataSource = async (dataSourceId: string) => {
    await deleteCompanyDataSource(companyId, dataSourceId)
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDataSources(companydatasources)
    toast({
      title: `Datasource unlinked successfully`,
      description: 'You have successfully unlinked a datasource from this company'
    })
  }

  const handleAddDataSourceToCompany = async () => {
    await Promise.allSettled(
      selectedValues.map((dataSourceId: string) => addDatasourceToCompany(companyId, dataSourceId))
    )
    setSelectedValues([])
    const alldatasource = await getDataSources()
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId)
    setCompanyDataSources(companydatasources)
    toast({
      title: `Datasource/s linked successfully`,
      description: 'You have successfully added a datasource to the company'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Link data sources with this company</CardTitle>
        <CardDescription>Select data sources to link with the company and manage linked data sources.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="w-64 pb-3">
            <MultiSelect onValueChange={handleMultiSelectChange} value={selectedValues}>
              {filteredDataSources?.map((datasource: CompanyDataSource, index) => (
                <MultiSelectItem key={index} value={String(datasource.id)}>
                  {datasource.sourceName}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          </div>
          <div className="pl-3">
            <Button onClick={handleAddDataSourceToCompany} disabled={selectedValues.length === 0}>
              <Link2Icon className="mr-2 h-4 w-4" />
              Link
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {companyDataSources?.map((datasource: CompanyDataSource, index) => (
            <div key={index} className="p-1">
              <DatasourceHealth
                dataSourceId={String(datasource.id)}
                dataSourceName={datasource.sourceName}
                isDataSourceActive={datasource.isActive}
                handleUnlinkDataSource={handleUnlinkDataSource}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DataSourcesPanel

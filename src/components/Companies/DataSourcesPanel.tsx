import React, { useEffect, useState } from 'react'
import type { CalloutProps } from '@tremor/react'
import { MultiSelect, MultiSelectItem, Button } from '@tremor/react'
import DatasourceHealth from './DatasourceHealth'
import {
  getDataSourcesByCompanyId,
  addDatasourceToCompany,
  deleteCompanyDataSource,
  getDataSources
} from '@/services/datasource/datasourceService'

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

interface PopupContent {
  title: string
  color: CalloutProps['color']
  description: string
}

interface Props {
  companyId: string
  setPopupContents: React.Dispatch<React.SetStateAction<PopupContent>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const DataSourcesPanel: React.FC<Props> = ({ companyId, setPopupContents, setShowPopup }) => {
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [allDataSources, setAllDataSources] = useState<CompanyDataSource[]>([])
  const [filteredDataSources, setFilteredDataSources] = useState<CompanyDataSource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])

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
    setPopupContents({
      title: `Datasource unlinked successfully`,
      color: 'teal',
      description: 'You have successfully unlinked a datasource from this company'
    })
    setShowPopup(true)
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
    setPopupContents({
      title: `Datasource/s linked successfully`,
      color: 'teal',
      description: 'You have successfully added a datasource to the company'
    })
    setShowPopup(true)
  }

  return (
    <div className="mt-4">
      <h3 className="pb-2 font-bold">Link data sources with this company</h3>
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
            Link Data Sources
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {companyDataSources?.map((datasource: CompanyDataSource, index) => (
          <div key={index} className="md:w-1/3">
            <DatasourceHealth
              dataSourceId={String(datasource.id)}
              dataSourceName={datasource.sourceName}
              isDataSourceActive={datasource.isActive}
              handleUnlinkDataSource={handleUnlinkDataSource}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataSourcesPanel

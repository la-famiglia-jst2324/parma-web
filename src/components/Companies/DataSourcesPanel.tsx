import React, { useEffect, useState } from 'react'
import type { CalloutProps } from '@tremor/react'
import { MultiSelect, MultiSelectItem, Button } from '@tremor/react'
import DatasourceHealth from './DatasourceHealth'

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
  maximumExpectedRunTime: number
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
  idToken: string
  setPopupContents: React.Dispatch<React.SetStateAction<PopupContent>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

async function getDataSourcesByCompanyId(companyId: string, idToken: string) {
  try {
    const res = await fetch(`/api/companyDataSourceRelation?companyId=${companyId}`, {
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

async function addDatasourceToCompany(companyId: string, dataSourceId: string, idToken: string) {
  try {
    const body = {
      dataSourceId: Number(dataSourceId),
      companyId: Number(companyId),
      isDataSourceActive: false,
      healthStatus: 'UP'
    }

    const res = await fetch(`/api/companyDataSourceRelation`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(body),
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

async function deleteCompanyDataSource(companyId: string, dataSourceId: string, idToken: string) {
  try {
    const res = await fetch(`/api/companyDataSourceRelation?companyId=${companyId}&dataSourceId=${dataSourceId}`, {
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

async function getDataSources(idToken: string) {
  try {
    const res = await fetch(`/api/dataSources`, {
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

const DataSourcesPanel: React.FC<Props> = ({ companyId, idToken, setPopupContents, setShowPopup }) => {
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [allDataSources, setAllDataSources] = useState<CompanyDataSource[]>([])
  const [filteredDataSources, setFilteredDataSources] = useState<CompanyDataSource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSourcesByCompanyId(companyId, idToken)
        setCompanyDataSources(data)
      } catch (error) {
        console.error('Failed to fetch data sources:', error)
      }
    }

    fetchData()
  }, [companyId, idToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSources(idToken)
        setAllDataSources(data)
      } catch (error) {
        console.error('Error fetching data sources:', error)
      }
    }

    fetchData()
  }, [idToken])

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
    await deleteCompanyDataSource(companyId, dataSourceId, idToken)
    const alldatasource = await getDataSources(idToken)
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId, idToken)
    setCompanyDataSources(companydatasources)
    setPopupContents({
      title: `Datasource unlinked successfully`,
      color: 'teal',
      description: 'You have successfully unlinked a datasource from this company'
    })
    setShowPopup(true)
    setSelectedValues([])
  }

  const handleAddDataSourceToCompany = async () => {
    await Promise.all(selectedValues.map((dataSourceId) => addDatasourceToCompany(companyId, dataSourceId, idToken)))
    const alldatasource = await getDataSources(idToken)
    setAllDataSources(alldatasource)
    const companydatasources = await getDataSourcesByCompanyId(companyId, idToken)
    setCompanyDataSources(companydatasources)
    setPopupContents({
      title: `Datasource/s linked successfully`,
      color: 'teal',
      description: 'You have successfully added a datasource to the company'
    })
    setShowPopup(true)
    setSelectedValues([])
  }

  return (
    <div className="mt-4">
      <h3 className="pb-2 font-bold">Link data sources with this company</h3>
      <div className="flex">
        <div className="w-64 pb-3">
          <MultiSelect onValueChange={handleMultiSelectChange}>
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

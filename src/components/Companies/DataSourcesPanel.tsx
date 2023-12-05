import { MultiSelect, MultiSelectItem } from '@tremor/react'
import React, { useEffect, useState } from 'react'

import DatasourceHealth from './DatasourceHealth'

interface Datasource {
  name: string
  metrics: string[]
  status: 'Active' | 'Inactive'
}

async function getDataSourcesByCompanyId(companyID: string) {
  try {
    const res = await fetch(`/api/companiesDataSourceRelation?companyId=${companyID}`, {
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

const DataSourcesPanel: React.FC<{ companyID: string }> = ({ companyID }) => {
  const [dataSources, setDataSources] = useState<Datasource[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataSourcesByCompanyId(companyID)
      setDataSources(data)
    }

    fetchData()
  }, [companyID])

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedValues(values)
  }

  return (
    <div className="mt-4">
      <div className="max-w-sm pb-3">
        <MultiSelect onValueChange={handleMultiSelectChange}>
          {dataSources.map((datasource, index) => (
            <MultiSelectItem key={index} value={datasource.name}>
              {datasource.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>

      <div className="flex flex-wrap">
        {dataSources
          .filter((datasource) => selectedValues.length === 0 || selectedValues.includes(datasource.name))
          .map((datasource, index) => (
            <div key={index} className="md:w-1/3">
              <DatasourceHealth name={datasource.name} metrics={datasource.metrics} status={datasource.status} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default DataSourcesPanel

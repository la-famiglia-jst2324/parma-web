import React from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import DatasourceHealth from './DatasourceHealth'
import { dummyDatasourceHealth } from '@/app/api/companies/DummyCompanies'

const DataSourcesPanel: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="max-w-sm pb-3">
        <MultiSelect onValueChange={() => {}}>
          <MultiSelectItem value="5">LinkedIn</MultiSelectItem>
          <MultiSelectItem value="Three">Facebook</MultiSelectItem>
          <MultiSelectItem value="1">Github</MultiSelectItem>
        </MultiSelect>
      </div>

      <div className="flex flex-wrap">
        {dummyDatasourceHealth.map((datasource, index) => (
          <div key={index} className="md:w-1/3">
            <DatasourceHealth name={datasource.name} metrics={datasource.metrics} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataSourcesPanel

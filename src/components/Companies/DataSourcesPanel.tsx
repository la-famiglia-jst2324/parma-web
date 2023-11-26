import { MultiSelect, MultiSelectItem } from '@tremor/react'
import React from 'react'

import DatasourceHealth from './DatasourceHealth'

interface Metric {
  name: string
  status: 'Active' | 'Inactive'
}

interface Datasource {
  name: string
  metrics: Metric[]
}

const DataSourcesPanel: React.FC = () => {
  const dummyDatasourceHealth: Datasource[] = [
    {
      name: 'DataBridge',
      metrics: [
        {
          name: 'Customer lifetime value',
          status: 'Active'
        },
        {
          name: 'Retention rate',
          status: 'Inactive'
        },
        {
          name: 'Net promoter score',
          status: 'Active'
        }
      ]
    },
    {
      name: 'Wikipedia',
      metrics: [
        {
          name: 'Customer satisfaction',
          status: 'Active'
        },
        {
          name: 'Churn rate',
          status: 'Inactive'
        },
        {
          name: 'Product adoption',
          status: 'Active'
        }
      ]
    },
    {
      name: 'WhatsApp',
      metrics: [
        {
          name: 'Revenue growth',
          status: 'Active'
        },
        {
          name: 'Customer engagement',
          status: 'Inactive'
        },
        {
          name: 'Employee satisfaction',
          status: 'Active'
        }
      ]
    },
    {
      name: 'Facebook',
      metrics: [
        {
          name: 'Market share',
          status: 'Active'
        },
        {
          name: 'Customer support satisfaction',
          status: 'Inactive'
        },
        {
          name: 'Productivity index',
          status: 'Active'
        }
      ]
    },
    {
      name: 'LinkedIn',
      metrics: [
        {
          name: 'Profit margin',
          status: 'Active'
        },
        {
          name: 'Customer feedback',
          status: 'Inactive'
        },
        {
          name: 'Innovation index',
          status: 'Active'
        }
      ]
    }
  ]

  // const handleValueChange = (selectedItems) => {
  //   // Handle the selected items
  //   console.log(selectedItems)
  // }

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

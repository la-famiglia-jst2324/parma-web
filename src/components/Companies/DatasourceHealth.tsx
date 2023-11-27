import React from 'react'
import { BadgeDelta } from '@tremor/react'

interface Metric {
  name: string
  status: 'Active' | 'Inactive'
}

interface DatasourceHealthProps {
  name: string
  metrics: Metric[]
}

const DatasourceHealth: React.FC<DatasourceHealthProps> = ({ name, metrics }) => {
  return (
    <div className="p-2">
      <div className="rounded-md border p-3 shadow-md">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2">
          {metrics.map((metric, index) => (
            <div key={index} className="mb-2 flex items-center justify-between">
              <p className="mr-2">{metric.name}</p>
              {metric.status === 'Active' ? (
                <BadgeDelta deltaType="moderateIncrease">Active</BadgeDelta>
              ) : (
                <BadgeDelta deltaType="moderateDecrease">Inactive</BadgeDelta>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DatasourceHealth

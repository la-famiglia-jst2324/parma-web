import { BadgeDelta } from '@tremor/react'
import React from 'react'

interface DatasourceHealthProps {
  name: string
  metrics: string[]
  status: 'Active' | 'Inactive'
}

const DatasourceHealth: React.FC<DatasourceHealthProps> = ({ name, metrics, status }) => {
  // const [isActive, setIsActive] = useState(status === 'Active')

  // const handleStatusChange = (value: boolean) => {
  //   setIsActive(value)
  // }

  return (
    <div className="p-2">
      <div className="rounded-md border p-3 shadow-md">
        <div className="flex justify-between">
          <div className="flex ">
            <h3 className="pr-2 text-lg font-semibold">{name}</h3>
            {status ? (
              <BadgeDelta deltaType="moderateIncrease">Active</BadgeDelta>
            ) : (
              <BadgeDelta deltaType="moderateDecrease">Inactive</BadgeDelta>
            )}
          </div>
          {/* <Switch id="switch" name="switch" checked={isActive} onChange={handleStatusChange} /> */}
        </div>
        <div className="mt-2">
          {metrics.map((metric, index) => (
            <div key={index} className="mb-2 flex items-center justify-between">
              <p className="mr-2">{metric}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DatasourceHealth

import React from 'react'
import { BadgeDelta, Button } from '@tremor/react'

interface DatasourceHealthProps {
  dataSourceId: string
  dataSourceName: string
  isDataSourceActive: boolean
  handleUnlinkDataSource: (dataSourceId: string) => void
}

const DatasourceHealth: React.FC<DatasourceHealthProps> = ({
  dataSourceId,
  dataSourceName,
  isDataSourceActive,
  handleUnlinkDataSource
}) => {
  const unlinkDataSourcePressed = () => {
    handleUnlinkDataSource(dataSourceId)
  }

  return (
    <div className="p-2">
      <div className="rounded-md border p-3 shadow-md">
        <div className="mb-3 flex justify-between">
          <div className="flex justify-between">
            <h3 className="pr-2 text-lg font-semibold">{dataSourceName}</h3>
            {isDataSourceActive ? (
              <BadgeDelta deltaType="moderateIncrease">Active</BadgeDelta>
            ) : (
              <BadgeDelta deltaType="moderateDecrease">Inactive</BadgeDelta>
            )}
          </div>
        </div>
        <Button color="red" onClick={unlinkDataSourcePressed}>
          Unlink
        </Button>
      </div>
    </div>
  )
}

export default DatasourceHealth

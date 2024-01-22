import React from 'react'
import { BadgeDelta } from '@tremor/react'
import { Unlink } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    <Card className="flex">
      <CardHeader>
        <div className="flex flex-1 flex-row justify-between space-x-5">
          <div>
            <CardTitle className="text-lg ">{dataSourceName}</CardTitle>
            <CardDescription>
              <BadgeDelta deltaType={isDataSourceActive ? 'moderateIncrease' : 'moderateDecrease'}>
                {isDataSourceActive ? 'Active' : 'Inactive'}
              </BadgeDelta>
            </CardDescription>
          </div>
          <div>
            <Button variant="outline" className="text-red-600" onClick={unlinkDataSourcePressed}>
              <Unlink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default DatasourceHealth

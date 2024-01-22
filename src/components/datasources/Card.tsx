import React from 'react'
import type { DataSource } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import EditInformationModal from './Modals/EditInformationModal'

interface DescriptionCardProps {
  data: DataSource
  handleSave: (updates: {
    newName: string
    newDescription: string
    newUrl: string
    newStatus: boolean
  }) => Promise<void>
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ data, handleSave }) => {
  return (
    <Card className="mb-5">
      <CardHeader className="-mb-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Description</CardTitle>
          <EditInformationModal
            sourceName={data.sourceName}
            description={data.description || ''}
            url={data.invocationEndpoint}
            handleSave={(updates) => handleSave({ ...updates, newStatus: data.isActive })}
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <p className="mb-2 text-sm">{data.description}</p>
        <p className="mb-2 text-sm text-gray-500">{data.invocationEndpoint}</p>
      </CardContent>
    </Card>
  )
}

export default DescriptionCard

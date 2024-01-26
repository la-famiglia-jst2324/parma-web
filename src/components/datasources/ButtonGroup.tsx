import React from 'react'
import { Button } from '../ui/button'
import ModalComponent from './Modals/DisableModal'
import DeleteModal from './Modals/DeleteModal'
import { triggerDataSource } from '@/services/datasource/datasourceService'

interface DataProps {
  sourceName: string
  description: string | null
  invocationEndpoint: string
  isActive: boolean
  id: number
}

interface ButtonGroupProps {
  data: DataProps
  refreshData: () => void
  handleSave: (updates: {
    newName: string
    newDescription: string
    newUrl: string
    newStatus: boolean
  }) => Promise<void>
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ data, handleSave, refreshData }) => {
  async function triggerDataSourceById(id: string) {
    try {
      const response = await triggerDataSource(id)
      console.log(response)
      refreshData()
    } catch (error) {
      console.error('Failed to trigger datasource:', error)
    }
  }

  return (
    <div className="mr-8 flex items-center justify-end space-x-4">
      <ModalComponent
        sourceName={data.sourceName}
        description={data.description || ''}
        url={data.invocationEndpoint || ''}
        isActive={data.isActive}
        handleSave={handleSave}
      />
      <Button className="" variant="outline" onClick={() => triggerDataSourceById(data.id.toString())}>
        Schedule
      </Button>
      <DeleteModal id={data.id.toString()} />
    </div>
  )
}

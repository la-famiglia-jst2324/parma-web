import { Button } from '../ui/button'
import ModalComponent from './Modals/DisableModal'
import DeleteModal from './Modals/DeleteModal'

interface DataProps {
  sourceName: string
  description: string | null
  invocationEndpoint: string
  isActive: boolean
  id: number
}

interface ButtonGroupProps {
  data: DataProps
  handleSave: (updates: {
    newName: string
    newDescription: string
    newUrl: string
    newStatus: boolean
  }) => Promise<void>
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ data, handleSave }) => {
  return (
    <div className="mr-8 flex items-center justify-end space-x-4">
      <Button className="text-green-500" variant="secondary">
        Schedule
      </Button>
      <ModalComponent
        sourceName={data.sourceName}
        description={data.description || ''}
        url={data.invocationEndpoint || ''}
        isActive={data.isActive}
        handleSave={handleSave}
      />
      <DeleteModal id={data.id.toString()} />
    </div>
  )
}

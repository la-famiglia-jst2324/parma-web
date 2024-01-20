import ModalComponent from './DisableModal'
import DeleteModal from './DeleteModal'
import EditInformationModal from './EditInformationModal'
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
      <EditInformationModal
        sourceName={data.sourceName}
        description={data.description || ''}
        url={data.invocationEndpoint}
        handleSave={(updates) => handleSave({ ...updates, newStatus: data.isActive })}
      />
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

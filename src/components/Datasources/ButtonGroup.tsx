import { Button } from '@tremor/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import ModalComponent from './DisableModal'
import DeleteModal from './DeleteModal'
import EditInformationModal from './EditInformationModal'
import type { useModal } from './hooks/useModal'

interface DataProps {
  sourceName: string
  description: string | null
  invocationEndpoint: string
  isActive: boolean
  id: number
}

interface ButtonGroupProps {
  data: DataProps
  handleEditButtonClick: () => void
  handleDisableButtonClick: () => void
  handleEnableButtonClick: () => void
  handleDeleteButtonClick: () => void
  handleSave: (updates: {
    newName: string
    newDescription: string
    newUrl: string
    newStatus: boolean
  }) => Promise<void>
  editModal: ReturnType<typeof useModal>
  disableModal: ReturnType<typeof useModal>
  deleteModal: ReturnType<typeof useModal>
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  data,
  handleEditButtonClick,
  handleDisableButtonClick,
  handleEnableButtonClick,
  handleDeleteButtonClick,
  handleSave,
  editModal,
  disableModal,
  deleteModal
}) => {
  return (
    <div className="mr-8 flex items-center justify-end space-x-4">
      {/* Edit Button */}
      <Button
        className="mr-2 flex items-center "
        icon={PencilIcon}
        variant="secondary"
        color="gray"
        onClick={handleEditButtonClick}
      >
        Edit Information
      </Button>
      <EditInformationModal
        isOpen={editModal.isOpen}
        handleClose={editModal.closeModal}
        sourceName={data.sourceName}
        description={data.description || ''}
        url={data.invocationEndpoint}
        handleSave={(updates) => handleSave({ ...updates, newStatus: data.isActive })}
      />
      {/* Disable/Enable Button */}
      {data.isActive ? (
        <>
          <Button color="red" onClick={handleDisableButtonClick}>
            Disable
          </Button>
          <ModalComponent
            isOpen={disableModal.isOpen}
            handleClose={disableModal.closeModal}
            sourceName={data.sourceName}
            description={data.description || ''}
            url={data.invocationEndpoint || ''}
            isActive={data.isActive}
            handleSave={handleSave}
          />
        </>
      ) : (
        <Button color="gray" onClick={handleEnableButtonClick}>
          Enable
        </Button>
      )}
      {/* Delete Button */}
      <button className="mr-2 flex items-center bg-transparent text-red-500" onClick={handleDeleteButtonClick}>
        <TrashIcon className="mr-2 h-5 w-5 text-red-500" />
        Delete
      </button>
      <DeleteModal isOpen={deleteModal.isOpen} handleClose={deleteModal.closeModal} id={data.id.toString()} />
    </div>
  )
}

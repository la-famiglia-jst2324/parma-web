import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Button } from '@tremor/react'
import EditInformationModal from './EditInformationModal'
import ModalComponent from './DisableModal'
import DeleteModal from './DeleteModal'
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
      <button
        className="flex items-center rounded-md border border-slate-500 bg-transparent px-4 py-2 text-slate-500 hover:bg-slate-200 hover:text-gray-700"
        onClick={handleEditButtonClick}
      >
        <PencilIcon className="mr-2 h-5 w-5" />
        Edit Information
      </button>
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

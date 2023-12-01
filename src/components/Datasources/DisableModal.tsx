import React from 'react'
import { editDatasource } from '@/utils/datasources/editDatasource'

interface ModalComponentProps {
  isOpen: boolean
  handleClose: () => void
  id: string
  sourceName: string
  description: string
  status: boolean
  url: string
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
  id,
  sourceName,
  description,
  status,
  url
}) => {
  const handleDisable = async () => {
    try {
      await editDatasource(id, sourceName, !status, description, url)
      handleClose()
    } catch (error) {
      console.error('Failed to disable datasource:', error)
    }
  }

  if (!isOpen) {
    return null
  }
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
      {/* Modal */}
      <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        {/* Close button */}
        <button type="button" className="absolute right-0 top-0 m-3" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="px-4 py-5 sm:p-6 sm:pb-5">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">Disable this Datasource</h3>
          <div className="mt-2">
            <p className="text-sm text-red-500">
              Are you sure you want to disable the datasource ? This will disable it for all active companies.
            </p>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
          <button
            type="button"
            className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleDisable}
          >
            Disable
          </button>
          <button
            type="button"
            className="mt-2 inline-flex w-full justify-center rounded-md border border-blue-600 bg-transparent px-4 py-2 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent

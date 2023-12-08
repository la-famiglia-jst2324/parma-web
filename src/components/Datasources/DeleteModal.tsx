'use client'
import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation'

interface DeleteModalProps {
  isOpen: boolean
  handleClose: () => void
  id: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, handleClose, id }) => {
  const router = useRouter()

  async function deleteDatasource(id: string) {
    try {
      const res = await fetch(`/api/dataSources/${id}`, {
        method: 'DELETE',
        cache: 'no-cache'
      })
      if (!res.ok) {
        console.log('Response status:', res.status)
        throw new Error('HTTP response was not OK')
      }
      const json = await res.json()
      router.push('/datasources')
      // Add success message callout here later
      return json
    } catch (error) {
      console.log('An error has occurred: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDatasource(id)
      handleClose()
    } catch (error) {
      console.error('Failed to delete datasource:', error)
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
          <h3 className="text-lg font-semibold leading-6 text-gray-900">Delete this Datasource</h3>
          <div className="mt-2">
            <p className="text-sm text-red-500">
              Are you sure you want to delete the datasource? This will permanently remove it and this cannot be undone.
            </p>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
          <button
            type="button"
            className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleDelete}
          >
            <TrashIcon className="mr-2 h-5 w-5 text-white" />
            Delete Permanently
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

export default DeleteModal

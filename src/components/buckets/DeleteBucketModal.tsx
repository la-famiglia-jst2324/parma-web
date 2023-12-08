'use client'

import { Button } from '@tremor/react'

interface DeleteBucketModalProps {
  handleClose: () => void
  handleDelete: () => void
}

const DeleteBucketModal: React.FC<DeleteBucketModalProps> = ({ handleClose, handleDelete }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
      {/* Modal */}
      <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        {/* Close button */}
        <Button className="absolute right-0 top-0 m-3" variant="light" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <div className="p-4 pb-5">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">Delete this Bucket</h3>
          <div className="mt-2">
            <p className="text-sm text-red-500">
              Are you sure you want to delete the bucket ? This will permanently remove it and this cannot be undone.
            </p>
          </div>
        </div>
        <div className="px-4 sm:pb-5">
          <div className="flex gap-2 px-4 py-3 sm:flex-row-reverse sm:px-5">
            <Button className="mt-2 " color="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button className="mt-2" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteBucketModal

'use client'

import { useState } from 'react'
import { Button, Switch } from '@tremor/react'
import { FormContent } from '../FormContent'

interface EditBucketModalProps {
  handleClose: () => void
  title: string
  description: string | null
  isPublic: boolean
  handleSave: (title: string, description: string | null, isPublic: boolean) => void
}

const EditBucketModal: React.FC<EditBucketModalProps> = ({
  handleClose,
  title: titleProp,
  description: descriptionProp,
  isPublic: isPublicProp,
  handleSave
}) => {
  const [title, setTitle] = useState(titleProp)
  const [description, setDescription] = useState(descriptionProp)
  const [isPublic, setIsPublic] = useState(isPublicProp)

  const handleSaveClick = () => {
    handleSave(title, description, isPublic)
    handleClose()
  }
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

        <div className="px-4 py-5 sm:p-6 sm:pb-5">
          <h3 className="text-center text-lg font-semibold leading-6 text-gray-900">Edit bucket</h3>
          <div className="mb-8">
            <FormContent
              id="title"
              name="title"
              value={title}
              type="input"
              label="Bucket Title"
              placeholder="Please enter bucket title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <FormContent
              id="description"
              name="description"
              value={description || undefined}
              label="Bucket description"
              placeholder="Please enter bucket description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-8 flex items-center gap-4">
            <div className="font-semibold">Is public</div>
            <Switch id="switch" name="isPublic" checked={isPublic} onChange={(val) => setIsPublic(val)} />
          </div>

          <div className="flex gap-2 px-4 py-3 sm:flex-row-reverse sm:px-5">
            <Button className="mt-2 " onClick={handleSaveClick}>
              Save
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
export default EditBucketModal

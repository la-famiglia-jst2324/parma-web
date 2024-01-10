import React, { useState, useEffect } from 'react'

interface EditInformationModalProps {
  isOpen: boolean
  handleClose: () => void
  companyName: string
  companyDescription: string
  handleSave: (name: string, description: string) => Promise<void>
}

const EditCompanyModal: React.FC<EditInformationModalProps> = ({
  isOpen,
  handleClose,
  companyName,
  companyDescription,
  handleSave
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(companyName)
    setDescription(companyDescription)
  }, [companyName, companyDescription])

  if (!isOpen) {
    return null
  }

  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: React.ChangeEvent<T>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  const handleSaveClick = () => {
    handleSave(name, description).catch((error) => {
      console.error('An error occurred:', error)
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
      <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
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
          <h3 className="text-center text-lg font-semibold leading-6 text-gray-900">Edit Information</h3>
          <div className="mt-2">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="datasource-name">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
              placeholder="Company Name"
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-lg focus:outline-none"
            />
            <label className="mb-2 mt-4 block text-sm font-bold text-gray-700" htmlFor="description">
              Company Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => handleInputChange(event, setDescription)}
              placeholder="Description"
              className="h-32 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
          <button
            type="button"
            className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleSaveClick}
          >
            Save
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

export default EditCompanyModal

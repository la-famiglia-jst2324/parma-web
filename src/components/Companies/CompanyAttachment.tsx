import React from 'react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

const CompanyAttachment = () => {
  return (
    <div className="w-48 overflow-hidden rounded-md border p-3 shadow-md">
      <div className="flex justify-end">
        <div className="cursor-pointer text-gray-500">
          <DotsHorizontalIcon className="h-6 w-6" />
        </div>
      </div>
      <h2 className="text-xl font-bold">Tesla</h2>
      <p>Filetype: pdf</p>
    </div>
  )
}

export default CompanyAttachment

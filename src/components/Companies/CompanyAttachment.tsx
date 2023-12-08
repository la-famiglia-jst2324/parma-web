import { PaperClipIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Attachment {
  id: number
  name: string
  filetype: string
}

interface CompanyAttachmentProps {
  attachment: Attachment
}

const CompanyAttachment: React.FC<CompanyAttachmentProps> = ({ attachment }) => {
  return (
    <div className="w-48 overflow-hidden rounded-md border p-3 shadow-md">
      <div className="flex justify-end">
        <div className="cursor-pointer text-gray-500">
          <PaperClipIcon className="h-6 w-6" />
        </div>
      </div>
      <h2 className="text-xl font-bold">{attachment.name}</h2>
      <p>Filetype: {attachment.filetype}</p>
    </div>
  )
}

export default CompanyAttachment

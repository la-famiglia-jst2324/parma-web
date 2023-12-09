import { Button } from '@tremor/react'
// import { PaperClipIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Attachment {
  id: string
  name: string
  filetype: string
}

interface CompanyAttachmentProps {
  attachment: Attachment
  onDelete: (attachmentId: string) => Promise<void>
  onDownload: (attachmentId: string) => Promise<void>
}

const CompanyAttachment: React.FC<CompanyAttachmentProps> = ({ attachment, onDelete, onDownload }) => {
  return (
    <div className="rounded-md border p-3 shadow-md">
      {/* <div className="flex justify-end">
        <div className="cursor-pointer text-gray-500">
          <PaperClipIcon className="h-6 w-6" />
        </div>
      </div> */}
      <h2 className="text-xl font-bold">{attachment.name}</h2>
      <p>Filetype: {attachment.filetype}</p>
      <div className="mt-2 flex">
        <Button color="slate" onClick={() => onDownload(attachment.id)}>
          Download
        </Button>
        <Button color="red" onClick={() => onDelete(attachment.id)} className="ml-2">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default CompanyAttachment

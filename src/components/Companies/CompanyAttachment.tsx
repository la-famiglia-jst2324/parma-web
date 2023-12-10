import React from 'react'
import { Button } from '@tremor/react'
import { TrashIcon } from '@heroicons/react/20/solid'

interface CompanyAttachmentProps {
  fileId: string
  fileType: string
  title: string
  onDelete: (attachmentId: string) => Promise<void>
  onDownload: (attachmentId: string) => Promise<void>
}

const CompanyAttachment: React.FC<CompanyAttachmentProps> = ({ fileId, fileType, title, onDelete, onDownload }) => {
  const handleDelete = async () => {
    try {
      await onDelete(fileId)
    } catch (error) {
      console.error('Error deleting attachment:', error)
    }
  }

  const handleDownload = async () => {
    try {
      await onDownload(fileId)
    } catch (error) {
      console.error('Error downloading attachment:', error)
    }
  }

  return (
    <div className="max-w-[300px] rounded-md border p-3 shadow-md">
      <div className="mb-1 flex items-start justify-between">
        <h2 className="line-clamp-2 max-w-[200px] break-all text-lg font-bold">{title}</h2>
        <div className="ml-3 w-6 cursor-pointer" onClick={handleDelete}>
          <TrashIcon color="red" />
        </div>
      </div>
      <p>Filetype: {fileType}</p>
      <div className="mt-2 flex">
        <Button color="slate" onClick={handleDownload}>
          See contents
        </Button>
      </div>
    </div>
  )
}

export default CompanyAttachment

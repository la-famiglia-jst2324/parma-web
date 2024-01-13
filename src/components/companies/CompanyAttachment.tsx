import React from 'react'
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
    <Card>
      <CardHeader>
        <div className="flex max-w-[300px] items-center space-x-4">
          <CardTitle className="text-lg">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownload}>
                <EyeIcon className="mr-2 h-4 w-4" />
                Open
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>Filetype: {fileType}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default CompanyAttachment

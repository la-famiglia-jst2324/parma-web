import type { ChangeEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2Icon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyAttachment from './CompanyAttachment'
import {
  deleteCompanyAttachment,
  getCompanyAttachmentData,
  getCompanyAttachments,
  postCompanyAttachment
} from '@/services/company/companyService'
import { useToast } from '@/components/ui/use-toast'

interface CompanyUserAttachedDataCardProps {
  companyId: string
}

interface Attachment {
  id: number
  companyId: number
  fileType: string
  fileUrl: string
  userId: number
  title: string
  createdAt: string
  modifiedAt: string
}

const CompanyUserAttachedDataCard: React.FC<CompanyUserAttachedDataCardProps> = ({ companyId }) => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [companyAttachments, setCompanyAttachments] = useState<Attachment[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyAttachments(companyId)
        const returnData = data || []
        setCompanyAttachments(returnData)
      } catch (error) {
        console.error('Failed to fetch company attachments', error)
      }
    }

    fetchData()
  }, [companyId])

  const handleUpload = async (file: File) => {
    setUploadLoading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      await postCompanyAttachment(companyId, data)
      const data1 = await getCompanyAttachments(companyId)
      const returnData = data1 || []
      setCompanyAttachments(returnData)
      toast({
        title: `Attachment uploaded successfully`,
        description: 'You have successfully uploaded an attachment'
      })
    } catch (error) {
      console.error('Error uploading the file:', error)
    }
    setUploadLoading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (attachmentId: string) => {
    try {
      await deleteCompanyAttachment(companyId, attachmentId)
      const data = await getCompanyAttachments(companyId)
      const returnData = data || []
      setCompanyAttachments(returnData)
      toast({
        title: `Attachment deleted successfully`,
        description: 'You have successfully deleted an attachment'
      })
    } catch (error) {
      console.error('Error deleting the attachment:', error)
    }
  }

  const handleDownload = async (attachmentId: string) => {
    try {
      const data = await getCompanyAttachmentData(companyId, attachmentId)
      window.open(data.fileUrl, '_blank')
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      handleUpload(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">User Attached Data</CardTitle>
        <CardDescription>You can attach pdf, jpg, and png files to this company</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-end space-x-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Choose file</Label>
              <Input ref={fileInputRef} id="picture" type="file" name="attachment" onChange={uploadToClient} />
            </div>
            {uploadLoading === true ? (
              <>
                <Button disabled>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              </>
            ) : null}
          </div>
        </div>
        <div className="my-2 flex h-40 flex-wrap overflow-y-auto">
          {companyAttachments.length > 0
            ? companyAttachments?.map((attachment) => (
                <CompanyAttachment
                  key={attachment?.id}
                  fileId={String(attachment?.id)}
                  fileType={attachment.fileType}
                  title={attachment.title}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                />
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyUserAttachedDataCard

import type { ChangeEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ShowToast } from '../ShowToast'
import CompanyAttachment from './CompanyAttachment'
import {
  deleteCompanyAttachment,
  getCompanyAttachmentData,
  getCompanyAttachments,
  postCompanyAttachment
} from '@/services/company/companyService'

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
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [companyAttachments, setCompanyAttachments] = useState<Attachment[]>([])

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
    try {
      const data = new FormData()
      data.append('file', file)
      await postCompanyAttachment(companyId, data)
      const data1 = await getCompanyAttachments(companyId)
      const returnData = data1 || []
      setCompanyAttachments(returnData)
      ShowToast('Success', 'Attachment uploaded successfully')
    } catch (error) {
      console.error('Error uploading the file:', error)
    }
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
      ShowToast('Success', 'Attachment deleted successfully')
    } catch (error) {
      console.error('Error deleting the attachment:', error)
      ShowToast('Error', 'Failed to delete attachment', 'destructive')
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
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">User Attached Data</CardTitle>
            <CardDescription>Attach files in pdf, jpg and png format only</CardDescription>
          </div>
          <Button type="button" variant="outline">
            <label htmlFor="picture">Upload</label>
            <input id="picture" type="file" hidden onChange={uploadToClient} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-2 flex h-72 flex-wrap overflow-y-auto">
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

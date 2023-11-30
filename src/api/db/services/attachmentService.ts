import type { FileType } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createAttachment = async (data: {
  companyId: number
  fileType: FileType
  fileUrl: string
  userId: number
  title: string
}) => {
  try {
    return await prisma.companyAttachment.create({
      data: {
        companyId: data.companyId,
        fileType: data.fileType,
        fileUrl: data.fileUrl,
        userId: data.userId,
        title: data.title
      }
    })
  } catch (error) {
    console.error('Error creating company attachment:', error)
    throw new Error('Unable to create company attachment')
  }
}

const getAttachmentByID = async (id: number) => {
  try {
    const attachment = await prisma.companyAttachment.findUnique({
      where: { id }
    })
    if (!attachment) {
      throw new Error(`Company attachment with ID ${id} not found.`)
    }
    return attachment
  } catch (error) {
    console.error('Error getting the company attachment by ID:', error)
    throw error
  }
}

// get one user's all attachments
const getAllAttachmentsByID = async (userId: number) => {
  try {
    const attachments = await prisma.companyAttachment.findMany({
      where: { userId }
    })
    return attachments
  } catch (error) {
    console.error('Error fetching all your company attachments:', error)
    throw error
  }
}

// only owner can?    userId can't change
const updateAttachment = async (
  id: number,
  data: {
    company_id?: number
    fileType?: FileType
    fileUrl?: string
    title: string
  }
) => {
  try {
    return await prisma.companyAttachment.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating company attachment:', error)
    throw error
  }
}

const deleteAttachment = async (id: number) => {
  try {
    const attachment = await prisma.companyAttachment.delete({
      where: { id }
    })
    return attachment
  } catch (error) {
    console.error('Error deleting attachment:', error)
    throw error
  }
}

export { createAttachment, getAttachmentByID, getAllAttachmentsByID, updateAttachment, deleteAttachment }

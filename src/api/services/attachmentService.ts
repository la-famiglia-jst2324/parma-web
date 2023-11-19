import { FileType } from '@prisma/client';
import { prisma } from '../prismaClient';

const createAttachment = async (data: {
  company_id: string;
  file_type: FileType;
  file_url: string;
  user_id: string;
  title: string;
}) => {
  try {
    return await prisma.companyAttachment.create({
      data: {
        company_id: data.company_id,
        file_type: data.file_type,
        file_url: data.file_url,
        user_id: data.user_id,
        title: data.title,
      },
    });
  } catch (error) {
    console.error('Error creating company attachment:', error);
    throw new Error('Unable to create company attachment');
  }
}

const getAttachmentByID = async (id: string) => {
  try {
    const attachment = await prisma.companyAttachment.findUnique({
      where: { id },
    });
    if (attachment) {
      return attachment;
    } else {
      throw new Error(`Company attachment with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error getting the company attachment by ID:', error);
    throw error;
  }
};

//get one user's all attachments 
const getAllAttachmentsByID = async (user_id: string) => {
  try {
    const attachments = await prisma.companyAttachment.findMany({
      where: { user_id },
    });
    return attachments;
  } catch (error) {
    console.error('Error fetching all your company attachments:', error);
    throw error;
  }
};

// only owner can?    user_id can't change
const updateAttachment = async (id: string, data: {
  company_id?: string;
  file_type?: FileType;
  file_url?: string;
  title: string;
}) => {
  try {
    return await prisma.companyAttachment.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating company attachment:', error);
    throw error;
  }
};

const deleteAttachment = async (id: string) => {
  try {
    const attachment = await prisma.companyAttachment.delete({
      where: { id },
    });
    return attachment;
  } catch (error) {
    console.error('Error deleting attachment:', error);
    throw error;
  }
};

export default {
  createAttachment,
  getAttachmentByID,
  getAllAttachmentsByID,
  updateAttachment,
  deleteAttachment,
};
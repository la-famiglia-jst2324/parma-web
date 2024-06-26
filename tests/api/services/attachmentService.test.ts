import { FileType, PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteCompany, deleteUser } from '../models/utils/helperFunctions'
import {
  createAttachment,
  deleteAttachment,
  getAllAttachmentsForCompany,
  getAttachmentByID,
  updateAttachment
} from '@/api/db/services/attachmentService'
import { createCompany } from '@/api/db/services/companyService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('Company Attachment Model Tests', () => {
  let userId: number
  let companyId: number
  let attachmentId: number

  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
  })
  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: userId })
    companyId = company.id
  })

  test('Create a new attachment with valid details', async () => {
    const attachment = await createAttachment({
      companyId,
      fileType: FileType.JPG,
      fileUrl: 'url',
      userId,
      title: 'attachment for google'
    })
    attachmentId = attachment.id
    expect(attachment).toHaveProperty('id')
    expect(attachment.title).toBe('attachment for google')
    expect(attachment.fileUrl).toBe('url')
    expect(attachment.userId).toBe(userId)
    expect(attachment.companyId).toBe(companyId)
  })
  test('Retrieve an attachment by ID', async () => {
    const attachment = await getAttachmentByID(attachmentId)
    expect(attachment).toBeTruthy()
    expect(attachment?.id).toBe(attachmentId)
  })

  test('Update an attachment', async () => {
    const updatedAttachment = await updateAttachment(attachmentId, {
      fileType: FileType.TEXT,
      fileUrl: 'new url',
      title: 'new title'
    })
    expect(updatedAttachment.fileType).toBe(FileType.TEXT)
    expect(updatedAttachment.fileUrl).toBe('new url')
    expect(updatedAttachment.title).toBe('new title')
  })

  test('Get attachments of a company', async () => {
    // Add a second attachment to the company
    const attachment2 = await createAttachment({
      companyId,
      fileType: FileType.JPG,
      fileUrl: 'another_url',
      userId,
      title: 'attachment for microsoft'
    })
    const attachmentId2 = attachment2.id

    const attachments = await getAllAttachmentsForCompany(companyId)
    expect(attachments).toBeTruthy()
    expect(attachments.length).toEqual(2)
    expect(attachments[0].id).toBe(attachmentId)
    expect(attachments[1].id).toBe(attachmentId2)
    await deleteAttachment(attachmentId2)
  })

  test('Delete an attachment', async () => {
    await deleteAttachment(attachmentId)
    const deletedAttachment = await prisma.companyAttachment.findUnique({
      where: { id: attachmentId }
    })
    expect(deletedAttachment).toBeNull()
  })
})

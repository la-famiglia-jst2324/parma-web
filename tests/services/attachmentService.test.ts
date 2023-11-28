import { FileType, PrismaClient, Role } from '@prisma/client'
import {
  createAttachment,
  deleteAttachment,
  getAttachmentByID,
  updateAttachment
} from '@/api/services/attachmentService'
import { createCompany } from '@/api/services/companyService'
import { createUser } from '@/api/services/userService'
const prisma = new PrismaClient()

describe('Company Attachment Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: number
  let companyId: number
  let attachmentId: number

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', role: Role.USER })
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

  test('Delete an attachment', async () => {
    await deleteAttachment(attachmentId)
    const deletedAttachment = await prisma.companyAttachment.findUnique({
      where: { id: attachmentId }
    })
    expect(deletedAttachment).toBeNull()
  })
})

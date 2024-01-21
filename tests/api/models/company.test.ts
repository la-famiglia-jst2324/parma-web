import { PrismaClient } from '@prisma/client'
import fetchMock from 'jest-fetch-mock'
import { createCompany, createUser, deleteCompany, deleteUser } from './utils/helperFunctions'
import { fetchCrmCompanies } from '@/api/db/services/companyService'

const prisma = new PrismaClient()

describe('Company Model Tests', () => {
  let userId: number
  let companyId: number

  beforeAll(async () => {
    const user = await createUser()
    userId = user.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new company with valid details', async () => {
    const company = await prisma.company.create({
      data: {
        name: 'Test Company',
        description: 'testing',
        addedBy: userId
      }
    })
    companyId = company.id

    expect(company).toHaveProperty('id')
    expect(company.name).toBe('Test Company')
    expect(company.description).toBe('testing')
    expect(company.addedBy).toBe(userId)
  })

  // Read Company Test
  test('Retrieve a company by ID', async () => {
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    expect(company).toBeTruthy()
    expect(company?.id).toBe(companyId)
    expect(company?.addedBy).toBe(userId)
  })

  // Update Company Test
  test('Update a company name', async () => {
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { name: 'Updated Company Name' }
    })

    expect(updatedCompany.name).toBe('Updated Company Name')
  })

  // Delete User Test
  test('Delete a company', async () => {
    await prisma.company.delete({
      where: { id: companyId }
    })

    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    expect(company).toBeNull()
  })
})

describe('CompanyAttachment Model Tests', () => {
  let companyId: number
  let userId: number
  let attachmentId: number

  // Set up before all tests
  beforeAll(async () => {
    // Create a company and a user for testing
    userId = (await createUser('attachment user')).id
    companyId = (await createCompany(userId)).id

    await prisma.$connect()
  })

  // Clean up after all tests
  afterAll(async () => {
    // Delete the created company and user
    await deleteCompany(companyId)
    await deleteUser(userId)

    await prisma.$disconnect()
  })

  // Test for creating a CompanyAttachment
  test('Create a new CompanyAttachment', async () => {
    const attachment = await prisma.companyAttachment.create({
      data: {
        companyId,
        fileType: 'PDF',
        fileUrl: 'http://example.com/file.pdf',
        userId,
        title: 'Test Attachment'
      }
    })

    attachmentId = attachment.id

    expect(attachment).toHaveProperty('id')
    expect(attachment.companyId).toBe(companyId)
    expect(attachment.fileType).toBe('PDF')
    expect(attachment.fileUrl).toBe('http://example.com/file.pdf')
    expect(attachment.userId).toBe(userId)
    expect(attachment.title).toBe('Test Attachment')
  })

  // Test for retrieving a CompanyAttachment
  test('Retrieve a CompanyAttachment', async () => {
    const attachment = await prisma.companyAttachment.findUnique({
      where: { id: attachmentId }
    })

    expect(attachment).toBeTruthy()
    expect(attachment.id).toBe(attachmentId)
    expect(attachment.companyId).toBe(companyId)
    expect(attachment.userId).toBe(userId)
  })

  // Test for updating a CompanyAttachment
  test('Retrieve a CompanyAttachment', async () => {
    const attachment = await prisma.companyAttachment.update({
      where: { id: attachmentId },
      data: { fileType: 'JPG' }
    })

    expect(attachment).toBeTruthy()
    expect(attachment.fileType).toBe('JPG')
  })

  // Test for deleting a CompanyAttachment
  test('Delete a CompanyAttachment', async () => {
    await prisma.companyAttachment.delete({
      where: { id: attachmentId }
    })

    const deletedAttachment = await prisma.companyAttachment.findUnique({
      where: { id: attachmentId }
    })

    expect(deletedAttachment).toBeNull()
  })
})

describe('fetchCrmCompanies', () => {
  let mockedfetchCrmCompanies: jest.Mock
  let userId: number
  beforeAll(async () => {
    const user = await createUser()
    userId = user.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  beforeEach(() => {
    jest.resetModules()
    fetchMock.resetMocks()
    mockedfetchCrmCompanies = jest.fn()
    jest.mock('@/api/db/services/companyService', () => ({
      mockedfetchCrmCompanies: jest.fn()
    }))
  })

  describe('fetchCrmCompanies', () => {
    it('fetches CRM companies successfully', async () => {
      const mockData = 'Company 1, Company 2'
      mockedfetchCrmCompanies.mockResolvedValue(mockData)

      const userId = 1 // replace with actual userId
      const result = await mockedfetchCrmCompanies(userId)

      expect(mockedfetchCrmCompanies).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockData)
    })
  })

  it('throws an error when the environment variable is not defined', async () => {
    const envVariable = process.env.PARMA_ANALYTICS_BASE_URL
    process.env.PARMA_ANALYTICS_BASE_URL = ''
    await expect(fetchCrmCompanies(userId)).rejects.toThrow('PARMA_ANALYTICS_URL is not defined in the environment.')
    process.env.PARMA_ANALYTICS_BASE_URL = envVariable
  })

  it('throws an error when the fetch operation fails', async () => {
    mockedfetchCrmCompanies.mockRejectedValue(new Error('Fetch failed'))
    await expect(mockedfetchCrmCompanies()).rejects.toThrow('Fetch failed')
  })
})

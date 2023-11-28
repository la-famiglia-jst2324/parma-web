import { PrismaClient, Role } from '@prisma/client'
import userService from '@/api/services/userService'
import companyService from '@/api/services/companyService'

const { createUser } = userService
const { createCompany, deleteCompany, updateCompany, getCompanyByID } = companyService
const prisma = new PrismaClient()

describe('Company Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: number
  let companyId: number

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', role: Role.USER })
    userId = user.id
  })

  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: userId })
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(userId)
  })

  test('Retrieve a company by ID', async () => {
    const company = await getCompanyByID(companyId)
    expect(company).toBeTruthy()
    expect(company?.id).toBe(companyId)
  })

  test('Update a company name', async () => {
    const updatedCompany = await updateCompany(companyId, { name: 'github' })
    expect(updatedCompany.name).toBe('github')
  })

  test('Delete a company', async () => {
    await deleteCompany(companyId)
    const deletedCompany = await prisma.company.findUnique({
      where: { id: companyId }
    })
    expect(deletedCompany).toBeNull()
  })
})

import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createUserCompanyCustomization,
  getCompanyCustomizationsByCustomizationId
} from '@/api/db/services/userCompanyCustomizationService'
import { createUserCustomization } from '@/api/db/services/userCustomizationService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('UserCustomization Model Tests', () => {
  let userId: number
  let userCustomizationId: number
  let companyId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    const userCustomization = await createUserCustomization({ name: 'Customization Test', userId: user.id })
    const company = await createCompany({ name: 'BMW', addedBy: user.id })
    userId = user.id
    userCustomizationId = userCustomization.id
    companyId = company.id
    await prisma.$connect()
  })
  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user company customization with valid details', async () => {
    const userCompanyCustomization = await createUserCompanyCustomization({
      customizationId: userCustomizationId,
      companyId
    })

    expect(userCompanyCustomization).toHaveProperty('id')
    expect(userCompanyCustomization).toHaveProperty('customizationId')
    expect(userCompanyCustomization).toHaveProperty('companyId')
  })

  test('Retrieve user company customizations by id', async () => {
    const userCompanyCustomizations = await getCompanyCustomizationsByCustomizationId(userCustomizationId)

    expect(Array.isArray(userCompanyCustomizations)).toBe(true)
    expect(userCompanyCustomizations.length).toBeGreaterThan(0)
    if (userCompanyCustomizations.length > 0) {
      expect(userCompanyCustomizations[0]).toHaveProperty('id')
      expect(userCompanyCustomizations[0]).toHaveProperty('customizationId')
      expect(userCompanyCustomizations[0]).toHaveProperty('companyId')
    }
  })
})

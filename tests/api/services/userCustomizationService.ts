import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createUserCustomization,
  deleteUserCustomization,
  getUserCustomizations
} from '@/api/db/services/userCustomizationService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('UserCustomization Model Tests', () => {
  let userId: number
  let userCustomizationId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
    await prisma.$connect()
  })
  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user customization with valid details', async () => {
    const userCustomization = await createUserCustomization({ name: 'Customization Test', userId })
    userCustomizationId = userCustomization.id

    expect(userCustomization).toHaveProperty('id')
    expect(userCustomization.name).toBe('Customization Test')
    expect(userCustomization.userId).toBe(userId)
    expect(userCustomization.userId).toEqual(userId)
  })

  test('Retrieve all user customizations', async () => {
    const userCustomizations = await getUserCustomizations(userId)

    expect(Array.isArray(userCustomizations)).toBe(true)
    expect(userCustomizations.length).toBeGreaterThan(0)
    if (userCustomizations.length > 0) {
      expect(userCustomizations[0]).toHaveProperty('id')
      expect(userCustomizations[0]).toHaveProperty('userId')
      expect(userCustomizations[0]).toHaveProperty('name')
    }
  })

  test('Delete a user customization', async () => {
    await deleteUserCustomization(userCustomizationId)
    const deletedCustomization = await prisma.userCustomization.findUnique({
      where: { id: userCustomizationId }
    })
    expect(deletedCustomization).toBeNull()
  })
})

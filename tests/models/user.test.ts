import { PrismaClient } from '@prisma/client'
import {
  createUser,
  deleteUser,
  createCompany,
  deleteCompany,
  deleteDataSource,
  createDataSource
} from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('User Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: number

  // Create User Test
  test('Create a new user with valid details', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        role: 'USER'
      }
    })

    userId = user.id // Store the user ID for later use

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John Doe')
    expect(user.role).toBe('USER')
  })

  test('Create a new user with valid details', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Mr Burns',
        role: 'ADMIN'
      }
    })

    userId = user.id // Store the user ID for later use

    expect(user).toHaveProperty('id')
    expect(user.role).toBe('ADMIN')
  })

  // Read User Test
  test('Retrieve a user by ID', async () => {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    expect(user).toBeTruthy()
    expect(user?.id).toBe(userId)
  })

  // Update User Test
  test('Update a user name', async () => {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: 'Jane Doe' }
    })

    expect(updatedUser.name).toBe('Jane Doe')
  })

  // Delete User Test
  test('Delete a user', async () => {
    await prisma.user.delete({
      where: { id: userId }
    })

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    expect(user).toBeNull()
  })
})

describe('UserImportantMeasurementPreference Model Tests', () => {
  let dataSourceId: number
  let userId: number

  beforeAll(async () => {
    dataSourceId = (await createDataSource()).id
    userId = (await createUser()).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create UserImportantMeasurementPreference Test
  test('Create a new UserImportantMeasurementPreference', async () => {
    const importantFieldName = 'SampleField'
    const preference = await prisma.userImportantMeasurementPreference.create({
      data: {
        dataSourceId,
        userId,
        importantFieldName
      }
    })

    expect(preference).toHaveProperty('dataSourceId')
    expect(preference.dataSourceId).toBe(dataSourceId)
    expect(preference.userId).toBe(userId)
    expect(preference.importantFieldName).toBe(importantFieldName)
  })

  // Read UserImportantMeasurementPreference Test
  test('Retrieve a UserImportantMeasurementPreference', async () => {
    const importantFieldName = 'SampleField'

    const preference = await prisma.userImportantMeasurementPreference.findUnique({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      }
    })

    expect(preference).toBeTruthy()
    expect(preference.dataSourceId).toBe(dataSourceId)
    expect(preference.userId).toBe(userId)
    expect(preference.importantFieldName).toBe(preference.importantFieldName)
  })

  // Update UserImportantMeasurementPreference Test
  test('Update a UserImportantMeasurementPreference', async () => {
    const importantFieldName = 'SampleField'
    const updatedFieldName = 'UpdatedField'
    const updatedPreference = await prisma.userImportantMeasurementPreference.update({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      },
      data: { importantFieldName: updatedFieldName }
    })

    expect(updatedPreference.importantFieldName).toBe(updatedFieldName)
  })

  // Delete UserImportantMeasurementPreference Test
  test('Delete a UserImportantMeasurementPreference', async () => {
    const importantFieldName = 'UpdatedField'

    await prisma.userImportantMeasurementPreference.delete({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      }
    })

    const preference = await prisma.userImportantMeasurementPreference.findUnique({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      }
    })

    expect(preference).toBeNull()
  })
})

describe('NewsSubscription Model Tests', () => {
  let userId: number
  let companyId: number

  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new NewsSubscription', async () => {
    const subscription = await prisma.newsSubscription.create({
      data: {
        userId,
        companyId
      }
    })

    expect(subscription).toHaveProperty('userId', userId)
    expect(subscription).toHaveProperty('companyId', companyId)
  })

  test('Retrieve a NewsSubscription', async () => {
    const subscription = await prisma.newsSubscription.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })

    expect(subscription).toHaveProperty('userId', userId)
    expect(subscription).toHaveProperty('companyId', companyId)
  })

  test('Delete a NewsSubscription', async () => {
    await prisma.newsSubscription.delete({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })

    const deletedSubscription = await prisma.newsSubscription.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })

    expect(deletedSubscription).toBeNull()
  })
})

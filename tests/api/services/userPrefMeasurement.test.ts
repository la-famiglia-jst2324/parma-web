import { PrismaClient, Role, Frequency, HealthStatus, DataSourceType } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { createDataSource, deleteDataSource } from '@/api/db/services/dataSourceService'
import { createUserPref, deleteUserPref, getUserPrefByID } from '@/api/db/services/userMeasurementPrefService'
import { createUser, deleteUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('User Preference Measurement Model Tests', () => {
  let dataSourceId: number
  let userId: number
  const importantFieldName: string = 'importantFieldName'
  let userPreId: { dataSourceId: number; userId: number; importantFieldName: string }

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const dataSource = await createDataSource({
      sourceName: 'source1',
      sourceType: DataSourceType.GITHUB,
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a data source',
      invocationEndpoint: 'dummy endpoint'
    })
    userId = user.id
    dataSourceId = dataSource.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })
  test('Create a new notification Subscription', async () => {
    const preference = await createUserPref({ dataSourceId, userId, importantFieldName })
    userPreId = {
      dataSourceId: preference.dataSourceId,
      userId: preference.userId,
      importantFieldName
    }
    expect(preference).toHaveProperty('userId')
    expect(preference.userId).toBe(userId)
    expect(preference.dataSourceId).toBe(dataSourceId)
    expect(preference.importantFieldName).toBe('importantFieldName')
  })

  test('Retrieve a notification Subscription', async () => {
    const preference = await getUserPrefByID(userPreId.dataSourceId, userPreId.userId, userPreId.importantFieldName)
    userPreId = {
      userId: preference.userId,
      dataSourceId: preference.dataSourceId,
      importantFieldName: preference.importantFieldName
    }
    expect(preference).toHaveProperty('userId')
    expect(preference.userId).toBe(userId)
    expect(preference.dataSourceId).toBe(dataSourceId)
    expect(preference.importantFieldName).toBe('importantFieldName')
  })

  test('Delete a notification Subscription', async () => {
    await deleteUserPref(userPreId.dataSourceId, userPreId.userId, userPreId.importantFieldName)
    const deletedPreference = await prisma.userImportantMeasurementPreference.findUnique({
      where: {
        dataSourceId_userId_importantFieldName: {
          userId: userPreId.userId,
          dataSourceId: userPreId.dataSourceId,
          importantFieldName: userPreId.importantFieldName
        }
      }
    })
    expect(deletedPreference).toBeNull()
  })
})

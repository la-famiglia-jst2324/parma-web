import { PrismaClient, Role, HealthStatus, Frequency } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createUserMetricCustomization,
  getAllUserMetricsByCustomizationId
} from '@/api/db/services/userMetricCustomizationService'
import { createUserCustomization } from '@/api/db/services/userCustomizationService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createCompany } from '@/api/db/services/companyService'
import { createUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('UserMetricCustomization Model Tests', () => {
  let userCustomizationId: number
  let sourceMeasurementId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    const userCustomization = await createUserCustomization({ name: 'Customization Test', userId: user.id })
    const dataSource = await createDataSource({
      sourceName: 'name',
      isActive: true,
      defaultFrequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP
    })
    const company = await createCompany({ name: 'test', addedBy: user.id })
    const sourceMeasurement = await createSourceMeasurement({
      sourceModuleId: dataSource.id,
      type: 'test',
      companyId: company.id,
      measurementName: 'test'
    })
    userId = user.id
    userCustomizationId = userCustomization.id
    companyId = company.id
    sourceMeasurementId = sourceMeasurement.id
    await prisma.$connect()
  })
  afterAll(async () => {
    // await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user metric customization with valid details', async () => {
    const userMetricCustomization = await createUserMetricCustomization({
      customizationId: userCustomizationId,
      sourceMeasurementId
    })

    expect(userMetricCustomization).toHaveProperty('id')
    expect(userMetricCustomization).toHaveProperty('customizationId')
    expect(userMetricCustomization).toHaveProperty('sourceMeasurementId')
  })

  test('Retrieve user metric customizations by id', async () => {
    const userCompanyCustomizations = await getAllUserMetricsByCustomizationId(userCustomizationId)

    expect(Array.isArray(userCompanyCustomizations)).toBe(true)
    expect(userCompanyCustomizations.length).toBeGreaterThan(0)
    if (userCompanyCustomizations.length > 0) {
      expect(userCompanyCustomizations[0]).toHaveProperty('id')
      expect(userCompanyCustomizations[0]).toHaveProperty('customizationId')
      expect(userCompanyCustomizations[0]).toHaveProperty('sourceMeasurementId')
    }
  })
})

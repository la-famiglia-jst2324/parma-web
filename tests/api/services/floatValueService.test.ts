import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createCompanySourceMeasurement,
  deleteCompany,
  deleteDataSource,
  deleteUser
} from '../models/utils/helperFunctions'
import { createCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import {
  createFloatValue,
  deleteFloatValue,
  getFloatValueByID,
  updateFloatValue
} from '@/api/db/services/floatValueService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('float value Model Tests', () => {
  let floatValueId: number
  let companyMeasurementId: number
  let sourceMeasurementId: number
  let companyId: number
  let dataSourceId: number
  let userId: number

  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
  })
  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: userId })
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(userId)
    companyId = company.id
  })

  test('Create a new data source with valid details', async () => {
    const dataSource = await await createDataSource({
      sourceName: 'source1',
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      invocationEndpoint: 'dummy endpoint'
    })
    dataSourceId = dataSource.id
    expect(dataSource).toHaveProperty('id')
    expect(dataSource.sourceName).toBe('source1')
    expect(dataSource.isActive).toBe(true)
    expect(dataSource.frequency).toBe(Frequency.DAILY)
    expect(dataSource.healthStatus).toBe(HealthStatus.UP)
  })

  test('Create a new sourceMeasurement with valid details', async () => {
    const sourceMeasurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'int',
      measurementName: 'intMea'
    })

    sourceMeasurementId = sourceMeasurement.id
    const companyMeasurement = await createCompanySourceMeasurement(sourceMeasurementId, companyId)
    companyMeasurementId = companyMeasurement.companyMeasurementId
    expect(companyMeasurement).toHaveProperty('companyMeasurementId')
    expect(companyMeasurement.companyId).toBe(companyId)
  })

  test('Create a new float value with valid details', async () => {
    const floatValue = await createFloatValue({ companyMeasurementId, value: 1.1, timestamp: new Date() })
    floatValueId = floatValue.id
    expect(floatValue).toHaveProperty('id')
    expect(floatValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(floatValue.value).toBe(1.1)
  })

  test('Retrieve a float value by ID', async () => {
    const floatValue = await getFloatValueByID(floatValueId)
    expect(floatValue).toBeTruthy()
    expect(floatValue?.id).toBe(floatValueId)
  })

  test('Update a float value name', async () => {
    const updatedValue = await updateFloatValue(floatValueId, {
      companyMeasurementId,
      value: 2.0
    })
    expect(updatedValue.value).toBe(2.0)
  })

  test('Delete an int value', async () => {
    await deleteFloatValue(floatValueId)
    const deletedValue = await prisma.measurementFloatValue.findUnique({
      where: { id: floatValueId }
    })
    expect(deletedValue).toBeNull()
  })
})
 
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
  createNestedValue,
  getNestedValueByID,
  getAllNestedValues,
  updateNestedValue,
  deleteNestedValue
} from '@/api/db/services/nestedValueService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('nested value Model Tests', () => {
  let nestedValueId: number
  let sourceMeasurementId: number
  let companyMeasurementId: number
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
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(userId)
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

  test('Create a new sourceMeasurement and companyMeasurement with valid details', async () => {
    const sourceMeasurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'nested',
      measurementName: 'nestedMea'
    })

    sourceMeasurementId = sourceMeasurement.id
    const companyMeasurement = await createCompanySourceMeasurement(sourceMeasurementId, companyId)
    companyMeasurementId = companyMeasurement.companyMeasurementId

    expect(companyMeasurement).toHaveProperty('companyMeasurementId')
    expect(companyMeasurement.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(companyMeasurement.companyId).toBe(companyId)
  })

  test('Create a new nested value with valid details', async () => {
    const nestedValue = await createNestedValue({ companyMeasurementId, value: 'nested', timestamp: new Date() })
    nestedValueId = nestedValue.id
    expect(nestedValue).toHaveProperty('id')
    expect(nestedValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(nestedValue.value).toBe('nested')
  })

  test('Retrieve a nested value by ID', async () => {
    const nestedValue = await getNestedValueByID(nestedValueId)
    expect(nestedValue).toBeTruthy()
    expect(nestedValue?.id).toBe(nestedValueId)
  })

  test('Retrieve all nested values', async () => {
    const nestedValues = await getAllNestedValues()
    expect(nestedValues).toBeTruthy()
    expect(nestedValues[0]?.id).toBe(nestedValueId)
  })

  test('Update a nested value', async () => {
    const updatedValue = await updateNestedValue(nestedValueId, {
      companyMeasurementId,
      value: 'updated nested'
    })
    expect(updatedValue.value).toBe('updated nested')
  })

  test('Delete a image value', async () => {
    await deleteNestedValue(nestedValueId)
    const deletedValue = await prisma.measurementImageValue.findUnique({
      where: { id: nestedValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

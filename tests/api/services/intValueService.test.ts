import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { createCompanySourceMeasurement } from '../models/utils/helperFunctions'
import { createCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createIntValue, deleteIntValue, getIntValueByID, updateIntValue } from '@/api/db/services/intValueService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('int value Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let intValueId: number
  let sourceMeasurementId: number
  let companyMeasurementId: number
  let companyId: number
  let dataSourceId: number
  let userId: number
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
      type: 'int',
      measurementName: 'intMea'
    })

    sourceMeasurementId = sourceMeasurement.id
    const companyMeasurement = await createCompanySourceMeasurement(sourceMeasurementId, companyId)
    companyMeasurementId = companyMeasurement.companyMeasurementId

    expect(companyMeasurement).toHaveProperty('companyMeasurementId')
    expect(companyMeasurement.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(companyMeasurement.companyId).toBe(companyId)
  })

  test('Create a new int value with valid details', async () => {
    const intValue = await createIntValue({ companyMeasurementId, value: 1, timestamp: new Date() })
    intValueId = intValue.id
    expect(intValue).toHaveProperty('id')
    expect(intValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(intValue.value).toBe(1)
  })

  test('Retrieve a int value by ID', async () => {
    const intValue = await getIntValueByID(intValueId)
    expect(intValue).toBeTruthy()
    expect(intValue?.id).toBe(intValueId)
  })

  test('Update a int value name', async () => {
    const updatedValue = await updateIntValue(intValueId, {
      companyMeasurementId,
      value: 2
    })
    expect(updatedValue.value).toBe(2)
  })

  test('Delete a int value', async () => {
    await deleteIntValue(intValueId)
    const deletedValue = await prisma.measurementIntValue.findUnique({
      where: { id: intValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

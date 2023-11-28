import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import floatValueService from '@/api/services/floatValueService'
import companyService from '@/api/services/companyService'
import dataSourceService from '@/api/services/dataSourceService'
import sourceMeasurementService from '@/api/services/sourceMeasurementService'
import userService from '@/api/services/userService'
const { createUser } = userService
const { createCompany } = companyService
const { createFloatValue, getFloatValueByID, updateFloatValue, deleteFloatValue } = floatValueService
const { createDataSource } = dataSourceService
const { createSourceMeasurement } = sourceMeasurementService
const prisma = new PrismaClient()

describe('float value Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let floatValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let dataSourceId: number
  let userId: number
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

  test('Create a new data source with valid details', async () => {
    const dataSource = await await createDataSource({
      sourceName: 'source1',
      isActive: true,
      defaultFrequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP
    })
    dataSourceId = dataSource.id
    expect(dataSource).toHaveProperty('id')
    expect(dataSource.sourceName).toBe('source1')
    expect(dataSource.isActive).toBe(true)
    expect(dataSource.defaultFrequency).toBe(Frequency.DAILY)
    expect(dataSource.healthStatus).toBe(HealthStatus.UP)
  })

  test('Create a new sourceMeasurement with valid details', async () => {
    const sourceMeasurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'float',
      companyId,
      measurementName: 'floatMea'
    })
    sourceMeasurementId = sourceMeasurement.id
    expect(sourceMeasurement).toHaveProperty('id')
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.type).toBe('float')
    expect(sourceMeasurement.companyId).toBe(companyId)
    expect(sourceMeasurement.measurementName).toBe('floatMea')
  })

  test('Create a new float value with valid details', async () => {
    const floatValue = await createFloatValue({ sourceMeasurementId, value: 1.1 })
    floatValueId = floatValue.id
    expect(floatValue).toHaveProperty('id')
    expect(floatValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(floatValue.value).toBe(1.1)
  })

  test('Retrieve a float value by ID', async () => {
    const floatValue = await getFloatValueByID(floatValueId)
    expect(floatValue).toBeTruthy()
    expect(floatValue?.id).toBe(floatValueId)
  })

  test('Update a float value name', async () => {
    const updatedValue = await updateFloatValue(floatValueId, {
      sourceMeasurementId,
      value: 2.0
    })
    expect(updatedValue.value).toBe(2.0)
  })

  test('Delete a int value', async () => {
    await deleteFloatValue(floatValueId)
    const deletedValue = await prisma.measurementFloatValue.findUnique({
      where: { id: floatValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

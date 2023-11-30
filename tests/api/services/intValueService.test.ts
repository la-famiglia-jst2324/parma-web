import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { createCompany } from '@/pages/api/services/companyService'
import { createDataSource } from '@/pages/api/services/dataSourceService'
import { createIntValue, deleteIntValue, getIntValueByID, updateIntValue } from '@/pages/api/services/intValueService'
import { createSourceMeasurement } from '@/pages/api/services/sourceMeasurementService'
import { createUser } from '@/pages/api/services/userService'
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
      type: 'int',
      companyId,
      measurementName: 'intMea'
    })
    sourceMeasurementId = sourceMeasurement.id
    expect(sourceMeasurement).toHaveProperty('id')
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.type).toBe('int')
    expect(sourceMeasurement.companyId).toBe(companyId)
    expect(sourceMeasurement.measurementName).toBe('intMea')
  })

  test('Create a new int value with valid details', async () => {
    const intValue = await createIntValue({ sourceMeasurementId, value: 1 })
    intValueId = intValue.id
    expect(intValue).toHaveProperty('id')
    expect(intValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(intValue.value).toBe(1)
  })

  test('Retrieve a int value by ID', async () => {
    const intValue = await getIntValueByID(intValueId)
    expect(intValue).toBeTruthy()
    expect(intValue?.id).toBe(intValueId)
  })

  test('Update a int value name', async () => {
    const updatedValue = await updateIntValue(intValueId, {
      sourceMeasurementId,
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

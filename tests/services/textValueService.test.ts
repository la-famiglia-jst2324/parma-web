import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { createCompany } from '@/api/services/companyService'
import { createDataSource } from '@/api/services/dataSourceService'
import { createSourceMeasurement } from '@/api/services/sourceMeasurementService'
import { createTextValue, deleteTextValue, getTextValueByID, updateTextValue } from '@/api/services/textValueService'
import { createUser } from '@/api/services/userService'
const prisma = new PrismaClient()

describe('text value Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let textValueId: number
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

  test('Create a new text value with valid details', async () => {
    const textValue = await createTextValue({ sourceMeasurementId, value: 'text' })
    textValueId = textValue.id
    expect(textValue).toHaveProperty('id')
    expect(textValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(textValue.value).toBe('text')
  })

  test('Retrieve a text value by ID', async () => {
    const textValue = await getTextValueByID(textValueId)
    expect(textValue).toBeTruthy()
    expect(textValue?.id).toBe(textValueId)
  })

  test('Update text value', async () => {
    const updatedValue = await updateTextValue(textValueId, {
      sourceMeasurementId,
      value: 'updatedTextValue'
    })
    expect(updatedValue.value).toBe('updatedTextValue')
  })

  test('Delete a text value', async () => {
    await deleteTextValue(textValueId)
    const deletedValue = await prisma.measurementTextValue.findUnique({
      where: { id: textValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

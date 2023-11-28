import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { genRandomDummyAuthId } from './utils/random'
import { createCompany } from '@/pages/api/services/companyService'
import { createDataSource } from '@/pages/api/services/dataSourceService'
import {
  createParagraphValue,
  deleteParagraphValue,
  getParagraphValueByID,
  updateParagraphValue
} from '@/pages/api/services/paragraphValueService'
import { createSourceMeasurement } from '@/pages/api/services/sourceMeasurementService'
import { createUser } from '@/pages/api/services/userService'
const prisma = new PrismaClient()

describe('text value Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let paragraphValueId: number
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

  test('Create a new paragraph value with valid details', async () => {
    const paragraphValue = await createParagraphValue({ sourceMeasurementId, value: 'paragraph' })
    paragraphValueId = paragraphValue.id
    expect(paragraphValue).toHaveProperty('id')
    expect(paragraphValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(paragraphValue.value).toBe('paragraph')
  })

  test('Retrieve a paragraph value by ID', async () => {
    const paragraphValue = await getParagraphValueByID(paragraphValueId)
    expect(paragraphValue).toBeTruthy()
    expect(paragraphValue?.id).toBe(paragraphValueId)
  })

  test('Update paragraph value', async () => {
    const updatedValue = await updateParagraphValue(paragraphValueId, {
      sourceMeasurementId,
      value: 'updatedParaValue'
    })
    expect(updatedValue.value).toBe('updatedParaValue')
  })

  test('Delete a paragraph value', async () => {
    await deleteParagraphValue(paragraphValueId)
    const deletedValue = await prisma.measurementParagraphValue.findUnique({
      where: { id: paragraphValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

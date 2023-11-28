import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import commentValueService from '@/api/services/commentValueService'
import companyService from '@/api/services/companyService'
import dataSourceService from '@/api/services/dataSourceService'
import sourceMeasurementService from '@/api/services/sourceMeasurementService'
import userService from '@/api/services/userService'
const { createUser } = userService
const { createCompany } = companyService
const { createCommentValue, getCommentValueByID, updateCommentValue, deleteCommentValue } = commentValueService
const { createDataSource } = dataSourceService
const { createSourceMeasurement } = sourceMeasurementService
const prisma = new PrismaClient()

describe('comment value Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let commentValueId: number
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

  test('Create a new comment value with valid details', async () => {
    const commentValue = await createCommentValue({ sourceMeasurementId, value: 'comment' })
    commentValueId = commentValue.id
    expect(commentValue).toHaveProperty('id')
    expect(commentValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(commentValue.value).toBe('comment')
  })

  test('Retrieve a comment value by ID', async () => {
    const commentValue = await getCommentValueByID(commentValueId)
    expect(commentValue).toBeTruthy()
    expect(commentValue?.id).toBe(commentValueId)
  })

  test('Update a comment value name', async () => {
    const updatedValue = await updateCommentValue(commentValueId, {
      sourceMeasurementId,
      value: 'updatedComment'
    })
    expect(updatedValue.value).toBe('updatedComment')
  })

  test('Delete a comment value', async () => {
    await deleteCommentValue(commentValueId)
    const deletedValue = await prisma.measurementCommentValue.findUnique({
      where: { id: commentValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

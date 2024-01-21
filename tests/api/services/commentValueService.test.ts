import { PrismaClient, Frequency, HealthStatus, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createCompanySourceMeasurement,
  deleteCompany,
  deleteDataSource,
  deleteUser
} from '../models/utils/helperFunctions'
import {
  createCommentValue,
  deleteCommentValue,
  getCommentValueByID,
  updateCommentValue
} from '@/api/db/services/commentValueService'
import { createCompany } from '@/api/db/services/companyService'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('comment value Model Tests', () => {
  let commentValueId: number
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

  test('Create a new comment value with valid details', async () => {
    const commentValue = await createCommentValue({
      companyMeasurementId,
      value: 'comment',
      timestamp: new Date(),
      sentimentScore: 8
    })
    commentValueId = commentValue.id
    expect(commentValue).toHaveProperty('id')
    expect(commentValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(commentValue.value).toBe('comment')
    expect(commentValue.sentimentScore).toBe(8)
  })

  test('Retrieve a comment value by ID', async () => {
    const commentValue = await getCommentValueByID(commentValueId)
    expect(commentValue).toBeTruthy()
    expect(commentValue?.id).toBe(commentValueId)
  })

  test('Update a comment value name', async () => {
    const updatedValue = await updateCommentValue(commentValueId, {
      companyMeasurementId,
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

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
  createLinkValue,
  getLinkValueByID,
  getAllLinkValues,
  updateLinkValue,
  deleteLinkValue
} from '@/api/db/services/linkValueService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('nested value Model Tests', () => {
  let linkValueId: number
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
      type: 'link',
      measurementName: 'linkMea'
    })

    sourceMeasurementId = sourceMeasurement.id
    const companyMeasurement = await createCompanySourceMeasurement(sourceMeasurementId, companyId)
    companyMeasurementId = companyMeasurement.companyMeasurementId

    expect(companyMeasurement).toHaveProperty('companyMeasurementId')
    expect(companyMeasurement.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(companyMeasurement.companyId).toBe(companyId)
  })

  test('Create a new link value with valid details', async () => {
    const linkValue = await createLinkValue({ companyMeasurementId, value: 'link', timestamp: new Date() })
    linkValueId = linkValue.id
    expect(linkValue).toHaveProperty('id')
    expect(linkValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(linkValue.value).toBe('link')
  })

  test('Retrieve a link value by ID', async () => {
    const linkValue = await getLinkValueByID(linkValueId)
    expect(linkValue).toBeTruthy()
    expect(linkValue?.id).toBe(linkValueId)
  })

  test('Retrieve all link values', async () => {
    const linkValues = await getAllLinkValues()
    expect(linkValues).toBeTruthy()
    expect(linkValues[0]?.id).toBe(linkValueId)
  })

  test('Update a link value', async () => {
    const updatedValue = await updateLinkValue(linkValueId, {
      companyMeasurementId,
      value: 'updated link'
    })
    expect(updatedValue.value).toBe('updated link')
  })

  test('Delete a link value', async () => {
    await deleteLinkValue(linkValueId)
    const deletedValue = await prisma.measurementLinkValue.findUnique({
      where: { id: linkValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

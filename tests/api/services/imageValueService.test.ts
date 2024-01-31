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
  createImageValue,
  getImageValueByID,
  getAllImageValues,
  updateImageValue,
  deleteImageValue
} from '@/api/db/services/imageValueService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('image value Model Tests', () => {
  let imageValueId: number
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
      type: 'image',
      measurementName: 'imageMea'
    })

    sourceMeasurementId = sourceMeasurement.id
    const companyMeasurement = await createCompanySourceMeasurement(sourceMeasurementId, companyId)
    companyMeasurementId = companyMeasurement.companyMeasurementId

    expect(companyMeasurement).toHaveProperty('companyMeasurementId')
    expect(companyMeasurement.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(companyMeasurement.companyId).toBe(companyId)
  })

  test('Create a new image value with valid details', async () => {
    const imageValue = await createImageValue({ companyMeasurementId, value: 'image', timestamp: new Date() })
    imageValueId = imageValue.id
    expect(imageValue).toHaveProperty('id')
    expect(imageValue.companyMeasurementId).toBe(companyMeasurementId)
    expect(imageValue.value).toBe('image')
  })

  test('Retrieve a image value by ID', async () => {
    const imageValue = await getImageValueByID(imageValueId)
    expect(imageValue).toBeTruthy()
    expect(imageValue?.id).toBe(imageValueId)
  })

  test('Retrieve all image values', async () => {
    const imageValues = await getAllImageValues()
    expect(imageValues).toBeTruthy()
    expect(imageValues[0]?.id).toBe(imageValueId)
  })

  test('Update a image value', async () => {
    const updatedValue = await updateImageValue(imageValueId, {
      companyMeasurementId,
      value: 'updated image'
    })
    expect(updatedValue.value).toBe('updated image')
  })

  test('Delete a image value', async () => {
    await deleteImageValue(imageValueId)
    const deletedValue = await prisma.measurementImageValue.findUnique({
      where: { id: imageValueId }
    })
    expect(deletedValue).toBeNull()
  })
})

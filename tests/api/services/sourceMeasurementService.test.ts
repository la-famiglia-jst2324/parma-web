import { Frequency, HealthStatus, PrismaClient } from '@prisma/client'
import { createDataSource } from '@/api/db/services/dataSourceService'
import {
  createSourceMeasurement,
  getSourceMeasurementByID,
  getAllSourceMeasurements,
  getMeasurementsBySourceId,
  updateSourceMeasurement,
  deleteSourceMeasurement
} from '@/api/db/services/sourceMeasurementService'
const prisma = new PrismaClient()

describe('Source Measurement Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let dataSourceId: number
  let measurementId: number
  test('Create a new data source with valid details', async () => {
    const dataSource = await createDataSource({
      sourceName: 'source1',
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a new data source',
      invocationEndpoint: 'dummy endpoint'
    })
    expect(dataSource).toHaveProperty('id')
    dataSourceId = dataSource.id
  })

  test('Create a new source measurement with valid details', async () => {
    const measurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'int',
      measurementName: '# of followers'
    })
    expect(measurement).toHaveProperty('id')
    measurementId = measurement.id
  })
  test('Retrieve a source measurement by ID', async () => {
    const measurement = await getSourceMeasurementByID(measurementId)
    expect(measurement).toBeTruthy()
    expect(measurement?.id).toBe(measurementId)
    expect(measurement?.type).toBe('int')
  })

  test('Retrieve a source measurement for non existing id', async () => {
    const id = -1
    await expect(getSourceMeasurementByID(id)).rejects.toThrow(`source measurement with ID ${id} not found.`)
  })

  test('Retrieve all source measurements', async () => {
    const measurements = await getAllSourceMeasurements()
    expect(measurements).toBeTruthy()
    expect(measurements[0]?.type).toBe('int')
  })

  test('Retrieve all source measurements of a data source', async () => {
    const measurements = await getMeasurementsBySourceId(dataSourceId)
    expect(measurements).toBeTruthy()
    expect(measurements[0]?.id).toBe(measurementId)
    expect(measurements[0]?.type).toBe('int')
  })

  test('Update a source measurement name', async () => {
    const updatedMeasurement = await updateSourceMeasurement(measurementId, {
      type: 'float'
    })
    expect(updatedMeasurement.type).toBe('float')
  })

  test('Delete a source measurement', async () => {
    await deleteSourceMeasurement(measurementId)
    const deletedMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: measurementId }
    })
    expect(deletedMeasurement).toBeNull()
  })
})

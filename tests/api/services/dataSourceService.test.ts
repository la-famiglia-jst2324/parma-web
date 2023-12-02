import { Frequency, HealthStatus, PrismaClient } from '@prisma/client'
import {
  createDataSource,
  deleteDataSource,
  getAllDataSources,
  getDataSourceByID,
  updateDataSource
} from '@/api/db/services/dataSourceService'

const prisma = new PrismaClient()

describe('Data Source Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let dataSourceId: number

  test('Create a new data source with valid details', async () => {
    const dataSource = await createDataSource({
      sourceName: 'source1',
      isActive: true,
      defaultFrequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a new data source'
    })
    dataSourceId = dataSource.id
    expect(dataSource).toHaveProperty('id')
    expect(dataSource.sourceName).toBe('source1')
    expect(dataSource.isActive).toBe(true)
    expect(dataSource.defaultFrequency).toBe(Frequency.DAILY)
    expect(dataSource.healthStatus).toBe(HealthStatus.UP)
    expect(dataSource.description).toBe('a new data source')
  })

  test('Retrieve a data source by ID', async () => {
    const dataSource = await getDataSourceByID(dataSourceId)
    expect(dataSource).toBeTruthy()
    expect(dataSource?.id).toBe(dataSourceId)
  })

  test('Update a data source name', async () => {
    const updatedDataSource = await updateDataSource(dataSourceId, {
      sourceName: 'source2',
      isActive: false,
      defaultFrequency: Frequency.WEEKLY,
      description: 'update data source'
    })
    expect(updatedDataSource.sourceName).toBe('source2')
    expect(updatedDataSource.isActive).toBe(false)
    expect(updatedDataSource.defaultFrequency).toBe(Frequency.WEEKLY)
    expect(updatedDataSource.healthStatus).toBe(HealthStatus.UP)
    expect(updatedDataSource.description).toBe('update data source')
  })

  test('Get first page of data sources', async () => {
    const page = 1
    const size = 10
    const name = ''

    const dataSources = await getAllDataSources(page, size, name)

    // Check that the correct number of data sources is returned
    expect(dataSources.length).toBeLessThanOrEqual(size)
  })

  test('Get second page of data sources', async () => {
    const page = 1
    const size = 1
    const name = 'source'

    const dataSources = await getAllDataSources(page, size, name)

    // Check that the correct number of data sources is returned
    expect(dataSources.length).toBeLessThanOrEqual(size)
    expect(dataSources.length).toBeGreaterThan(0)
    expect(dataSources[0].sourceName).toContain(name)
  })

  test('Delete a data source', async () => {
    await deleteDataSource(dataSourceId)
    const deletedDataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId }
    })
    expect(deletedDataSource).toBeNull()
  })
})

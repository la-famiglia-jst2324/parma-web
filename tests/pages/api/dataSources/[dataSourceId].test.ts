import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/dataSources/[dataSourceId]'
import { getDataSourceByID, updateDataSource, deleteDataSource } from '@/api/db/services/dataSourceService'

jest.mock('@/api/db/services/dataSourceService')
const dataSourceData = {
  id: 1,
  sourceName: 'source1',
  isActive: true,
  defaultFrequency: 'DAILY',
  healthStatus: 'UP',
  description: null,
  createdAt: '2023-12-01T15:54:24.772Z',
  modifiedAt: '2023-12-01T15:54:24.772Z'
}

const updatedDataSourceData = {
  id: 1,
  sourceName: 'updatedDataSource',
  isActive: false,
  defaultFrequency: 'DAILY',
  healthStatus: 'UP',
  description: null,
  createdAt: '2023-12-01T15:54:24.772Z',
  modifiedAt: '2023-12-02T20:53:03.755Z'
}

describe('/api/dataSource/[dataSourceId]', () => {
  const dataSourceId = 1

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a single data source', async () => {
    getDataSourceByID.mockResolvedValueOnce(dataSourceData)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        dataSourceId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(dataSourceData)
  })

  test('PUT updates a data source', async () => {
    getDataSourceByID.mockResolvedValueOnce(dataSourceData)
    updateDataSource.mockResolvedValueOnce(updatedDataSourceData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        dataSourceId
      },
      body: {
        sourceName: 'updatedDataSource',
        isActive: false,
        healthStatus: 'UP',
        description: null,
        defaultFrequency: 'DAILY'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedDataSourceData)
  })

  test('DELETE deletes a data source', async () => {
    deleteDataSource.mockResolvedValueOnce()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        dataSourceId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Data Source successfully Deleted' })
  })
})

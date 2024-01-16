import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/dataSources/[dataSourceId]'
import { getDataSourceByID, deleteDataSource, updateDataSource } from '@/api/db/services/dataSourceService'
jest.mock('@/api/db/services/dataSourceService')

const mockDataSource = {
  id: 1,
  sourceName: 'source1',
  isActive: false,
  frequency: 'DAILY',
  healthStatus: 'UP',
  description: null,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('dataSourceId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a data source', async () => {
    getDataSourceByID.mockResolvedValueOnce(mockDataSource)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockDataSource)
  })

  test('PUT update a data source', async () => {
    const existingSource = getDataSourceByID.mockResolvedValueOnce(mockDataSource)
    updateDataSource.mockResolvedValueOnce(existingSource)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a data source', async () => {
    const existingSource = getDataSourceByID.mockResolvedValueOnce(mockDataSource)
    deleteDataSource.mockResolvedValueOnce(existingSource)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Data Source successfully Deleted' })
  })
})

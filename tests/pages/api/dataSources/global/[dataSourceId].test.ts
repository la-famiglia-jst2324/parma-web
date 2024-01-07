import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/dataSources/global/[dataSourceId]'
import { getDataSourceByID, updateDataSource } from '@/api/db/services/dataSourceService'
jest.mock('@/api/db/services/dataSourceService')

const mockDataSource = {
  id: 1,
  sourceName: 'source1',
  isActive: true,
  frequency: 'DAILY',
  healthStatus: 'UP',
  maxRunSeconds: 110,
  version: '1.0',
  invocationEndpoint: '',
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('CompanyId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('PUT update a company', async () => {
    const existingDataSource = getDataSourceByID.mockResolvedValueOnce(mockDataSource)
    updateDataSource.mockResolvedValueOnce(existingDataSource)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

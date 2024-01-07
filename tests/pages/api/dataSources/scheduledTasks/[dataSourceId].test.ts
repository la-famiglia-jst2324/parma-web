import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/dataSources/scheduledTasks/[dataSourceId]'
import { getScheduledTaskByDatasourceID } from '@/api/db/services/scheduledTaskService'
jest.mock('@/api/db/services/scheduledTaskService')

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

  test('GET update a company', async () => {
    getScheduledTaskByDatasourceID.mockResolvedValueOnce(mockDataSource)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

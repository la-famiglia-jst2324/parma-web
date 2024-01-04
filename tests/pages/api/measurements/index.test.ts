import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/measurements'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'
import { createDataSource } from '@/api/db/services/dataSourceService'
jest.mock('@/api/db/services/sourceMeasurementService')
jest.mock('@/api/db/services/dataSourceService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      return handler(req, res)
    }
  })
}))

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
const mockMeasurement = {
  id: 1,
  sourceModuleId: 1,
  type: 'int',
  measurementName: 'name',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Notification API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new notification', async () => {
    createDataSource.mockResolvedValueOnce(mockDataSource)
    createSourceMeasurement.mockResolvedValueOnce(mockMeasurement)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        sourceModuleId: 1,
        type: 'int',
        measurementName: 'name',
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(mockMeasurement)
  })
})

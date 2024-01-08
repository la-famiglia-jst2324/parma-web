import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/measurements'
import { createDataSource } from '@/api/db/services/dataSourceService'
import { createSourceMeasurement, getAllSourceMeasurements } from '@/api/db/services/sourceMeasurementService'
import { getCompanySourceMeasurementByCompanyId } from '@/api/db/services/companySourceMeasurementService'
jest.mock('@/api/db/services/sourceMeasurementService')
jest.mock('@/api/db/services/dataSourceService')
jest.mock('@/api/db/services/companySourceMeasurementService')
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

  test('POST with invalid parameters returns 400', async () => {
    createSourceMeasurement.mockResolvedValueOnce(null) // Simulate failure due to invalid parameters

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        measurementName: 'name'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createSourceMeasurement.mockRejectedValueOnce(new Error('Internal Server Error'))

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

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('GET with no common source measurement returns 400', async () => {
    getCompanySourceMeasurementByCompanyId.mockResolvedValueOnce(null) // Simulate no common source measurement found

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyIds: '1,2' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No relation found' })
  })

  test('GET with no data source measurements found returns 400', async () => {
    getAllSourceMeasurements.mockResolvedValueOnce([]) // Simulate no measurements found

    const { req, res } = createMocks({
      method: 'GET'
      // No query parameters
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Data Sources Measurements found' })
  })
  test('GET with server error returns 500', async () => {
    getCompanySourceMeasurementByCompanyId.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyIds: '1,2' } // Example of multiple company IDs
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

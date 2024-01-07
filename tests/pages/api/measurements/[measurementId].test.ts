import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/[measurementId]'
import {
  getSourceMeasurementByID,
  updateSourceMeasurement,
  deleteSourceMeasurement
} from '@/api/db/services/sourceMeasurementService'

jest.mock('@/api/db/services/sourceMeasurementService')
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
const mockMeasurement = {
  id: 1,
  sourceModuleId: 1,
  type: 'int',
  measurementName: 'name',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('measurement API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('GET returns a source measurement', async () => {
    getSourceMeasurementByID.mockResolvedValueOnce(mockMeasurement)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockMeasurement)
  })

  test('DELETE delete a source measurement', async () => {
    deleteSourceMeasurement.mockResolvedValueOnce(mockMeasurement)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Measurement successfully Deleted' })
  })

  test('PUT update a source measurement', async () => {
    const existingMeasurement = await getSourceMeasurementByID.mockResolvedValueOnce(mockDataSource)
    updateSourceMeasurement.mockResolvedValueOnce(existingMeasurement)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

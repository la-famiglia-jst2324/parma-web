import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/measurements/nested/[id]'
import {
  getChildMeasurementsByParentId,
  updateParentMeasurementId,
  getSourceMeasurementByID
} from '@/api/db/services/sourceMeasurementService'
jest.mock('@/api/db/services/sourceMeasurementService')

const mockChildSourceMeasurement = {
  id: 2,
  sourceModuleId: 1,
  type: 'int',
  measurementName: 'employees',
  parentMeasurementId: 1,
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}

describe('nested measurements API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns all child measurements', async () => {
    getChildMeasurementsByParentId.mockResolvedValueOnce(mockChildSourceMeasurement)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockChildSourceMeasurement)
  })

  test('PUT update a measurement', async () => {
    const existingMeasurement = getSourceMeasurementByID.mockResolvedValueOnce(mockChildSourceMeasurement)
    updateParentMeasurementId.mockResolvedValueOnce(existingMeasurement)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

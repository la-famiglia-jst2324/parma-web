import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/measurements/filterBySource/[sourceModuleId]'
import { getMeasurementsBySourceId } from '@/api/db/services/sourceMeasurementService'
jest.mock('@/api/db/services/sourceMeasurementService')

const mockSourceMeasurement = {
  id: 1,
  sourceModuleId: 1,
  type: 'int',
  measurementName: 'employees',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}

describe('filter by source API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns source measurements', async () => {
    getMeasurementsBySourceId.mockResolvedValueOnce(mockSourceMeasurement)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockSourceMeasurement)
  })
})

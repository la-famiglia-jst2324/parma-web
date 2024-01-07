import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/floatValues/[valueId]'
import { getFloatValueByID } from '@/api/db/services/floatValueService'
jest.mock('@/api/db/services/floatValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 1.1,
  timestamp: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date()
}
describe('float value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getFloatValueByID.mockResolvedValueOnce(value)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        valueId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

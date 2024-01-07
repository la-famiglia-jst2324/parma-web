import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/nestedValues/[valueId]'
import { getNestedValueByID } from '@/api/db/services/nestedValueService'
jest.mock('@/api/db/services/nestedValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'nested',
  timestamp: '2023-12-01T15:22:29.146Z',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('text value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getNestedValueByID.mockResolvedValueOnce(value)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        valueId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(value)
  })
})

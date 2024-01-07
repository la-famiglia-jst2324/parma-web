import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/linkValues/[valueId]'
import { getLinkValueByID } from '@/api/db/services/linkValueService'
jest.mock('@/api/db/services/linkValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'link',
  timestamp: '2023-12-01T15:22:29.146Z',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('link value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getLinkValueByID.mockResolvedValueOnce(value)
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

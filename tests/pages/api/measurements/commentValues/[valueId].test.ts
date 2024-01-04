import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/commentValues/[valueId]'
import { getCommentValueByID } from '@/api/db/services/commentValueService'
jest.mock('@/api/db/services/commentValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'abc',
  timestamp: new Date(),
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('comment value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getCommentValueByID.mockResolvedValueOnce(value)
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

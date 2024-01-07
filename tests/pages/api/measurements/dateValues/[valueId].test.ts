import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/dateValues/[valueId]'
import { getDateValueByID } from '@/api/db/services/dateValueService'
jest.mock('@/api/db/services/dateValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: new Date(),
  timestamp: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date()
}
describe('date value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getDateValueByID.mockResolvedValueOnce(value)
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

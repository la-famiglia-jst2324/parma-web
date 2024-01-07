import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/imageValues/[valueId]'
import { getImageValueByID } from '@/api/db/services/imageValueService'
jest.mock('@/api/db/services/imageValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'image',
  timestamp: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date()
}
describe('image value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getImageValueByID.mockResolvedValueOnce(value)
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

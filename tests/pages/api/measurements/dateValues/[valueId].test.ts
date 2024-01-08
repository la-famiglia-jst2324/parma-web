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

  test('GET with non-existent valueId returns 400', async () => {
    getDateValueByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Measurement Value found' })
  })
  test('GET with server error returns 500', async () => {
    getDateValueByID.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: 1 }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
  test('Unsupported method returns 405', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method Not Allowed' })
  })
})

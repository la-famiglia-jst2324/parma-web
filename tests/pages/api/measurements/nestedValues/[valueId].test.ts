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

  test('GET with non-existent valueId returns 400', async () => {
    getNestedValueByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Measurement Value found' })
  })
  test('GET with server error returns 500', async () => {
    getNestedValueByID.mockRejectedValueOnce(new Error('Internal Server Error'))

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

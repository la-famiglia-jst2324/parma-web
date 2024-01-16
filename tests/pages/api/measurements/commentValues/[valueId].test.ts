import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/measurements/commentValues/[valueId]'
import { getCommentValueByID } from '@/api/db/services/commentValueService'
jest.mock('@/api/db/services/commentValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'abc',
  timestamp: new Date(),
  createdAt: new Date(),
  modifiedAt: new Date()
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

  test('GET with non-existent valueId returns 400', async () => {
    getCommentValueByID.mockResolvedValueOnce(null) // Simulate no measurement value found

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: '1' } // Non-existent or invalid valueId
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Measurement Value found' })
  })
  test('GET with server error returns 500', async () => {
    getCommentValueByID.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: 1 } // Valid valueId
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

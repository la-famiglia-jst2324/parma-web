import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/measurements/paragraphValues/[valueId]'
import { getParagraphValueByID } from '@/api/db/services/paragraphValueService'
jest.mock('@/api/db/services/paragraphValueService')

const value = {
  id: 1,
  companyMeasurementId: 1,
  value: 'paragraph',
  timestamp: '2023-12-01T15:22:29.146Z',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('paragraph value API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getParagraphValueByID.mockResolvedValueOnce(value)
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
    getParagraphValueByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'GET',
      query: { valueId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
  })
  test('GET with server error returns 500', async () => {
    getParagraphValueByID.mockRejectedValueOnce(new Error('Internal Server Error'))

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

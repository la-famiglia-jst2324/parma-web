import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification'
import { createNotification } from '@/api/db/services/notificationService'
jest.mock('@/api/db/services/notificationService')

const newNotification = {
  id: 1,
  message: 'message',
  companyId: 1,
  dataSourceId: 1,
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Notification API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new notification', async () => {
    createNotification.mockResolvedValueOnce(newNotification)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'message',
        companyId: 1,
        dataSourceId: 1,
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(newNotification)
  })

  test('POST with invalid parameters returns 400', async () => {
    createNotification.mockResolvedValueOnce(null) // Simulate failure due to invalid parameters

    const { req, res } = createMocks({
      method: 'POST',
      body: { dataSourceId: 1 }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })
  test('POST with server error returns 500', async () => {
    createNotification.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'message',
        companyId: 1,
        dataSourceId: 1,
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
  test('Unsupported method returns 405', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method Not Allowed' })
  })
})

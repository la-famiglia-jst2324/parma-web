import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification/[notificationId]'
import { getNotificationById, deleteNotification, updateNotification } from '@/api/db/services/notificationService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/notificationService')

const notification = {
  id: 1,
  message: 'message',
  companyId: 1,
  dataSourceId: 1,
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('NotificationId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a notification', async () => {
    getNotificationById.mockResolvedValueOnce(notification)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(notification)
  })

  test('GET with non-existent notificationId returns 400', async () => {
    getNotificationById.mockResolvedValueOnce(null) // Simulate no notification found

    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationId: 'a' } // Non-existent or invalid notificationId
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Notification found' })
  })

  test('GET with invalid notificationId returns 404', async () => {
    getNotificationById.mockRejectedValueOnce(new ItemNotFoundError('Notification not found'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationId: 'invalid_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Notification not found' })
  })

  test('GET with server error returns 500', async () => {
    getNotificationById.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationId: '1' } // Valid notificationId
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('DELETE delete a notification', async () => {
    deleteNotification.mockResolvedValueOnce(notification)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Notification successfully Deleted' })
  })

  test('PUT update a notification', async () => {
    updateNotification.mockResolvedValueOnce(notification)
    const { req, res } = createMocks({
      method: 'PUT',
      body: { message: 'message1' }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(notification)
  })

  // Example for PUT method
  test('PUT with server error returns 500', async () => {
    updateNotification.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { notificationId: '1' }, // Valid notificationId
      body: { message: 'message1' } // Valid updated notification data
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
  })

  test('Unsupported method returns 405', async () => {
    const { req, res } = createMocks({
      method: 'PATCH'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method Not Allowed' })
  })
})

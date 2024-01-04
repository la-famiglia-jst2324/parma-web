import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification/[notificationId]'
import { getNotificationById, deleteNotification, updateNotification } from '@/api/db/services/notificationService'
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
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(notification)
  })
})

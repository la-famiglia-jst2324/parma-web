import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification/[notificationId]'
import { getNotificationById, updateNotification, deleteNotification } from '@/api/db/services/notificationService'

jest.mock('@/api/db/services/notificationService')

const notificationData = {
  id: 1,
  message: 'Notification message',
  companyId: 2,
  dataSourceId: 11,
  createdAt: '2023-12-02T22:02:31.400Z',
  modifiedAt: '2023-12-02T22:02:31.400Z'
}

const updatedNotificationData = {
  id: 1,
  message: 'updated message',
  companyId: 2,
  dataSourceId: 11,
  createdAt: '2023-12-02T22:02:31.400Z',
  modifiedAt: '2023-12-02T22:10:15.779Z'
}

describe('Notification API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a notification by ID', async () => {
    getNotificationById.mockResolvedValueOnce(notificationData)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        notificationId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(notificationData)
  })

  test('PUT updates a notification', async () => {
    updateNotification.mockResolvedValueOnce(updatedNotificationData)
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        notificationId: 1
      },
      body: {
        message: 'updated message'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedNotificationData)
  })

  test('DELETE deletes a notification', async () => {
    deleteNotification.mockResolvedValueOnce()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        notificationId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Notification successfully Deleted' })
  })
})

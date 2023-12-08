import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notificationChannel/[channelId]'
import {
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'

jest.mock('@/api/db/services/notificationChannelService')

const notificationChannelData = {
  id: 1,
  entityId: 'entity1',
  entityType: 'REPORT',
  channelType: 'SLACK',
  destination: 'slack channel',
  createdAt: '2023-12-01T14:47:46.538Z',
  modifiedAt: '2023-12-01T14:47:46.538Z',
  notificationSubscriptions: [],
  reportSubscriptions: []
}

const updatedNotificationChannelData = {
  id: 1,
  entityId: 'entity3',
  entityType: 'REPORT',
  channelType: 'EMAIL',
  destination: 'email',
  createdAt: '2023-12-01T14:47:46.538Z',
  modifiedAt: '2023-12-02T22:37:15.582Z'
}

describe('Notification Channel API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a notification channel', async () => {
    getNotificationChannelById.mockResolvedValueOnce(notificationChannelData)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        channelId: 1
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(notificationChannelData)
  })

  test('PUT updates a notification channel', async () => {
    updateNotificationChannel.mockResolvedValueOnce(updatedNotificationChannelData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        channelId: 1
      },
      body: {
        entityId: 'entity3',
        entityType: 'REPORT',
        channelType: 'EMAIL',
        destination: 'email'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedNotificationChannelData)
  })
  test('DELETE deletes a notification channel', async () => {
    deleteNotificationChannel.mockResolvedValueOnce()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        channelId: 1
      }
    })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'NotificationChannel successfully Deleted' })
  })
})

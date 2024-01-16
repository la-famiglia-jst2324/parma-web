import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/notificationChannel/[channelId]'
import {
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'

jest.mock('@/api/db/services/notificationChannelService')

const mockChannel = {
  id: 1,
  channelType: 'EMAIL',
  destination: 'abc@gmail.com',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}

describe('Notification ChannelId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET', async () => {
    getNotificationChannelById.mockResolvedValueOnce(mockChannel)
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockChannel)
  })

  test('PUT update a data source', async () => {
    updateNotificationChannel.mockResolvedValueOnce(mockChannel)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a data source', async () => {
    deleteNotificationChannel.mockResolvedValueOnce(mockChannel)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'NotificationChannel successfully Deleted' })
  })
})

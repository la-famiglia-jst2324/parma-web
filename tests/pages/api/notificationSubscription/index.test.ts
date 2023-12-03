import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notificationSubscription'
import {
  createNotificationSubscription,
  deleteNotificationSubscription
} from '@/api/db/services/notificationSubscriptionService'

jest.mock('@/api/db/services/notificationSubscriptionService')

describe('Notification Subscription API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a notification subscription', async () => {
    const newSubscriptionData = {
      userId: 123,
      companyId: 456,
      channelId: 789,
      createdAt: '2023-12-02T23:05:02.526Z',
      modifiedAt: '2023-12-02T23:05:02.526Z'
    }
    createNotificationSubscription.mockResolvedValueOnce(newSubscriptionData)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userId: 123,
        companyId: 456,
        channelId: 789
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(newSubscriptionData)
  })

  test('DELETE deletes a notification subscription', async () => {
    deleteNotificationSubscription.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      body: {
        userId: 123,
        companyId: 456,
        channelId: 789
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Notification Subscription successfully Deleted' })
  })
})

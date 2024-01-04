import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/notificationSubscription'
import {
  createNotificationSubscription,
  deleteNotificationSubscription
} from '@/api/db/services/notificationSubscriptionService'
jest.mock('@/api/db/services/notificationSubscriptionService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))
const mockUser: User = {
  id: 1,
  authId: 'AAAAAdfw',
  name: 'ZL',
  profilePicture: 'pic',
  role: 'USER',
  createdAt: new Date(),
  modifiedAt: new Date()
}
const mockSubscription = {
  id: 1,
  userId: 1,
  channelId: 1,
  channelPurpose: 'NOTIFICATION',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Notification or Report Subscription API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new subscription', async () => {
    createNotificationSubscription.mockResolvedValueOnce(mockSubscription)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userId: 1,
        channelId: 1,
        channelPurpose: 'NOTIFICATION',
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res, mockUser)
    expect(JSON.parse(res._getData())).toEqual(mockSubscription)
  })

  test('DELETE delete a subscription', async () => {
    deleteNotificationSubscription.mockResolvedValueOnce(mockSubscription)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })
})

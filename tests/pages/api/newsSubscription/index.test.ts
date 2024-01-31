import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { handler } from '@/pages/api/newsSubscription/index'
import {
  createNewsSubscription,
  deleteNewsSubscription,
  getNewsSubscriptionById
} from '@/api/db/services/newsSubscriptionService'
jest.mock('@/api/db/services/newsSubscriptionService')
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
  modifiedAt: new Date(),
  username: 'a'
}

const mockSubscription = {
  userId: 1,
  companyId: 1,
  createdAt: new Date(),
  modifiedAt: new Date()
}

describe('News Subscription API Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('POST Method Tests', () => {
    test('POST - Successfully creates a new subscription (201 status)', async () => {
      createNewsSubscription.mockResolvedValueOnce(mockSubscription)
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          companyId: 1
        },
        query: {
          subscribe: 'true'
        }
      })
      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(201)
    })

    test('POST - Successfully deletes an existing subscription (200 status)', async () => {
      getNewsSubscriptionById.mockResolvedValueOnce(mockSubscription)
      deleteNewsSubscription.mockResolvedValueOnce(mockSubscription)
      const { req, res } = createMocks({
        method: 'POST',
        body: { companyId: 1 },
        query: { subscribe: 'false' }
      })
      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(200)
    })

    test('POST - Tries to delete a non-existing subscription (404 status)', async () => {
      getNewsSubscriptionById.mockResolvedValueOnce(null)
      const { req, res } = createMocks({
        method: 'POST',
        body: { companyId: 123 },
        query: { subscribe: 'false' }
      })
      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(404)
    })

    test('POST - Internal server error (500 status)', async () => {
      createNewsSubscription.mockRejectedValueOnce(new Error('Internal Server Error'))
      const { req, res } = createMocks({
        method: 'POST',
        body: { companyId: 1 },
        query: { subscribe: 'true' }
      })
      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(500)
    })
  })
})

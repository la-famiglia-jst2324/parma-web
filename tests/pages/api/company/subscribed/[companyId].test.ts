import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/company/subscribed/[companyId]'
import { getUserCompanySubscriptions } from '@/api/db/services/companySubscriptionService'
jest.mock('@/api/db/services/companySubscriptionService')
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
  userId: 1,
  companyId: 1,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('company subscribed API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a list of companies', async () => {
    getUserCompanySubscriptions.mockResolvedValueOnce(mockSubscription)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        companyId: 1
      }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockSubscription)
  })

  test('GET with no subscription found returns 400', async () => {
    getUserCompanySubscriptions.mockResolvedValueOnce(null) // Simulate no subscription found

    const { req, res } = createMocks({
      method: 'GET',
      query: { userId: 1, companyId: 1 } // Example userId and companyId
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'subscription not found' })
  })

  test('GET with server error returns 500', async () => {
    getUserCompanySubscriptions.mockRejectedValueOnce(new Error('Internal Server Error')) // Simulate an internal server error

    const { req, res } = createMocks({
      method: 'GET',
      query: { userId: 1, companyId: 1 } // Example userId and companyId
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

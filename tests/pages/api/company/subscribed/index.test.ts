import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/company/subscribed/index'
import {
  createCompanySubscription,
  deleteCompanySubscription,
  getUserCompanySubscriptions
} from '@/api/db/services/companySubscriptionService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

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
      method: 'GET'
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockSubscription)
  })

  test('GET without any subscriptions returns 400', async () => {
    getUserCompanySubscriptions.mockResolvedValueOnce(null) // Simulate no subscriptions

    const { req, res } = createMocks({
      method: 'GET'
      // Add additional necessary mock data if needed
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toBeNull()
  })

  test('GET with invalid userId returns 404', async () => {
    getUserCompanySubscriptions.mockRejectedValueOnce(new ItemNotFoundError('Subscriptions not found'))

    const { req, res } = createMocks({
      method: 'GET'
      // Add additional necessary mock data if needed
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Subscriptions not found' })
  })

  test('GET with server error returns 500', async () => {
    getUserCompanySubscriptions.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET'
      // Add additional necessary mock data if needed
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('POST creates a new data source', async () => {
    createCompanySubscription.mockResolvedValueOnce(mockSubscription)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        modifiedAt: '2023-12-02T21:23:57.281Z'
      },
      query: {
        subscribe: 'true'
      }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(mockSubscription)
  })

  test('POST creates a new data source', async () => {
    const existingSubscription = await getUserCompanySubscriptions.mockResolvedValueOnce(mockSubscription)
    deleteCompanySubscription.mockResolvedValueOnce(existingSubscription)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        modifiedAt: '2023-12-02T21:23:57.281Z'
      },
      query: {
        subscribe: 'false'
      }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'company subscription successfully Deleted' })
  })

  test('POST with non-existent subscription returns 404', async () => {
    getUserCompanySubscriptions.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'POST',
      body: { companyId: 1 },
      query: { subscribe: 'false' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'company subscription not found' })
  })
  test('POST with server error returns 500', async () => {
    createCompanySubscription.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'POST',
      body: { companyId: 1 }, // Valid companyId
      query: { subscribe: 'true' } // Create scenario
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

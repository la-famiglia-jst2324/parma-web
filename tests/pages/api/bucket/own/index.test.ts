import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBucketDummy } from '@tests/data/dummy/bucket'
import { handler } from '@/pages/api/bucket/own/index'
import { getOwnBuckets } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/bucketService')
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
  username: 'zl'
}

const mockBucket = randomBucketDummy({ ownerId: mockUser.id, managedFields: true })

describe('Own Buckets API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("GET - Successfully retrieves user's own buckets (200 status)", async () => {
    getOwnBuckets.mockResolvedValueOnce(mockBucket)
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - No buckets found (200 status)', async () => {
    getOwnBuckets.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - Item not found error (404 status)', async () => {
    getOwnBuckets.mockRejectedValueOnce(new ItemNotFoundError('No buckets found'))
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(404)
  })

  test('GET - Internal server error (500 status)', async () => {
    getOwnBuckets.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('Unsupported method (405 status)', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(405)
  })
})

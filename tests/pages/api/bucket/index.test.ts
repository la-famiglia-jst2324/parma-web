import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/bucket'
import { getAllBuckets, createBucket, getBucketByName } from '@/api/db/services/bucketService'
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
  modifiedAt: new Date()
}
const buckets = {
  buckets: [
    {
      id: 1,
      title: 'bucket1',
      description: 'bucket1 description',
      ownerId: 1,
      isPublic: true,
      createdAt: '2023-12-01T15:22:29.146Z',
      modifiedAt: '2023-12-01T15:22:29.146Z'
    },
    {
      id: 2,
      title: 'bucket2',
      description: 'bucket2 description',
      ownerId: 1,
      isPublic: true,
      createdAt: '2023-12-01T15:54:26.490Z',
      modifiedAt: '2023-12-01T15:54:26.490Z'
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 11,
    totalCount: 109
  }
}
const mockBucket = {
  id: 1,
  title: 'bucket1',
  description: 'bucket1 description',
  ownerId: 1,
  isPublic: true,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}
describe('Bucket API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET with bucketName returns bucket', async () => {
    const mockName = 'bucket1'
    getBucketByName.mockResolvedValue(mockBucket)
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: mockName }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('GET returns a list of buckets', async () => {
    getAllBuckets.mockResolvedValueOnce(buckets)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(buckets)
  })

  test('GET with non-existent returns 404', async () => {
    const mockName = 'bucket1'
    getBucketByName.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: mockName }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })

  test('GET with non-existent returns 404', async () => {
    getAllBuckets.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })
  test('POST creates a new data source', async () => {
    createBucket.mockResolvedValueOnce(mockBucket)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'bucket1',
        description: 'bucket1 description',
        ownerId: 1,
        isPublic: true,
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })
    await handler(req, res, mockUser)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('POST with invalid parameters returns 400', async () => {
    createBucket.mockResolvedValueOnce(null) // Simulate no bucket created

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        description: 'bucket1 description',
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createBucket.mockRejectedValueOnce(new Error('Internal Server Error')) // Simulate an internal server error

    const { req, res } = createMocks({
      method: 'POST',
      body: { description: 'bucket1 description' } // Provide an example of valid input that might cause a server error
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

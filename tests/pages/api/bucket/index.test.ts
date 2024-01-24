import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBucketDummies, randomBucketDummy } from '@tests/data/dummy/bucket'
import { randomDbUserDummy } from '@tests/data/dummy/user'
import { handler } from '@/pages/api/bucket'
import { getAllBuckets, createBucket, getBucketsByName } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/bucketService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))
const mockDbUser = randomDbUserDummy()
const mockBucket = randomBucketDummy({ ownerId: mockDbUser.id, managedFields: false })
const buckets = {
  buckets: randomBucketDummies({ ownerId: 1, count: 10, managedFields: true }),
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 11,
    totalCount: 109
  }
}
describe('Bucket API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new bucket', async () => {
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
    await handler(req, res, mockDbUser)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('GET with bucketName returns bucket', async () => {
    getBucketsByName.mockResolvedValueOnce(mockBucket)

    const { req, res } = createMocks({
      method: 'GET',
      query: { name: mockBucket.title }
    })

    await handler(req, res, mockDbUser)
    const resData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(200)
    expect(resData.title).toEqual(mockBucket.title)
    expect(resData.description).toEqual(mockBucket.description)
  })

  test('GET returns a list of buckets', async () => {
    getAllBuckets.mockResolvedValueOnce(buckets)

    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockDbUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(buckets)
  })

  test('GET with non-existent returns 404', async () => {
    const mockName = 'bucket1'
    getBucketsByName.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: mockName }
    })
    await handler(req, res, mockDbUser)
    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })

  test('GET with non-existent returns 404', async () => {
    getAllBuckets.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockDbUser)
    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
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

    await handler(req, res, mockDbUser)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createBucket.mockRejectedValueOnce(new Error('Internal Server Error')) // Simulate an internal server error

    const { req, res } = createMocks({
      method: 'POST',
      body: { description: 'bucket1 description' } // Provide an example of valid input that might cause a server error
    })

    await handler(req, res, mockDbUser)
    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

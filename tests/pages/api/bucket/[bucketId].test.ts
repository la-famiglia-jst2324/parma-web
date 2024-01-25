import { createMocks } from 'node-mocks-http'
import { randomBucketDummy } from '@tests/data/dummy/bucket'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { handler } from '@/pages/api/bucket/[bucketId]'
import { getBucketById, deleteBucket, updateBucket } from '@/api/db/services/bucketService'
import { getBucketAccessByID } from '@/api/db/services/bucketAccessService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

jest.mock('@/api/db/services/bucketService')
jest.mock('@/api/db/services/bucketAccessService')
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

const mockBucket = randomBucketDummy({ managedFields: true, ownerId: mockUser.id })

describe('BucketId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a bucket', async () => {
    getBucketById.mockResolvedValueOnce(mockBucket)
    getBucketAccessByID.mockResolvedValueOnce(mockBucket, mockUser)

    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('GET with an invalid bucketId returns 404', async () => {
    getBucketById.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    getBucketAccessByID.mockRejectedValueOnce(mockBucket, mockUser)
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: 'invalid_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })

  test('GET with server error returns 500', async () => {
    getBucketById.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: 'error_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('PUT update a bucket', async () => {
    const existingBucket = getBucketById.mockResolvedValueOnce(mockBucket)
    updateBucket.mockResolvedValueOnce(existingBucket)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('PUT with non-existent bucketId returns 404', async () => {
    getBucketById.mockResolvedValueOnce(null) // Simulate bucket not found

    const { req, res } = createMocks({
      method: 'PUT',
      query: { bucketId: 'non_existent_id' },
      body: randomBucketDummy({ ownerId: 1 })
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Bucket not found' })
  })

  test('PUT with server error during update returns 500', async () => {
    getBucketById.mockResolvedValueOnce({})
    updateBucket.mockRejectedValueOnce(new Error('Failed to update bucket'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { bucketId: 'error_id' },
      body: {
        description: 'bucket1 description'
      } // Valid updated bucket data
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
  })

  test('DELETE delete a bucket', async () => {
    const existingBucket = getBucketById.mockResolvedValueOnce(mockBucket)
    deleteBucket.mockResolvedValueOnce(existingBucket)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE with non-existent bucketId returns 404', async () => {
    getBucketById.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: 'non_existent_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Company not found' })
  })

  test('DELETE with server error returns 500', async () => {
    getBucketById.mockResolvedValueOnce(mockBucket)
    deleteBucket.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: 'error_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
  })
})

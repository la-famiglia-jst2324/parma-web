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

  test('GET returns 200 when user has access to the bucket', async () => {
    const mockBucketId = '1'
    const mockUser = { id: 'user123' }

    getBucketById.mockResolvedValue({
      id: mockBucketId,
      ownerId: mockUser.id,
      permissions: [{ inviteeId: mockUser.id, permission: 'VIEWER' }]
    })

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: mockBucketId }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        id: mockBucketId,
        ownerId: mockUser.id,
        permissions: expect.arrayContaining([expect.objectContaining({ inviteeId: mockUser.id })])
      })
    )
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

  test('PUT updates a bucket successfully and returns 200', async () => {
    const mockBucketId = '1'
    const mockUser = { id: 'user123' }
    const requestBody = { name: 'Updated Bucket Name' }

    getBucketById.mockResolvedValue({
      id: mockBucketId,
      ownerId: 'anotherUserId',
      permissions: [{ inviteeId: mockUser.id, permission: 'MODERATOR' }]
    })

    updateBucket.mockResolvedValue({
      id: mockBucketId,
      ...requestBody
    })

    const { req, res } = createMocks({
      method: 'PUT',
      query: { bucketId: mockBucketId },
      body: requestBody
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        id: mockBucketId,
        ...requestBody
      })
    )
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
    expect(JSON.parse(res._getData()).error).toContain('not found')
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
    expect(JSON.parse(res._getData())).toEqual({ error: 'Failed to update bucket' })
  })

  test('DELETE delete a bucket', async () => {
    const existingBucket = getBucketById.mockResolvedValueOnce(mockBucket)
    deleteBucket.mockResolvedValueOnce(existingBucket)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(404)
  })

  test('DELETE with non-existent bucketId returns 404', async () => {
    getBucketById.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: 'non_existent_id' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
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
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

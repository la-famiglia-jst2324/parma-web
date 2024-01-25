import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBucketDummy } from '@tests/data/dummy/bucket'
import { handler } from '@/pages/api/bucket/share/[bucketId]'
import { getBucketById } from '@/api/db/services/bucketService'
import {
  getInviteesByBucketId,
  updateBucketAccess,
  deleteBucketAccess,
  getInviteesIdsByBucketId
} from '@/api/db/services/bucketAccessService'
jest.mock('@/api/db/services/bucketAccessService')
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

const mockBucket = randomBucketDummy({ ownerId: mockUser.id, managedFields: true })
const mockAccess = {
  bucketId: 1,
  inviteeId: 1,
  permission: 'MODERATOR',
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('Bucket share bucketId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a bucket', async () => {
    getInviteesByBucketId.mockResolvedValueOnce(mockAccess)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET with server error returns 500', async () => {
    getInviteesByBucketId.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('PUT updates bucket access permissions successfully and returns 200', async () => {
    const requestBody = { inviteeId: 'user456', permission: 'VIEWER' }
    getInviteesIdsByBucketId.mockResolvedValue([{ userId: mockUser.id, permission: 'MODERATOR' }])
    getBucketById.mockResolvedValue(mockBucket)
    updateBucketAccess.mockResolvedValue({ inviteeId: requestBody.inviteeId, permission: requestBody.permission })

    const { req, res } = createMocks({
      method: 'PUT',
      body: requestBody
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        inviteeId: requestBody.inviteeId,
        permission: requestBody.permission
      })
    )
  })

  test('PUT with server error returns 500', async () => {
    updateBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { bucketId: '1' },
      body: { inviteeId: '123', permission: 'read' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('DELETE delete a bucket access', async () => {
    deleteBucketAccess.mockResolvedValueOnce(mockAccess)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Bucket access deleted successfully' })
  })
  test('DELETE with server error returns 500', async () => {
    deleteBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: '1' },
      body: { inviteeId: '123' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

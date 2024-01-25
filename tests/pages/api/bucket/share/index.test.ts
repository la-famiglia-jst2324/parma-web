import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/bucket/share/index'
import { createBucketAccess, getInviteesIdsByBucketId } from '@/api/db/services/bucketAccessService'
import { getBucketById } from '@/api/db/services/bucketService'
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
const mockAccessIn = {
  bucketId: 1,
  inviteeId: 1,
  permission: 'VIEWER'
}

describe('Bucket Share API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST with valid data creates new bucket accesses and returns 201', async () => {
    getInviteesIdsByBucketId.mockResolvedValue([{ permission: 'MODERATOR' }])

    getBucketById.mockResolvedValue({ ownerId: mockUser.id })

    createBucketAccess.mockImplementation((data) => Promise.resolve({ newAccess: 'accessData', ...data }))

    const invitations = [
      {
        bucketId: '1',
        inviteeId: '2',
        permission: 'READ'
      }
    ]

    const { req, res } = createMocks({
      method: 'POST',
      body: invitations
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(201)

    expect(res._getData()).toBeTruthy()
  })

  test('POST with invalid data returns 400 due to lack of permissions', async () => {
    getInviteesIdsByBucketId.mockResolvedValue([{ permission: 'READ' }])

    getBucketById.mockResolvedValue({ ownerId: 'anotherUserId' })

    createBucketAccess.mockResolvedValue(undefined)

    const invitations = [
      {
        bucketId: '1',
        inviteeId: '2',
        permission: 'READ'
      }
    ]

    const { req, res } = createMocks({
      method: 'POST',
      body: invitations
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error')) // Simulate an internal server error

    const { req, res } = createMocks({
      method: 'POST',
      body: [mockAccessIn],
      query: { id: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

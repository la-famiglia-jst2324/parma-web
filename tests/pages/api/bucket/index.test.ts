import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/bucket'
import { getAllBuckets, createBucket, getBucketByName } from '@/api/db/services/bucketService'
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
})

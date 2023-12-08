import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/bucket/[bucketId]'
import { getBucketById, updateBucket, deleteBucket } from '@/api/db/services/bucketService'

jest.mock('@/api/db/services/bucketService')

const expectedBucketData = {
  id: 77,
  title: 'Websites',
  description: 'WEbsites list',
  ownerId: 3,
  isPublic: true,
  createdAt: '2023-12-01T16:41:06.111Z',
  modifiedAt: '2023-12-01T16:41:06.111Z',
  user: {
    id: 3,
    authId: '2',
    name: 'Bob',
    role: 'ADMIN',
    createdAt: '2023-12-01T14:42:49.870Z',
    modifiedAt: '2023-12-01T14:42:49.870Z'
  },
  permissions: []
}

const updatedBucketData = {
  id: 77,
  title: 'Updated Bucket Name',
  description: 'Updated description',
  ownerId: 3,
  isPublic: true,
  createdAt: '2023-12-01T16:41:06.111Z',
  modifiedAt: '2023-12-01T16:44:03.671Z'
}

describe('/api/bucket/', () => {
  const bucketId = 1

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a single bucket', async () => {
    getBucketById.mockResolvedValueOnce(expectedBucketData)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        bucketId
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedBucketData)
  })

  test('PUT updates a bucket', async () => {
    getBucketById.mockResolvedValueOnce(expectedBucketData)
    updateBucket.mockResolvedValueOnce(updatedBucketData)
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        bucketId
      },
      body: {
        name: 'Updated Bucket Name',
        description: 'Updated description'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedBucketData)
  })

  test('DELETE deletes a bucket', async () => {
    getBucketById.mockResolvedValueOnce(expectedBucketData)
    deleteBucket.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        bucketId
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Bucket successfully Deleted' })
  })
})

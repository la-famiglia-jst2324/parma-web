import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/bucket/[bucketId]'
import { getBucketById, deleteBucket, updateBucket } from '@/api/db/services/bucketService'
jest.mock('@/api/db/services/bucketService')

const mockBucket = {
  id: 1,
  title: 'bucket1',
  description: 'bucket1 description',
  ownerId: 1,
  isPublic: true,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('BucketId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a bucket', async () => {
    getBucketById.mockResolvedValueOnce(mockBucket)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('PUT update a bucket', async () => {
    const existingBucket = getBucketById.mockResolvedValueOnce(mockBucket)
    updateBucket.mockResolvedValueOnce(existingBucket)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a bucket', async () => {
    const existingBucket = getBucketById.mockResolvedValueOnce(mockBucket)
    deleteBucket.mockResolvedValueOnce(existingBucket)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Bucket successfully Deleted' })
  })
})

import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/bucket/share/[bucketId]'
import { getInviteesByBucketId, updateBucketAccess, deleteBucketAccess } from '@/api/db/services/bucketAccessService'

jest.mock('@/api/db/services/bucketAccessService')
const mockAccess = {
  bucketId: 1,
  inviteeId: 1,
  permission: 'VIEWER',
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

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('PUT update a bucket access', async () => {
    updateBucketAccess.mockResolvedValueOnce(mockAccess)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a bucket access', async () => {
    deleteBucketAccess.mockResolvedValueOnce(mockAccess)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Bucket access deleted successfully' })
  })
})

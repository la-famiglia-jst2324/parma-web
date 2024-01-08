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

  test('GET with server error returns 500', async () => {
    getInviteesByBucketId.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('PUT update a bucket access', async () => {
    updateBucketAccess.mockResolvedValueOnce(mockAccess)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('PUT with server error returns 500', async () => {
    updateBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { bucketId: '1' },
      body: { inviteeId: '123', permission: 'read' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
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
  test('DELETE with server error returns 500', async () => {
    deleteBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { bucketId: '1' },
      body: { inviteeId: '123' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

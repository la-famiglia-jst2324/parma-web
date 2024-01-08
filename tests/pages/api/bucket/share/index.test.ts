import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/bucket/share/index'
import { createBucketAccess } from '@/api/db/services/bucketAccessService'

jest.mock('@/api/db/services/bucketAccessService')

const mockAccess = {
  bucketId: 1,
  inviteeId: 1,
  permission: 'VIEWER',
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}
describe('Bucket Share API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new data source', async () => {
    createBucketAccess.mockResolvedValueOnce(mockAccess)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        bucketId: 1,
        inviteeId: 1,
        permission: 'VIEWER',
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(mockAccess)
  })
  test('POST with invalid parameters returns 400', async () => {
    createBucketAccess.mockResolvedValueOnce(null) // Simulate failure due to invalid parameters

    const { req, res } = createMocks({
      method: 'POST',
      body: { permission: 'VIEWER' },
      query: { id: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createBucketAccess.mockRejectedValueOnce(new Error('Internal Server Error')) // Simulate an internal server error

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        bucketId: 1,
        inviteeId: 1,
        permission: 'VIEWER',
        modifiedAt: '2023-12-02T21:23:57.281Z'
      },
      query: { id: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

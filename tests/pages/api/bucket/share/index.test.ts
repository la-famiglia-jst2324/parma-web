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
})

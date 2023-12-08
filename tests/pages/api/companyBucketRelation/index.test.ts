import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/companyBucketRelation'
import * as companyBucketMembershipService from '@/api/db/services/companyBucketMembershipService'

jest.mock('@/api/db/services/companyBucketMembershipService')

const expectedMembership = {
  companyId: 2,
  bucketId: 77,
  createdAt: '2023-12-01T17:33:38.069Z',
  modifiedAt: '2023-12-01T17:33:38.069Z'
}

const expectedCompanies = {
  id: 2,
  name: 'company Name',
  description: 'company Description',
  addedBy: 1,
  createdAt: '2023-12-01T14:43:37.595Z',
  modifiedAt: '2023-12-01T15:18:29.426Z'
}

const expectedBuckets = [
  {
    id: 77,
    title: 'Bucket 1',
    description: 'Bucket 1 description',
    ownerId: 3,
    isPublic: true,
    createdAt: '2023-12-01T16:41:06.111Z',
    modifiedAt: '2023-12-01T16:44:03.671Z'
  },
  {
    id: 78,
    title: 'Bucket 2',
    description: 'Bucket 2 description',
    ownerId: 3,
    isPublic: true,
    createdAt: '2023-12-01T16:41:35.717Z',
    modifiedAt: '2023-12-01T16:41:35.717Z'
  }
]

describe('/api/companyBucketMembership', () => {
  const bucketId = '1'
  const companyId = '2'

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns companies by bucketId', async () => {
    ;(companyBucketMembershipService.getCompaniesByBucketId as jest.Mock).mockResolvedValueOnce(expectedCompanies)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        bucketId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedCompanies)
  })

  test('GET returns buckets by companyId', async () => {
    ;(companyBucketMembershipService.getBucketsByCompanyId as jest.Mock).mockResolvedValueOnce(expectedBuckets)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        companyId
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedBuckets)
  })

  test('POST adds company to bucket', async () => {
    ;(companyBucketMembershipService.addCompanyToBucket as jest.Mock).mockResolvedValueOnce(expectedMembership)

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        bucketId,
        companyId
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedMembership)
  })

  test('DELETE removes company from bucket', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        bucketId,
        companyId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Company Removed from Bucket Successfully' })
  })
})

import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/companyBucketRelation'
import {
  getBucketsByCompanyId,
  getCompaniesByBucketId,
  addCompanyToBucket,
  removeCompanyFromBucket,
  checkCompanyBucketMembershipExistence
} from '@/api/db/services/companyBucketMembershipService'
import { getCompanyByID, createCompany } from '@/api/db/services/companyService'
import { getBucketById, createBucket } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
jest.mock('@/api/db/services/companyBucketMembershipService')
jest.mock('@/api/db/services/companyService')
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

const mockBucket = {
  id: 1,
  title: 'bucket1',
  description: 'bucket1 description',
  ownerId: 1,
  isPublic: true,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}
const mockCompany = {
  id: 1,
  name: 'company1',
  description: 'company1 description',
  addedBy: 1,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}
const mockMembership = {
  companyId: 1,
  bucketId: 1,
  createdAt: '2023-12-03T21:23:57.281Z',
  modifiedAt: '2023-12-03T21:23:57.281Z'
}
describe('Company Bucket Membership API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET with companyId returns bucket', async () => {
    getCompanyByID.mockResolvedValue(mockCompany)
    getBucketsByCompanyId.mockResolvedValue(mockBucket)
    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockBucket)
  })

  test('GET with bucketId returns company', async () => {
    getBucketById.mockResolvedValue(mockBucket)
    getCompaniesByBucketId.mockResolvedValue(mockCompany)
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockCompany)
  })

  test('GET with valid bucketId but no companies returns 404', async () => {
    getCompaniesByBucketId.mockResolvedValueOnce(null) // Simulate no companies found

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' } // Valid bucketId
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'No Companies found' })
  })

  test('GET with server error returns 500', async () => {
    getCompaniesByBucketId.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('POST creates a new membership', async () => {
    createCompany.mockResolvedValueOnce(mockCompany)
    createBucket.mockResolvedValueOnce(mockBucket)
    const existingMembership = await checkCompanyBucketMembershipExistence.mockResolvedValueOnce(mockMembership)
    if (existingMembership) {
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          companyId: '1',
          bucketId: '1'
        }
      })
      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual(mockMembership)
    } else {
      addCompanyToBucket.mockResolvedValueOnce(mockMembership)
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          companyId: '1',
          bucketId: '1'
        }
      })

      await handler(req, res, mockUser)
      expect(res._getStatusCode()).toBe(201)
    }
  })
  test('POST with non-existent company or bucket returns 404', async () => {
    getCompanyByID.mockRejectedValueOnce(new ItemNotFoundError('Company not found'))

    const { req, res } = createMocks({
      method: 'POST',
      query: { companyId: 'non_existent_id', bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
  })

  test('POST with server error returns 500', async () => {
    addCompanyToBucket.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'POST',
      query: { companyId: '1', bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
  test('DELETE with non-existent company or bucket returns 404', async () => {
    getCompanyByID.mockRejectedValueOnce(new ItemNotFoundError('Company not found'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: 'non_existent_id', bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(400)
  })
  test('DELETE with server error returns 500', async () => {
    removeCompanyFromBucket.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: '1', bucketId: '1' }
    })

    await handler(req, res, mockUser)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

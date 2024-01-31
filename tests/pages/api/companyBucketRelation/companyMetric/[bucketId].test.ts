import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/companyBucketRelation/companyMetric/[bucketId]'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { getCompaniesByBucketId } from '@/api/db/services/companyBucketMembershipService'
import { getMeasurementValueCompanyId } from '@/api/db/services/companySourceMeasurementService'
jest.mock('@/api/db/services/companyBucketMembershipService')
jest.mock('@/api/db/services/companySourceMeasurementService')
jest.mock('@/api/middleware/auth')

const mockValue = {
  id: 1,
  companyMeasurementId: 1,
  value: 1,
  timestamp: '2023-12-01T15:22:29.146Z',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Membership API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET - Successfully retrieves measurement values (200 status)', async () => {
    getCompaniesByBucketId.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]) // Mocked company data
    getMeasurementValueCompanyId.mockResolvedValueOnce(mockValue)
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - No measurement value for company id found (404 status)', async () => {
    getCompaniesByBucketId.mockResolvedValueOnce([{ id: 1 }])
    getMeasurementValueCompanyId.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })

  test('GET - Item not found error (404 status)', async () => {
    getCompaniesByBucketId.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })

  test('GET - Internal server error (500 status)', async () => {
    getCompaniesByBucketId.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { bucketId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(500)
  })

  test('Unsupported method (405 status)', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })
})

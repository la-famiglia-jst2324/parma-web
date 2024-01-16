import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/companyMeasurements'
import {
  createCompanySourceMeasurement,
  getAllCompanySourceMeasurements
} from '@/api/db/services/companySourceMeasurementService'

jest.mock('@/api/db/services/companySourceMeasurementService')

const mockMembership = {
  id: 1,
  sourceMeasurementId: 1,
  companyId: 1,
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Company Measurement API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new membership', async () => {
    createCompanySourceMeasurement.mockResolvedValueOnce(mockMembership)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        sourceMeasurementId: 1,
        companyId: 1,
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(mockMembership)
  })

  test('GET returns all membership', async () => {
    getAllCompanySourceMeasurements.mockResolvedValue(mockMembership)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

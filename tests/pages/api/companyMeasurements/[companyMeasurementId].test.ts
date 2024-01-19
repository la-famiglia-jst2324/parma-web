import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/companyMeasurements/[companyMeasurementId]'
import {
  getCompanySourceMeasurementByID,
  updateCompanySourceMeasurement,
  deleteCompanySourceMeasurement
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

  test('GET returns a data source', async () => {
    getCompanySourceMeasurementByID.mockResolvedValueOnce(mockMembership)
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        companyMeasurementId: '1'
      }
    })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockMembership)
  })

  test('PUT update ', async () => {
    const existingSource = getCompanySourceMeasurementByID.mockResolvedValueOnce(mockMembership)
    updateCompanySourceMeasurement.mockResolvedValueOnce(existingSource)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a data source', async () => {
    const existingSource = getCompanySourceMeasurementByID.mockResolvedValueOnce(mockMembership)
    deleteCompanySourceMeasurement.mockResolvedValueOnce(existingSource)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

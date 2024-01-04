import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/company/[companyId]'
import { getCompanyByID, deleteCompany, updateCompany } from '@/api/db/services/companyService'
jest.mock('@/api/db/services/companyService')

const mockCompany = {
  id: 1,
  name: 'company1',
  description: 'company1 description',
  addedBy: 1,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('CompanyId API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a company', async () => {
    getCompanyByID.mockResolvedValueOnce(mockCompany)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockCompany)
  })

  test('PUT update a company', async () => {
    const existingCompany = getCompanyByID.mockResolvedValueOnce(mockCompany)
    updateCompany.mockResolvedValueOnce(existingCompany)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE delete a company', async () => {
    const existingCompany = getCompanyByID.mockResolvedValueOnce(mockCompany)
    deleteCompany.mockResolvedValueOnce(existingCompany)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Company successfully Deleted' })
  })
})

import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/company/[companyId]'
import { getCompanyByID, deleteCompany, updateCompany } from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

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
      method: 'GET',
      query: { companyId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockCompany)
  })

  test('GET without a valid company returns 404', async () => {
    getCompanyByID.mockResolvedValueOnce(null) // Simulate no company found

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData()).error).toContain('No company with id')
  })

  test('GET with invalid companyId returns 404', async () => {
    getCompanyByID.mockRejectedValueOnce(new ItemNotFoundError('Company not found'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: 'invalid_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData()).error).toContain('No company with id')
  })
  test('GET with server error returns 500', async () => {
    getCompanyByID.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: 'error_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
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

  test('PUT with non-existent companyId returns 404', async () => {
    getCompanyByID.mockResolvedValueOnce(null) // Simulate company not found

    const { req, res } = createMocks({
      method: 'PUT',
      query: { companyId: 'non_existent_id' },
      body: {
        name: 'company1',
        description: 'company1 description'
      } // Valid company data
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(204)
    expect(JSON.parse(res._getData()).error).toContain('No company')
  })

  test('PUT with server error during update returns 500', async () => {
    getCompanyByID.mockResolvedValueOnce(mockCompany)
    updateCompany.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { companyId: 'error_id' },
      body: {
        name: 'company1',
        description: 'company1 description'
      } // Valid updated company data
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
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

  test('DELETE with non-existent companyId returns 404', async () => {
    getCompanyByID.mockResolvedValueOnce(null)

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: 'non_existent_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(204)
  })

  test('DELETE with server error returns 500', async () => {
    getCompanyByID.mockResolvedValueOnce(mockCompany)
    deleteCompany.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { companyId: 'error_id' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

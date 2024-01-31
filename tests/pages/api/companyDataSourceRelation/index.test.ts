import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/companyDataSourceRelation'
import {
  createCompanyDataSource,
  deleteCompanyDataSource,
  updateCompanyDataSource,
  getCompaniesByDataSourceId
} from '@/api/db/services/companyDataSourceService'
jest.mock('@/api/db/services/companyDataSourceService')
jest.mock('@/api/db/services/companyService')
jest.mock('@/api/db/services/dataSourceService')

const mockMembership = {
  dataSourceId: 1,
  companyId: 1,
  isDataSourceActive: true,
  healthStatus: 'UP'
}
describe('Company DataSource Membership API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new membership', async () => {
    createCompanyDataSource.mockResolvedValueOnce(mockMembership)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        dataSourceId: 1
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('POST with invalid parameters returns 400', async () => {
    createCompanyDataSource.mockResolvedValueOnce(null) // Simulate failure due to invalid parameters

    const { req, res } = createMocks({
      method: 'POST',
      body: { dataSourceId: 1 }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid request parameters' })
  })

  test('POST with server error returns 500', async () => {
    createCompanyDataSource.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyId: 1,
        dataSourceId: 1
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('DELETE delete a membership', async () => {
    deleteCompanyDataSource.mockResolvedValueOnce(mockMembership)
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        companyId: '1',
        dataSourceId: '1'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Company Data Source Deleted Successfully' })
  })

  test('PUT update a membership', async () => {
    updateCompanyDataSource.mockResolvedValueOnce(mockMembership)
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        companyId: '1',
        dataSourceId: '1',
        description: 'company1 description'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('PUT with server error returns 500', async () => {
    updateCompanyDataSource.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'PUT',
      query: { companyId: '1', dataSourceId: '1' },
      body: { description: 'company1 description' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })

  test('GET with both dataSourceId and companyId returns 200', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { dataSourceId: '1', companyId: '1' } // Both parameters provided
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
  })

  test('GET with valid dataSourceId but no companies returns 200', async () => {
    getCompaniesByDataSourceId.mockResolvedValueOnce([]) // Simulate no companies found

    const { req, res } = createMocks({
      method: 'GET',
      query: { dataSourceId: '1' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual([])
  })

  test('GET with server error returns 500', async () => {
    getCompaniesByDataSourceId.mockRejectedValueOnce(new Error('Internal Server Error'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { dataSourceId: '1' } // Valid dataSourceId
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Internal Server Error' })
  })
})

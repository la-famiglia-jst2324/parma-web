import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/companyDataSourceRelation'
import {
  createCompanyDataSource,
  deleteCompanyDataSource,
  updateCompanyDataSource
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
      query: {
        companyId: '1',
        dataSourceId: '1'
      }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
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
})

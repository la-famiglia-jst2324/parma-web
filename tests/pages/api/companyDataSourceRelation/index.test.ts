import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/companyDataSourceRelation'
import * as companyDataSourceService from '@/api/db/services/companyDataSourceService'

jest.mock('@/api/db/services/companyDataSourceService')

const expectedDataSources = [
  {
    id: 12,
    sourceName: 'source1',
    isActive: true,
    defaultFrequency: 'DAILY',
    healthStatus: 'UP',
    description: null,
    createdAt: '2023-12-01T14:47:49.598Z',
    modifiedAt: '2023-12-01T14:47:49.598Z'
  },
  {
    id: 13,
    sourceName: 'source1',
    isActive: true,
    defaultFrequency: 'DAILY',
    healthStatus: 'UP',
    description: null,
    createdAt: '2023-12-01T14:47:49.601Z',
    modifiedAt: '2023-12-01T14:47:49.601Z'
  }
]

const expectedCompanies = [
  {
    id: 4,
    name: 'Company 1',
    description: 'Company 1 description',
    addedBy: 3,
    createdAt: '2023-12-01T14:43:48.918Z',
    modifiedAt: '2023-12-01T14:43:48.918Z'
  }
]

const expectedCompanyDataSource = {
  dataSourceId: 14,
  companyId: 4,
  isDataSourceActive: true,
  healthStatus: 'UP',
  createdAt: '2023-12-01T20:42:46.972Z',
  modifiedAt: '2023-12-01T20:42:46.972Z'
}

const expectedUpdatedData = {
  dataSourceId: 13,
  companyId: 4,
  isDataSourceActive: false,
  healthStatus: 'UP',
  createdAt: '2023-12-01T20:42:41.746Z',
  modifiedAt: '2023-12-02T20:33:39.656Z'
}

describe('/api/companyDataSource', () => {
  const dataSourceId = '1'
  const companyId = '2'

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns companies by dataSourceId', async () => {
    ;(companyDataSourceService.getCompaniesByDataSourceId as jest.Mock).mockResolvedValueOnce(expectedCompanies)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        dataSourceId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedCompanies)
  })

  test('GET returns data sources by companyId', async () => {
    ;(companyDataSourceService.getDataSourcesByCompanyId as jest.Mock).mockResolvedValueOnce(expectedDataSources)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        companyId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedDataSources)
  })

  test('POST creates company data source', async () => {
    ;(companyDataSourceService.createCompanyDataSource as jest.Mock).mockResolvedValueOnce(expectedCompanyDataSource)

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        companyId,
        dataSourceId
      },
      body: {
        dataSourceId: 14,
        companyId: 4,
        isDataSourceActive: true,
        healthStatus: 'UP'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedCompanyDataSource)
  })

  test('PUT updates company data source', async () => {
    ;(companyDataSourceService.updateCompanyDataSource as jest.Mock).mockResolvedValueOnce(expectedUpdatedData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        companyId,
        dataSourceId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedUpdatedData)
  })

  test('DELETE removes company data source', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        companyId,
        dataSourceId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Company Data Source Deleted Successfully' })
  })
})

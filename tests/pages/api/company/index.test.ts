import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/company'
import * as companyService from '@/api/db/services/companyService'

jest.mock('@/api/db/services/companyService')

describe('/api/companies', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a list of companies with pagination info', async () => {
    const expectedCompanies = [
      {
        id: 1,
        name: 'Company A',
        description: 'Description A',
        addedBy: 1,
        createdAt: '2023-12-01T14:43:48.918Z',
        modifiedAt: '2023-12-01T14:43:48.918Z'
      },
      {
        id: 2,
        name: 'Company B',
        description: 'Description B',
        addedBy: 2,
        createdAt: '2023-12-01T14:45:48.918Z',
        modifiedAt: '2023-12-01T14:45:48.918Z'
      }
    ]

    const expectedPagination = {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: expectedCompanies.length
    }

    ;(companyService.getAllCompanies as jest.Mock).mockResolvedValueOnce({
      companies: expectedCompanies,
      pagination: expectedPagination
    })
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        page: '1',
        pageSize: '10'
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    const responseBody = JSON.parse(res._getData())
    expect(responseBody).toHaveProperty('pagination')
    expect(responseBody.pagination).toEqual(expectedPagination)
    expect(responseBody).toEqual(expect.objectContaining({ companies: expectedCompanies }))
  })

  test('POST creates a new company', async () => {
    const newCompanyData = {
      name: 'New Company',
      description: 'New Description',
      addedBy: 1
    }

    ;(companyService.createCompany as jest.Mock).mockResolvedValueOnce(newCompanyData)

    const { req, res } = createMocks({
      method: 'POST',
      body: newCompanyData
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(newCompanyData)
  })
})

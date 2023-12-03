import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/company/[companyId]'
import { getCompanyByID, updateCompany, deleteCompany } from '@/api/db/services/companyService'

jest.mock('@/api/db/services/companyService')

const expectedCompanyData = {
  id: 4,
  name: 'Company Title',
  description: 'Company Description',
  addedBy: 3,
  createdAt: '2023-12-01T14:43:48.918Z',
  modifiedAt: '2023-12-01T14:43:48.918Z'
}

const updatedCompanyData = {
  id: 4,
  name: 'Updated Company Name',
  description: 'Updated description',
  addedBy: 3,
  createdAt: '2023-12-01T14:43:48.918Z',
  modifiedAt: '2023-12-01T14:43:48.918Z'
}
describe('/api/company/', () => {
  const companyId = 1

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a single company', async () => {
    // Define the expected company data in the response

    getCompanyByID.mockResolvedValueOnce(expectedCompanyData)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        companyId
      }
    })
    await handler(req, res)

    // Assert that the response status code is 200, and the response body matches the expected companyData
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(expectedCompanyData)
  })

  test('PUT updates a company', async () => {
    // Define the expected updated company data

    getCompanyByID.mockResolvedValueOnce(expectedCompanyData)
    updateCompany.mockResolvedValueOnce(updatedCompanyData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        companyId
      },
      body: {
        name: 'Updated Company Name',
        description: 'Updated description'
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedCompanyData)
  })

  test('DELETE deletes a company', async () => {
    getCompanyByID.mockResolvedValueOnce(expectedCompanyData)

    deleteCompany.mockResolvedValueOnce()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        companyId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Company successfully Deleted' })
  })
})

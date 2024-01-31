import { createMocks } from 'node-mocks-http'
import { IdentifierType } from '@prisma/client'
import { handler } from '@/pages/api/companyDataSourceIdentifier/index'
import {
  createCompanyDataSourceIdentifier,
  getCompanyDataSourceIdentifierById,
  updateCompanyDataSourceIdentifier,
  deleteCompanyDataSourceIdentifier
} from '@/api/db/services/companyDataSourceIdentifierService'
jest.mock('@/api/db/services/companyDataSourceIdentifierService')
jest.mock('@/api/middleware/auth')

const mockIdentifier = {
  companyDataSourceId: 1,
  identifierType: IdentifierType.AUTOMATICALLY_DISCOVERED,
  property: 'property',
  value: '1',
  validity: new Date()
}
describe('Company DataSource Identifier API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET - Successfully retrieves identifier by id (200 status)', async () => {
    getCompanyDataSourceIdentifierById.mockResolvedValueOnce(mockIdentifier)
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - No Identifier found (400 status)', async () => {
    getCompanyDataSourceIdentifierById.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })

  test('POST - Successfully creates a new identifier (201 status)', async () => {
    createCompanyDataSourceIdentifier.mockResolvedValueOnce(mockIdentifier)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        companyDataSourceId: 1,
        identifierType: IdentifierType.AUTOMATICALLY_DISCOVERED,
        property: 'property',
        value: '1',
        validity: new Date()
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
  })

  test('PUT - Successfully updates an identifier (200 status)', async () => {
    updateCompanyDataSourceIdentifier.mockResolvedValueOnce(mockIdentifier)
    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: { value: '2' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  test('DELETE - Successfully deletes an identifier (200 status)', async () => {
    deleteCompanyDataSourceIdentifier.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

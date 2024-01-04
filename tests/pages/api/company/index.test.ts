import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/company/'
import { createCompany, getAllCompaniesWithoutPagination, getCompanyByName } from '@/api/db/services/companyService'
jest.mock('@/api/db/services/companyService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))
const mockUser: User = {
  id: 1,
  authId: 'AAAAAdfw',
  name: 'ZL',
  profilePicture: 'pic',
  role: 'USER',
  createdAt: new Date(),
  modifiedAt: new Date()
}
const companies = {
  companies: [
    {
      id: 1,
      name: 'company1',
      description: 'company1 description',
      addedBy: 1,
      createdAt: '2023-12-01T15:22:29.146Z',
      modifiedAt: '2023-12-01T15:22:29.146Z'
    },
    {
      id: 2,
      name: 'company2',
      description: 'company2 description',
      addedBy: 1,
      createdAt: '2023-12-01T15:54:26.490Z',
      modifiedAt: '2023-12-01T15:54:26.490Z'
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 11,
    totalCount: 109
  }
}
const mockCompany = {
  id: 1,
  name: 'company1',
  description: 'company1 description',
  addedBy: 1,
  createdAt: '2023-12-02T21:23:57.281Z',
  modifiedAt: '2023-12-02T21:23:57.281Z'
}

describe('Company API', () => {
  test('GET with companyName returns company', async () => {
    const mockCompanyName = 'company1'
    getCompanyByName.mockResolvedValue(mockCompany)
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: mockCompanyName }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockCompany)
  })

  test('GET return all companies', async () => {
    getAllCompaniesWithoutPagination.mockResolvedValue(companies)
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(companies)
  })

  test('POST creates a new company', async () => {
    createCompany.mockResolvedValueOnce(mockCompany)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'company1',
        description: 'company1 description',
        addedBy: mockUser.id,
        modifiedAt: '2023-12-02T21:23:57.281Z'
      }
    })
    await handler(req, res, mockUser)
  })
})

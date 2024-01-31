import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createUserCustomization, getUserCustomizations } from '@/api/db/services/userCustomizationService'
import { handler } from '@/pages/api/analytics/configurations/index'

jest.mock('@/api/db/services/userCustomizationService')
jest.mock('@/api/db/services/userCompanyCustomizationService')
jest.mock('@/api/db/services/userMetricCustomizationService')

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
  modifiedAt: new Date(),
  username: 'zl'
}

const userCustomization = {
  id: 1,
  name: 'customization',
  userId: mockUser.id,
  createdAt: new Date(),
  modifiedAt: new Date()
}
describe('User Customization API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST - Successfully creates user customization (201 status)', async () => {
    createUserCustomization.mockResolvedValueOnce({ id: 1, name: 'customization' })
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'customization', companyIds: [1, 2], metricIds: [1, 2] }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(201)
    expect(res._getJSONData()).toHaveProperty('id')
  })

  test('POST - Internal server error (500 status)', async () => {
    createUserCustomization.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'customization', companyIds: [1, 2], metricIds: [1, 2] }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('GET - Successfully retrieves user customizations (200 status)', async () => {
    getUserCustomizations.mockResolvedValueOnce(userCustomization)
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - Internal server error (500 status)', async () => {
    getUserCustomizations.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('Unsupported method (405 status)', async () => {
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(405)
  })
})

import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { handler } from '@/pages/api/profile'
import { updateUser, getUserById } from '@/api/db/services/userService'
jest.mock('@/api/db/services/userService')
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

describe('Profile API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('PUT update a user profile', async () => {
    const existingUser = getUserById.mockResolvedValueOnce(mockUser)
    updateUser.mockResolvedValueOnce(existingUser)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET logged in user profile', async () => {
    const existingUser = getUserById.mockResolvedValueOnce(mockUser)
    getUserById.mockResolvedValueOnce(existingUser)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })
})

import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import handler from '@/pages/api/user/index'
import { createUser, getAllUsers, getUserById, updateUser } from '@/api/db/services/userService'
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
const users = {
  users: [
    {
      id: 1,
      authId: 'AAAAAdfw',
      name: 'ZL',
      profilePicture: 'pic',
      role: 'USER',
      createdAt: new Date(),
      modifiedAt: new Date()
    },
    {
      id: 2,
      authId: 'AAAAAdadfw',
      name: 'zl',
      profilePicture: 'pict',
      role: 'USER',
      createdAt: new Date(),
      modifiedAt: new Date()
    }
  ]
}
describe('User API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET return all users', async () => {
    getAllUsers.mockResolvedValue(users)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    // expect(res._getStatusCode()).toBe(200)
    // expect(JSON.parse(res._getData())).toEqual(users)
  })

  test('POST creates a new user', async () => {
    createUser.mockResolvedValueOnce(mockUser)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        authId: 'AAAAAdfw',
        name: 'ZL',
        profilePicture: 'pic',
        role: 'USER'
      }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(201)
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
})

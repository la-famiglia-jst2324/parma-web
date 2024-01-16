import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import { randomUserDummy } from '@tests/data/dummy/user'
import { handler } from '@/pages/api/user/index'
import { createUser, getAllUsers, getUserById, updateUser } from '@/api/db/services/userService'
jest.mock('@/api/db/services/userService')
const mockUserIn: User = {
  authId: 'AAAAAdfw',
  name: 'ZL',
  profilePicture: '',
  role: 'USER'
}
const mockUser: User = {
  ...mockUserIn,
  id: 1,
  createdAt: new Date(),
  modifiedAt: new Date()
}
const users = [
  randomUserDummy({ managedFields: true }),
  randomUserDummy({ managedFields: true }),
  randomUserDummy({ managedFields: true })
]
describe('User API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET return all users', async () => {
    await getAllUsers.mockResolvedValue(users)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(users)
  })

  test('POST creates a new user', async () => {
    createUser.mockResolvedValueOnce(mockUser)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        authId: 'AAAAAdfw',
        name: 'ZL',
        profilePicture: '',
        role: 'USER'
      }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(201)
  })

  test('PUT update a user profile', async () => {
    getUserById.mockResolvedValueOnce(mockUser)
    updateUser.mockResolvedValueOnce(mockUser)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })
})

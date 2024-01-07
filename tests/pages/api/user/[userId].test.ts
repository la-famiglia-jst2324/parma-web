import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/user/[userId]'
import { getUserById, updateUser, deleteUser } from '@/api/db/services/userService'
jest.mock('@/api/db/services/userService')
const mockUser = {
  id: 1,
  authId: 'AAAAAdfw',
  name: 'ZL',
  profilePicture: 'pic',
  role: 'USER',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('User API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a user', async () => {
    getUserById.mockResolvedValueOnce(mockUser)
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockUser)
  })

  test('DELETE delete a user', async () => {
    const existingUser = await getUserById.mockResolvedValueOnce(mockUser)
    deleteUser.mockResolvedValueOnce(existingUser)
    const { req, res } = createMocks({
      method: 'DELETE'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'User successfully Deleted' })
  })

  test('PUT update a user', async () => {
    const existingUser = await getUserById.mockResolvedValueOnce(mockUser)
    updateUser.mockResolvedValueOnce(existingUser)
    const { req, res } = createMocks({
      method: 'PUT'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})

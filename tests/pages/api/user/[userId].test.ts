import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/user/[userId]'
import { getUserById, updateUser, deleteUser } from '@/api/db/services/userService'

jest.mock('@/api/db/services/userService')

const userData = {
  id: 1,
  authId: '1',
  name: 'Alice',
  role: 'ADMIN',
  createdAt: '2023-12-01T14:42:32.505Z',
  modifiedAt: '2023-12-01T14:42:32.505Z',
  ownedBuckets: [],
  notificationSubscriptions: [
    {
      userId: 1,
      companyId: 2,
      channelId: 2,
      createdAt: '2023-12-02T22:56:42.759Z',
      modifiedAt: '2023-12-02T22:56:42.759Z'
    }
  ],
  reportSubscriptions: [],
  permissions: []
}

describe('User API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET retrieves a user by ID', async () => {
    const userId = 1 // Replace with a valid user ID

    getUserById.mockResolvedValueOnce(userData)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        userId
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(userData)
  })

  test('PUT updates a user', async () => {
    const userId = 1 // Replace with a valid user ID
    const updatedUserData = {
      id: 1,
      authId: '1',
      name: 'Dave',
      role: 'ADMIN',
      createdAt: '2023-12-01T14:42:32.505Z',
      modifiedAt: '2023-12-03T00:25:17.020Z'
    }
    getUserById.mockResolvedValueOnce(userData)
    updateUser.mockResolvedValueOnce(updatedUserData)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        userId
      },
      body: {
        name: 'Dave'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(updatedUserData)
  })

  test('DELETE deletes a user', async () => {
    const userId = 1 // Replace with a valid user ID
    getUserById.mockResolvedValueOnce(userData)
    deleteUser.mockResolvedValueOnce()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        userId
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({ message: 'User successfully Deleted' })
  })
})

import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/user/'
import { createUser, getAllUsers } from '@/api/db/services/userService'

jest.mock('@/api/db/services/userService')

describe('User API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET returns a list of users', async () => {
    const usersData = [
      {
        id: 1,
        authId: '1',
        name: 'Alice',
        role: 'ADMIN',
        createdAt: '2023-12-01T14:42:32.505Z',
        modifiedAt: '2023-12-01T14:42:32.505Z'
      },
      {
        id: 3,
        authId: '2',
        name: 'Bob',
        role: 'ADMIN',
        createdAt: '2023-12-01T14:42:49.870Z',
        modifiedAt: '2023-12-01T14:42:49.870Z'
      }
    ]
    getAllUsers.mockResolvedValueOnce(usersData)

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(usersData)
  })

  test('POST creates a user', async () => {
    const userData = {
      id: 1048,
      authId: '4',
      name: 'Chralie',
      role: 'ADMIN',
      createdAt: '2023-12-03T00:04:11.654Z',
      modifiedAt: '2023-12-03T00:04:11.654Z'
    }
    createUser.mockResolvedValueOnce(userData)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Chralie',
        role: 'ADMIN',
        authId: '4'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(userData)
  })
})

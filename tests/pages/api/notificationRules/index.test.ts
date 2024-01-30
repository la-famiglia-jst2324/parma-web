import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { handler } from '@/pages/api/notificationRules/index'
import { createNotificationRule } from '@/api/db/services/notificationRulesService'
jest.mock('@/api/db/services/notificationRulesService')

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
  username: 'a'
}
const mockRule = {
  ruleId: 1,
  ruleName: 'rule1',
  sourceMeasurementId: 1,
  threshold: 1.1,
  createdAt: new Date(),
  modifiedAt: new Date()
}
describe('Notification Rules API Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST - Successfully creates a notification rule (201 status)', async () => {
    createNotificationRule.mockResolvedValueOnce(mockRule)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        ruleName: 'rule1',
        sourceMeasurementId: 1,
        threshold: 1.1
      }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(201)
  })

  test('POST - Invalid request parameters (400 status)', async () => {
    createNotificationRule.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        threshold: 1.1
      }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(400)
  })

  test('POST - Internal server error (500 status)', async () => {
    createNotificationRule.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        ruleName: 'rule1',
        sourceMeasurementId: 1,
        threshold: 1.1
      }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('Unsupported method (405 status)', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(405)
  })
})

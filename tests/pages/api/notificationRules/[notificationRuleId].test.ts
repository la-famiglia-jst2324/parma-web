import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { handler } from '@/pages/api/notificationRules/[notificationRuleId]'
import {
  getNotificationRuleById,
  updateNotificationRule,
  deleteNotificationRule
} from '@/api/db/services/notificationRulesService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
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
describe('Notification Rule Id API Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET - Successfully retrieves a notification rule (200 status)', async () => {
    getNotificationRuleById.mockResolvedValueOnce(mockRule)
    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationRuleId: '1' }
    })
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('GET - No NotificationRule found (400 status)', async () => {
    getNotificationRuleById.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationRuleId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(400)
  })

  test('GET - Item not found error (404 status)', async () => {
    getNotificationRuleById.mockRejectedValueOnce(new ItemNotFoundError('No NotificationRule found'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationRuleId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(404)
  })

  test('GET - Internal server error (500 status)', async () => {
    getNotificationRuleById.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { notificationRuleId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('PUT - Successfully updates a notification rule (200 status)', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      query: { notificationRuleId: '1' },
      body: { ruleName: 'updated' }
    })
    updateNotificationRule.mockResolvedValueOnce(mockRule)
    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })

  test('PUT - Internal server error (500 status)', async () => {
    updateNotificationRule.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'PUT',
      query: { notificationRuleId: '1' },
      body: { ruleName: 'updated' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(500)
  })

  test('DELETE - Successfully deletes a notification rule (200 status)', async () => {
    deleteNotificationRule.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { notificationRuleId: '1' }
    })

    await handler(req, res, mockUser)
    expect(res._getStatusCode()).toBe(200)
  })
})

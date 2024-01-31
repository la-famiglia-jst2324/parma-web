import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/company/[companyId]/rawData'
import { readRawDataByAllDatasources } from '@/pages/api/lib/utils/firebaseStorage'
jest.mock('@/pages/api/lib/utils/firebaseStorage')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))

describe('Company Attachment API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET - Raw data not found (404 status)', async () => {
    readRawDataByAllDatasources.mockResolvedValueOnce(null)
    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1' }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })

  test('GET - Internal server error (500 status)', async () => {
    readRawDataByAllDatasources.mockRejectedValueOnce(new Error('Internal Server Error'))
    const { req, res } = createMocks({
      method: 'GET',
      query: { companyId: '1' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(500)
  })
})

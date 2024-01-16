import { createMocks } from 'node-mocks-http'
import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '@/pages/api/analytics/index'
import { getValueByMeasurementIdCompanyId } from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

jest.mock('@/api/db/services/companySourceMeasurementService')
jest.mock('@/api/middleware/auth', () => ({
  withAuthValidation: jest.fn().mockImplementation((handler) => {
    return async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      return handler(req, res, user)
    }
  })
}))

describe('Get measurement value', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET with non-existent measurementId returns 404', async () => {
    getValueByMeasurementIdCompanyId.mockRejectedValueOnce(new ItemNotFoundError('Item not found'))

    const { req, res } = createMocks({
      method: 'GET',
      query: { measurementId: 'non_existent_id', companies: '1,2,3' }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({ error: 'Item not found' })
  })
})

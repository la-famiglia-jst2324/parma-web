import { createMocks } from 'node-mocks-http'
import { deleteUserCustomization } from '@/api/db/services/userCustomizationService'
import { handler } from '@/pages/api/analytics/configurations/[id]'

jest.mock('@/api/db/services/userCustomizationService')
jest.mock('@/api/db/services/userCompanyCustomizationService')
jest.mock('@/api/db/services/userMetricCustomizationService')

jest.mock('@/api/middleware/auth')

describe('Customization Deletion API Handler Tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('DELETE - Successfully deletes a customization (200 status)', async () => {
    deleteUserCustomization.mockResolvedValueOnce()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: '1' }
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toHaveProperty('message')
  })

  test('Unsupported method (405 status)', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })
})

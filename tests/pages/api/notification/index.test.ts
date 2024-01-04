import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification'
import { createNotification } from '@/api/db/services/notificationService'
jest.mock('@/api/db/services/notificationService')

const newNotification = {
  id: 1,
  message: 'message',
  companyId: 1,
  dataSourceId: 1,
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Notification API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new notification', async () => {
    createNotification.mockResolvedValueOnce(newNotification)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'message',
        companyId: 1,
        dataSourceId: 1,
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(newNotification)
  })
})

import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notification/'
import { createNotification } from '@/api/db/services/notificationService'

jest.mock('@/api/db/services/notificationService')

const newNotificationData = {
  id: 34,
  message: 'Notification',
  companyId: 4,
  dataSourceId: 12,
  createdAt: '2023-12-02T22:18:18.248Z',
  modifiedAt: '2023-12-02T22:18:18.248Z'
}

describe('Notification Creation API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new notification', async () => {
    createNotification.mockResolvedValueOnce(newNotificationData)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'Notification',
        dataSourceId: 12,
        companyId: 4
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(newNotificationData)
  })
})

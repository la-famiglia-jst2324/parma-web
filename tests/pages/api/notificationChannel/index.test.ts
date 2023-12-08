import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/notificationChannel'
import { createNotificationChannel } from '@/api/db/services/notificationChannelService'

jest.mock('@/api/db/services/notificationChannelService')

const newNotificationChannelData = {
  id: 175,
  entityId: 'entity id',
  entityType: 'REPORT',
  channelType: 'SLACK',
  destination: 'slack',
  createdAt: '2023-12-02T22:43:21.503Z',
  modifiedAt: '2023-12-02T22:43:21.503Z'
}
describe('Notification Channel Creation API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('POST creates a new notification channel', async () => {
    createNotificationChannel.mockResolvedValueOnce(newNotificationChannelData)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        entityId: 'entity id',
        entityType: 'REPORT',
        channelType: 'SLACK',
        destination: 'slack'
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(newNotificationChannelData)
  })
})

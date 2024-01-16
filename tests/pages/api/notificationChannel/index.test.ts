import { createMocks } from 'node-mocks-http'
import { handler } from '@/pages/api/notificationChannel'
import { createNotificationChannel } from '@/api/db/services/notificationChannelService'
jest.mock('@/api/db/services/notificationChannelService')

const mockChannel = {
  id: 1,
  channelType: 'EMAIL',
  destination: 'abc@gmail.com',
  createdAt: '2023-12-01T15:22:29.146Z',
  modifiedAt: '2023-12-01T15:22:29.146Z'
}
describe('Notification Channel API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('POST creates a new subscription', async () => {
    createNotificationChannel.mockResolvedValueOnce(mockChannel)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        channelType: 'EMAIL',
        destination: 'abc@gmail.com',
        modifiedAt: '2023-12-01T15:22:29.146Z'
      }
    })
    await handler(req, res)
    expect(JSON.parse(res._getData())).toEqual(mockChannel)
  })
})

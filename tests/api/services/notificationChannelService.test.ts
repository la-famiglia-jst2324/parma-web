import { ChannelType, PrismaClient } from '@prisma/client'
import {
  createNotificationChannel,
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'
const prisma = new PrismaClient()

describe('Notification Channel Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let channelId: number

  test('Create a new slack channel with valid details', async () => {
    const channel = await createNotificationChannel({
      channelType: ChannelType.SLACK,
      destination: 'la-famiglia-data-analytics',
      apiKey: 'my_plain_api_key'
    })
    // sleep 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000))
    channelId = channel.id
    expect(channel).toHaveProperty('id')
    expect(channel.channelType).toBe(ChannelType.SLACK)
    expect(channel.destination).toBe('la-famiglia-data-analytics')
  }, 100000)

  test('Create a new channel without api key', async () => {
    const channel = await createNotificationChannel({
      channelType: ChannelType.EMAIL,
      destination: 'emailaddress'
    })
    channelId = channel.id
    expect(channel).toHaveProperty('id')
    expect(channel.channelType).toBe(ChannelType.EMAIL)
    expect(channel.destination).toBe('emailaddress')
  })

  test('Retrieve a channel by ID', async () => {
    const channel = await getNotificationChannelById(channelId)
    expect(channel).toBeTruthy()
    expect(channel?.id).toBe(channelId)
  })

  test('Update a channel name', async () => {
    const updatedReport = await updateNotificationChannel(channelId, {
      channelType: ChannelType.SLACK,
      destination: 'slackchannel'
    })
    expect(updatedReport.channelType).toBe(ChannelType.SLACK)
    expect(updatedReport.destination).toBe('slackchannel')
  })

  test('Delete a channel', async () => {
    await deleteNotificationChannel(channelId)
    const deletedChannel = await prisma.notificationChannel.findUnique({
      where: { id: channelId }
    })
    expect(deletedChannel).toBeNull()
  })
})

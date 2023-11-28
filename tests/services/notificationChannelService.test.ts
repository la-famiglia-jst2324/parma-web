import { ChannelType, EntityType, PrismaClient } from '@prisma/client'
import {
  createNotificationChannel,
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/pages/api/services/notificationChannelService'
const prisma = new PrismaClient()

describe('Notification Channel Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let channelId: number

  test('Create a new channel with valid details', async () => {
    const channel = await createNotificationChannel({
      entityId: 'entity1',
      entityType: EntityType.NOTIFICATION,
      channelType: ChannelType.EMAIL,
      destination: 'emailaddress'
    })
    channelId = channel.id
    expect(channel).toHaveProperty('id')
    expect(channel.entityType).toBe(EntityType.NOTIFICATION)
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
      entityType: EntityType.REPORT,
      channelType: ChannelType.SLACK,
      destination: 'slackchannel'
    })
    expect(updatedReport.entityType).toBe(EntityType.REPORT)
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

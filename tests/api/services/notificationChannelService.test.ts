/*
 * @jest-environment node
 */
import { ChannelType, PrismaClient } from '@prisma/client'
import {
  createNotificationChannel,
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'
import { getSecretManagerClient, retrieveSecret } from '@/api/gcp/secret_manager'
const prisma = new PrismaClient()

describe('Notification Channel Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let channelId: number
  let channelId2: number

  test('Create a new slack channel with valid details', async () => {
    const channel = await createNotificationChannel({
      channelType: ChannelType.SLACK,
      destination: 'la-famiglia-data-analytics',
      apiKey: 'my_key'
    })
    channelId2 = channel.id
    expect(channel).toHaveProperty('id')
    expect(channel.channelType).toBe(ChannelType.SLACK)
    expect(channel.destination).toBe('la-famiglia-data-analytics')
    expect(channel.secretId).not.toBeNull()
    expect(await retrieveSecret(getSecretManagerClient(), channel.secretId!)).toBe('my_key')
  }, 20000)

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

  test('Retrieve a notification channel for non existing id', async () => {
    const id = -1
    await expect(getNotificationChannelById(id)).rejects.toThrow(`Unable to retrieve notification channel`)
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
    await deleteNotificationChannel(channelId2)
    const deletedChannel = await prisma.notificationChannel.findUnique({
      where: { id: channelId }
    })
    const deletedChannel2 = await prisma.notificationChannel.findUnique({
      where: { id: channelId2 }
    })
    expect(deletedChannel).toBeNull()
    expect(deletedChannel2).toBeNull()
  })
})

import { ChannelType, Role, PrismaClient } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { createNotificationChannel } from '@/api/db/services/notificationChannelService'
import {
  createNotificationSubscription,
  deleteNotificationSubscription,
  getNotificationSubscription
} from '@/api/db/services/notificationSubscriptionService'
import { createUser, deleteUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()

describe('Notification Subscription Model Tests', () => {
  let subscriptionId: { userId: number; channelId: number }
  let userId: number
  let channelId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    userId = user.id
    const channel = await createNotificationChannel({
      channelType: ChannelType.EMAIL,
      destination: 'email channel'
    })
    channelId = channel.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new notification Subscription', async () => {
    const subscription = await createNotificationSubscription({
      userId,
      channelId,
      channelPurpose: 'NOTIFICATION'
    })
    subscriptionId = {
      userId: subscription.userId,
      channelId: subscription.channelId
    }
    expect(subscription).toHaveProperty('userId')
    expect(subscription.userId).toBe(userId)
    expect(subscription.channelId).toBe(channelId)
  })

  test('Retrieve a notification Subscription', async () => {
    const subscription = await getNotificationSubscription(subscriptionId.userId, subscriptionId.channelId)
    subscriptionId = {
      userId: subscription.userId,
      channelId: subscription.channelId
    }
    expect(subscription).toHaveProperty('userId')
    expect(subscription.channelId).toBe(channelId)
    expect(subscription.userId).toBe(userId)
  })

  test('Delete a notification Subscription', async () => {
    await deleteNotificationSubscription(subscriptionId.userId, subscriptionId.channelId)

    const deletedSubscription = await prisma.notificationSubscription.findUnique({
      where: {
        userId_channelId: {
          userId: subscriptionId.userId,
          channelId: subscriptionId.channelId
        }
      }
    })
    expect(deletedSubscription).toBeNull()
  })
})

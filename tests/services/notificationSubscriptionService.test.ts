import { ChannelType, Role, EntityType, PrismaClient } from '@prisma/client'
import { genRandomDummyAuthId } from './utils/random'
import { createCompany, deleteCompany } from '@/pages/api/services/companyService'
import { createNotificationChannel } from '@/pages/api/services/notificationChannelService'
import {
  createNotificationSubscription,
  deleteNotificationSubscription,
  getNotificationSubscription
} from '@/pages/api/services/notificationSubscriptionService'
import { createUser, deleteUser } from '@/pages/api/services/userService'
const prisma = new PrismaClient()

describe('Notification Subscription Model Tests', () => {
  let subscriptionId: { userId: number; companyId: number; channelId: number }
  let userId: number
  let companyId: number
  let channelId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const company = await createCompany({ name: 'Google', addedBy: user.id })
    userId = user.id
    companyId = company.id
    const channel = await createNotificationChannel({
      entityId: 'entity1',
      entityType: EntityType.NOTIFICATION,
      channelType: ChannelType.EMAIL,
      destination: 'email channel'
    })
    channelId = channel.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new notification Subscription', async () => {
    const subscription = await createNotificationSubscription({ userId, companyId, channelId })
    subscriptionId = {
      userId: subscription.userId,
      companyId: subscription.companyId,
      channelId: subscription.channelId
    }
    expect(subscription).toHaveProperty('userId')
    expect(subscription.userId).toBe(userId)
    expect(subscription.companyId).toBe(companyId)
    expect(subscription.channelId).toBe(channelId)
  })

  test('Retrieve a notification Subscription', async () => {
    const subscription = await getNotificationSubscription(
      subscriptionId.userId,
      subscriptionId.companyId,
      subscriptionId.channelId
    )
    subscriptionId = {
      userId: subscription.userId,
      companyId: subscription.companyId,
      channelId: subscription.channelId
    }
    expect(subscription).toHaveProperty('userId')
    expect(subscription.companyId).toBe(companyId)
    expect(subscription.channelId).toBe(channelId)
    expect(subscription.userId).toBe(userId)
  })

  test('Delete a notification Subscription', async () => {
    await deleteNotificationSubscription(subscriptionId.userId, subscriptionId.companyId, subscriptionId.channelId)

    const deletedSubscription = await prisma.notificationSubscription.findUnique({
      where: {
        userId_companyId_channelId: {
          userId: subscriptionId.userId,
          companyId: subscriptionId.companyId,
          channelId: subscriptionId.channelId
        }
      }
    })
    expect(deletedSubscription).toBeNull()
  })
})

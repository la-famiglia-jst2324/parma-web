import { ChannelType, Role, EntityType, PrismaClient } from '@prisma/client'
import { genRandomDummyAuthId } from './utils/random'
import { createCompany, deleteCompany } from '@/pages/api/services/companyService'
import { createNotificationChannel } from '@/pages/api/services/notificationChannelService'
import {
  createReportSubscription,
  deleteReportSubscription,
  getReportSubscription
} from '@/pages/api/services/reportSubscriptionService'
import { createUser, deleteUser } from '@/pages/api/services/userService'
const prisma = new PrismaClient()

describe('ReportSubscription Model Tests', () => {
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
      entityType: EntityType.REPORT,
      channelType: ChannelType.SLACK,
      destination: 'slack channel'
    })
    channelId = channel.id
    await prisma.$connect()
  })

  afterAll(async () => {
    // await deleteNotificationChannel(companyId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new Report Subscription', async () => {
    const subscription = await createReportSubscription({ userId, companyId, channelId })
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

  test('Retrieve a ReportSubscription', async () => {
    const subscription = await getReportSubscription(
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

  test('Delete a ReportSubscription', async () => {
    await deleteReportSubscription(subscriptionId.userId, subscriptionId.companyId, subscriptionId.channelId)

    const deletedSubscription = await prisma.reportSubscription.findUnique({
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

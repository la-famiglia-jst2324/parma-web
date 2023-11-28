import { ChannelType, Role, EntityType, PrismaClient } from '@prisma/client'
import userService from '@/api/services/userService'
import companyService from '@/api/services/companyService'
import notificationChannelService from '@/api/services/notificationChannelService'
import reportSubscriptionService from '@/api/services/reportSubscriptionService'
const { createUser, deleteUser } = userService
const { createCompany, deleteCompany } = companyService
const { createNotificationChannel } = notificationChannelService
const { createReportSubscription, deleteReportSubscription, getReportSubscription } = reportSubscriptionService
const prisma = new PrismaClient()

describe('ReportSubscription Model Tests', () => {
  let subscriptionId: { userId: number; companyId: number; channelId: number }
  let userId: number
  let companyId: number
  let channelId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', role: Role.ADMIN })
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

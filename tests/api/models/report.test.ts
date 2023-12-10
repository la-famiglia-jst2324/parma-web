import { PrismaClient } from '@prisma/client'
import { createUser, createCompany, deleteUser, deleteCompany } from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('ReportSubscription Model Tests', () => {
  let subscriptionId: { userId: number; companyId: number; channelId: number }
  let userId: number
  let companyId: number
  let channelId: number

  beforeAll(async () => {
    const user = await createUser()
    const company = await createCompany(user.id)
    userId = user.id
    companyId = company.id
    const channel = await prisma.notificationChannel.create({
      data: {
        entityId: 'entity1',
        entityType: 'REPORT',
        channelType: 'SLACK',
        destination: 'slack channel'
      }
    })
    channelId = channel.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new ReportSubscription', async () => {
    const subscription = await prisma.reportSubscription.create({
      data: {
        userId,
        companyId,
        channelId
      }
    })

    subscriptionId = {
      userId: subscription.userId,
      companyId: subscription.companyId,
      channelId: subscription.channelId
    }

    expect(subscription).toHaveProperty('userId')
    expect(subscription.companyId).toBe(companyId)
  })

  test('Retrieve a new ReportSubscription', async () => {
    const subscription = await prisma.reportSubscription.findUnique({
      where: {
        userId_companyId_channelId: {
          userId: subscriptionId.userId,
          companyId: subscriptionId.companyId,
          channelId: subscriptionId.channelId
        }
      }
    })

    subscriptionId = {
      userId: subscription!.userId,
      companyId: subscription!.companyId,
      channelId: subscription!.channelId
    }

    expect(subscription).toHaveProperty('userId')
    expect(subscription?.companyId).toBe(companyId)
    expect(subscription?.channelId).toBe(channelId)
    expect(subscription?.userId).toBe(userId)
  })

  test('Delete a new ReportSubscription', async () => {
    await prisma.reportSubscription.delete({
      where: {
        userId_companyId_channelId: {
          userId: subscriptionId.userId,
          companyId: subscriptionId.companyId,
          channelId: subscriptionId.channelId
        }
      }
    })

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

import { PrismaClient } from '@prisma/client'
import { createUser, deleteUser } from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('ReportSubscription Model Tests', () => {
  let subscriptionId: { userId: number; channelId: number }
  let userId: number
  let channelId: number

  beforeAll(async () => {
    const user = await createUser()
    userId = user.id
    const channel = await prisma.notificationChannel.create({
      data: {
        entityId: 'entity1',
        channelType: 'SLACK',
        destination: 'slack channel'
      }
    })
    channelId = channel.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new ReportSubscription', async () => {
    const subscription = await prisma.notificationSubscription.create({
      data: {
        userId,
        channelId,
        channelPurpose: 'REPORT'
      }
    })

    subscriptionId = {
      userId: subscription.userId,
      channelId: subscription.channelId
    }

    expect(subscription).toHaveProperty('userId')
  })

  test('Retrieve a new ReportSubscription', async () => {
    const subscription = await prisma.notificationSubscription.findUnique({
      where: {
        userId_channelId: {
          userId: subscriptionId.userId,
          channelId: subscriptionId.channelId
        }
      }
    })

    subscriptionId = {
      userId: subscription!.userId,
      channelId: subscription!.channelId
    }

    expect(subscription).toHaveProperty('userId')
    expect(subscription?.channelId).toBe(channelId)
    expect(subscription?.userId).toBe(userId)
    expect(subscription?.channelPurpose).toBe('REPORT')
  })

  test('Delete a new ReportSubscription', async () => {
    await prisma.notificationSubscription.delete({
      where: {
        userId_channelId: {
          userId: subscriptionId.userId,
          channelId: subscriptionId.channelId
        }
      }
    })

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

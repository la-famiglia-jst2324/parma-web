import { PrismaClient } from '@prisma/client'
import { createUser, createCompany, deleteUser, deleteCompany } from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('NotificationChannel Model Tests', () => {
  let channelId: number

  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  test('Create a new NotificationChannel', async () => {
    const channel = await prisma.notificationChannel.create({
      data: {
        entityId: 'entity1',
        entityType: 'REPORT',
        channelType: 'SLACK',
        destination: 'slack channel'
      }
    })

    channelId = channel.id

    expect(channel).toHaveProperty('id')
    expect(channel.entityId).toBe('entity1')
  })

  test('Retrieve a NotificationChannel', async () => {
    const channel = await prisma.notificationChannel.findUnique({
      where: { id: channelId }
    })

    expect(channel).toBeTruthy()
    expect(channel.id).toBe(channelId)
  })

  test('Update a NotificationChannel', async () => {
    const updatedChannel = await prisma.notificationChannel.update({
      where: { id: channelId },
      data: { destination: 'updatedDestination' }
    })

    expect(updatedChannel.destination).toBe('updatedDestination')
  })

  test('Delete a NotificationChannel', async () => {
    await prisma.notificationChannel.delete({
      where: { id: channelId }
    })

    const channel = await prisma.notificationChannel.findUnique({
      where: { id: channelId }
    })

    expect(channel).toBeNull()
  })
})

describe('NotificationSubscription Model Tests', () => {
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

  test('Create a new NotificationSubscription', async () => {
    const subscription = await prisma.notificationSubscription.create({
      data: {
        userId,
        companyId,
        channelId // Assume channelId is obtained from NotificationChannel test
      }
    })

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

  test('Retrieve a new NotificationSubscription', async () => {
    const subscription = await prisma.notificationSubscription.findUnique({
      where: {
        userId_companyId_channelId: {
          userId: subscriptionId.userId,
          companyId: subscriptionId.companyId,
          channelId: subscriptionId.channelId
        }
      }
    })

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

  // Delete a new subscription
  test('Delete a new NotificationSubscription', async () => {
    await prisma.notificationSubscription.delete({
      where: {
        userId_companyId_channelId: {
          userId: subscriptionId.userId,
          companyId: subscriptionId.companyId,
          channelId: subscriptionId.channelId
        }
      }
    })

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

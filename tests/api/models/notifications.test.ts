import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  deleteUser,
  deleteCompany,
  createDataSource,
  createSourceMeasurement,
  deleteSourceMeasurement,
  deleteDataSource
} from './utils/helperFunctions'
import {
  createNotificationRule,
  deleteNotificationRule,
  getNotificationRuleById,
  updateNotificationRule
} from '@/api/db/services/notificationRulesService'

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
        channelType: 'SLACK',
        destination: 'slack channel'
      }
    })

    channelId = channel.id

    expect(channel).toHaveProperty('id')
    expect(channel.destination).toBe('slack channel')
  })

  test('Retrieve a NotificationChannel', async () => {
    const channel = await prisma.notificationChannel.findUnique({
      where: { id: channelId }
    })

    expect(channel).toBeTruthy()
    expect(channel?.id).toBe(channelId)
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
  let subscriptionId: { userId: number; channelId: number }
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
    await prisma.notificationChannel.delete({
      where: { id: channelId }
    })
    await prisma.$disconnect()
  })

  test('Create a new NotificationSubscription', async () => {
    const subscription = await prisma.notificationSubscription.create({
      data: {
        userId,
        channelId, // Assume channelId is obtained from NotificationChannel test
        channelPurpose: 'REPORT'
      }
    })

    subscriptionId = {
      userId: subscription.userId,
      channelId: subscription.channelId
    }

    expect(subscription).toHaveProperty('userId')
    expect(subscription.channelId).toBe(channelId)
    expect(subscription.userId).toBe(userId)
  })

  test('Retrieve a new NotificationSubscription', async () => {
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
  })

  // Delete a new subscription
  test('Delete a new NotificationSubscription', async () => {
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

describe('NotificationRules Service Tests', () => {
  let ruleId: number
  let sourceMeasurementId: number
  let dataSourceId: number

  beforeAll(async () => {
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await prisma.$disconnect()
  })

  test('Create a new NotificationRule', async () => {
    const rule = await createNotificationRule({
      ruleName: 'Test Rule',
      sourceMeasurementId,
      threshold: 10.5,
      aggregationMethod: 'Average',
      numAggregationEntries: 5,
      notificationMessage: 'Test Message'
    })

    ruleId = rule.ruleId

    expect(ruleId).toBeDefined()
  })

  test('Retrieve a NotificationRule', async () => {
    const rule = await getNotificationRuleById(ruleId)

    expect(rule).toBeTruthy()
    expect(rule?.ruleId).toBe(ruleId)
  })

  test('Retrieve a NotificationRule for non existing id', async () => {
    const id = 1234
    await expect(getNotificationRuleById(id)).rejects.toThrow(`Unable to retrieve notification rule`)
  })

  test('Update a NotificationRule', async () => {
    const updatedRule = await updateNotificationRule(ruleId, {
      ruleName: 'Updated Test Rule'
    })

    expect(updatedRule.ruleName).toBe('Updated Test Rule')
  })

  test('Delete a NotificationRule', async () => {
    const deletedRule = await deleteNotificationRule(ruleId)
    expect(deletedRule.ruleId).toBe(ruleId)
  })
})

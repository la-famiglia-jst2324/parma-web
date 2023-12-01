import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  deleteUser,
  createDataSource,
  deleteDataSource,
  deleteCompany
} from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('SourceMeasurement Model Tests', () => {
  let sourceMeasurementId: number
  let dataSourceId: number
  let companyId: number
  let userId: number

  beforeAll(async () => {
    // Assuming createCompany and createDataSource are helper functions
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create SourceMeasurement Test
  test('Create a new SourceMeasurement', async () => {
    const sourceMeasurement = await prisma.sourceMeasurement.create({
      data: {
        sourceModuleId: dataSourceId,
        type: 'MeasurementType', // Replace with your actual type
        companyId,
        measurementName: 'Test Measurement'
      }
    })

    sourceMeasurementId = sourceMeasurement.id

    expect(sourceMeasurement).toHaveProperty('id')
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.companyId).toBe(companyId)
    expect(sourceMeasurement.measurementName).toBe('Test Measurement')
  })

  // Read SourceMeasurement Test
  test('Retrieve a SourceMeasurement', async () => {
    const sourceMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: sourceMeasurementId }
    })

    expect(sourceMeasurement).toBeTruthy()
    expect(sourceMeasurement.id).toBe(sourceMeasurementId)
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.companyId).toBe(companyId)
  })

  // Update SourceMeasurement Test
  test('Update a SourceMeasurement', async () => {
    const updatedSourceMeasurement = await prisma.sourceMeasurement.update({
      where: { id: sourceMeasurementId },
      data: { measurementName: 'Updated Measurement' }
    })

    expect(updatedSourceMeasurement.measurementName).toBe('Updated Measurement')
  })

  // Delete SourceMeasurement Test
  test('Delete a SourceMeasurement', async () => {
    await prisma.sourceMeasurement.delete({
      where: { id: sourceMeasurementId }
    })

    const sourceMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: sourceMeasurementId }
    })

    expect(sourceMeasurement).toBeNull()
  })
})

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
      userId: subscription.userId,
      companyId: subscription.companyId,
      channelId: subscription.channelId
    }

    expect(subscription).toHaveProperty('userId')
    expect(subscription.companyId).toBe(companyId)
    expect(subscription.channelId).toBe(channelId)
    expect(subscription.userId).toBe(userId)
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

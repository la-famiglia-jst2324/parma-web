import { PrismaClient, Frequency, HealthStatus } from '@prisma/client'
import companyService from '@/api/services/companyService'
import dataSourceService from '@/api/services/dataSourceService'
import notificationService from '@/api/services/notificationService'
const { createCompany } = companyService
const { createDataSource } = dataSourceService
const { createNotification, deleteNotification, getNotificationById, updateNotification } = notificationService
const prisma = new PrismaClient()

describe('Notification Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let notificationId: number
  let companyId: number
  let dataSourceId: number

  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: 1 })
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(1)
  })

  test('Create a new datasource with valid details', async () => {
    const dataSource = await createDataSource({
      sourceName: 'source',
      isActive: true,
      defaultFrequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'des'
    })
    dataSourceId = dataSource.id
    expect(dataSource).toHaveProperty('id')
    expect(dataSource.sourceName).toBe('source')
    expect(dataSource.description).toBe('des')
    expect(dataSource.isActive).toBe(true)
    expect(dataSource.defaultFrequency).toBe(Frequency.DAILY)
    expect(dataSource.healthStatus).toBe(HealthStatus.UP)
  })

  test('Create a new notification with valid details', async () => {
    const notification = await createNotification({ message: 'noti', companyId, dataSourceId })
    notificationId = notification.id // Store the  ID for later use
    expect(notification).toHaveProperty('id')
    expect(notification.companyId).toBe(companyId)
    expect(notification.dataSourceId).toBe(dataSourceId)
    expect(notification.message).toBe('noti')
  })

  test('Retrieve a notification by ID', async () => {
    const report = await getNotificationById(notificationId)
    expect(report).toBeTruthy()
    expect(report?.id).toBe(notificationId)
  })

  test('Update a notification name', async () => {
    const updatedReport = await updateNotification(notificationId, { message: 'sas' })
    expect(updatedReport.message).toBe('sas')
  })

  test('Delete a notification', async () => {
    await deleteNotification(notificationId)
    const deletednotification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })
    expect(deletednotification).toBeNull()
  })
})

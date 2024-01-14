import { PrismaClient } from '@prisma/client'
import {
  createCompany,
  createDataSource,
  createUser,
  deleteCompany,
  deleteDataSource,
  deleteUser
} from '../models/utils/helperFunctions'
import { createNews, deleteNewsById, getAllNews, getNewsById } from '@/api/db/services/newsService'
import { createSourceMeasurement } from '@/api/db/services/sourceMeasurementService'

const prisma = new PrismaClient()
describe('News Model Tests', () => {
  let companyId: number
  let dataSourceId: number
  let userId: number
  let newsId: number
  let sourceMeasurementId: number

  beforeAll(async () => {
    const user = await createUser()
    userId = user.id
    const company = await createCompany(userId)
    companyId = company.id
    const dataSource = await createDataSource()
    dataSourceId = dataSource.id
    const sourceMeasurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'int',
      measurementName: 'intMea'
    })
    sourceMeasurementId = sourceMeasurement.id
    await prisma.$connect()
  })

  afterAll(async () => {
    // await deleteSourceMeasurement(sourceMeasurementId)
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a news with valid details', async () => {
    const news = await createNews({
      message: 'Test News',
      companyId,
      dataSourceId,
      sourceMeasurementId,
      timestamp: new Date()
    })
    newsId = news.id
    expect(news).toHaveProperty('id')
    expect(news).toHaveProperty('timestamp')
    expect(news.message).toBe('Test News')
    expect(news.companyId).toBe(companyId)
    expect(news.dataSourceId).toBe(dataSourceId)
    expect(news.sourceMeasurementId).toBe(sourceMeasurementId)
  })

  test('Retrieve a news by ID', async () => {
    const news = await getNewsById(newsId)
    expect(news).toBeTruthy()
    expect(news?.id).toBe(newsId)
  })

  test('Retrieve all news', async () => {
    const news = await getAllNews(1, 10)
    expect(news).toBeTruthy()
    expect(Array.isArray(news.newsItems)).toBe(true)
    expect(news.newsItems.length).toBeGreaterThan(0)
    if (news.newsItems.length > 0) {
      expect(news.newsItems[0]).toHaveProperty('id')
      expect(news.newsItems[0]).toHaveProperty('description')
      expect(news.newsItems[0]).toHaveProperty('companyId')
      expect(news.newsItems[0]).toHaveProperty('dataSourceName')
    }
  })

  test('Delete a news', async () => {
    await deleteNewsById(newsId)
    await expect(getNewsById(newsId)).rejects.toThrow()
    await expect(getNewsById(newsId)).rejects.toThrow(`News with ID ${newsId} not found.`)
  })
})

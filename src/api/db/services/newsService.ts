import { PrismaClient } from '@prisma/client'
import { getCompaniesByBucketId } from './companyBucketMembershipService'
import { getBucketById } from './bucketService'
import { getCompanyByID } from './companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const prisma = new PrismaClient()

interface NewsItemReturn {
  id: string
  companyId: string
  title: string | null
  description: string
  companyName: string
  dataSourceName: string
  notificationDate: string
  timestamp: Date
  bucketName?: string
  triggerFactor: string | null
}

interface NewsItem {
  id: number
  companyId: number
  title: string
  message: string
  company: {
    name: string
  }
  dataSource: {
    sourceName: string
  }
  createdAt: Date
  timestamp: Date
  bucket?: {
    title: string
  }
  triggerFactor: string
}

interface NewsWhereInput {
  timestamp?: {
    gte?: string // Greater than or equal
    lte?: string // Less than or equal
  }
}

const transformNewsItems = (newsItems: NewsItem[]): NewsItemReturn[] => {
  return newsItems.map((item) => ({
    id: item.id.toString(),
    companyId: item.companyId.toString(),
    title: item.title,
    description: item.message,
    companyName: item.company.name,
    dataSourceName: item.dataSource.sourceName,
    notificationDate: item.createdAt.toISOString(),
    bucketName: item.bucket?.title,
    triggerFactor: item.triggerFactor,
    timestamp: item.timestamp
  }))
}

const getBaseNewsQuery = (page?: number, pageSize?: number, startDate?: Date, endDate?: Date) => {
  const where: NewsWhereInput = {}

  // Add conditional date range filtering
  if (startDate) {
    where.timestamp = {
      ...where.timestamp,
      gte: startDate.toISOString() // Greater than or equal to startDate
    }
  }

  if (endDate) {
    where.timestamp = {
      ...where.timestamp,
      lte: endDate.toISOString() // Less than or equal to endDate
    }
  }

  // Calculate 'skip' and 'take' based on provided 'page' and 'pageSize'
  let skip, take;

  if (page !== undefined && pageSize !== undefined) {
    // Both 'page' and 'pageSize' are provided
    skip = (page - 1) * pageSize;
    take = pageSize;
  } else {
    // Either 'page' or 'pageSize' is not provided, return all records
    skip = 0;
    take = Number.MAX_SAFE_INTEGER;
  }
  return {
    skip,
    take,
    where,
    include: { company: true, dataSource: true }
  }
}

const createReturnObject = (
  transformedNewsItems: NewsItemReturn[],
  totalCount: number,
  page?: number,
  pageSize?: number,
  bucketName: string | null = null
) => {
  const returnObject: {
    newsItems: NewsItemReturn[]
    pagination?: {
      currentPage: number
      pageSize: number
      totalPages: number
      totalCount: number
    }
    bucketName?: string
  } = {
    newsItems: transformedNewsItems
  }

  if (page !== undefined && pageSize !== undefined) {
    const totalPages = Math.ceil(totalCount / pageSize)
    returnObject.pagination = {
      currentPage: page,
      pageSize,
      totalPages,
      totalCount
    }
  }

  if (bucketName) {
    returnObject.bucketName = bucketName
  }

  return returnObject
}

const createNews = async (data: {
  message: string
  companyId: number
  dataSourceId: number
  timestamp: Date
  sourceMeasurementId: number
  title?: string
  triggerFactor?: string
}) => {
  try {
    return await prisma.news.create({
      data
    })
  } catch (error) {
    console.error('Error creating company:', error)
    throw new Error('Unable to create company')
  }
}

const getAllNews = async (
  page?: number,
  pageSize?: number,
  companyId?: number,
  bucketId?: number,
  startDateStr?: string,
  endDateStr?: string
) => {
  try {
    if (companyId && bucketId) {
      throw new Error(`Only one of companyId or bucketId can be provided`)
    }
    const startDate = startDateStr ? new Date(startDateStr) : undefined
    const endDate = endDateStr ? new Date(endDateStr) : undefined
    const baseQuery = getBaseNewsQuery(page, pageSize, startDate, endDate)

    if (!companyId && !bucketId) {
      const newsItems = await prisma.news.findMany(getBaseNewsQuery(page, pageSize, startDate, endDate))
      const totalCount = await prisma.news.count({
        where: baseQuery.where // Use the same where condition as in findMany
      })
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])

      return createReturnObject(transformedNewsItems, totalCount, page, pageSize)
    } else if (companyId) {
      await getCompanyByID(companyId)

      const queryOptionsWithCompanyId = {
        ...baseQuery,
        where: { ...baseQuery.where, companyId }
      }

      const newsItems = await prisma.news.findMany(queryOptionsWithCompanyId)
      const totalCount = await prisma.news.count({
        where: {
          ...baseQuery.where,
          companyId // Include companyId in the where condition
        }
      })
      // Transform the news items to match the required structure
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])
      return createReturnObject(transformedNewsItems, totalCount, page, pageSize)
    } else if (bucketId) {
      const bucket = await getBucketById(bucketId)
      const companies = await getCompaniesByBucketId(bucketId as number)
      const companyIds = companies.map((company) => company.id)

      const queryOptionsWithCompanyIds = {
        ...baseQuery,
        where: { ...baseQuery.where, companyId: { in: companyIds } }
      }
      const newsItems = await prisma.news.findMany(queryOptionsWithCompanyIds)

      const totalCount = await prisma.news.count({
        where: {
          ...baseQuery.where,
          companyId: { in: companyIds } // Include companyId filter
        }
      })
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])
      return createReturnObject(transformedNewsItems, totalCount, page, pageSize, bucket.title)
    } else throw new Error(`Something went wrong!`)
  } catch (error) {
    console.error('Error fetching all news:', error)
    throw error
  }
}

const getNewsById = async (id: number) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id }
    })
    if (!news) {
      throw new ItemNotFoundError(`News with ID ${id} not found.`)
    }
    return news
  } catch (error) {
    if (error instanceof ItemNotFoundError) {
      throw error
    }
    console.error('Error getting a news by ID:', error)
    throw error
  }
}

const deleteNewsById = async (id: number) => {
  try {
    return await prisma.news.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error('Error deleting a news by ID:', error)
    throw error
  }
}

export { createNews, getAllNews, getNewsById, deleteNewsById }

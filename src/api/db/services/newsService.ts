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
  bucket?: {
    title: string
  }
  triggerFactor: string
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
    triggerFactor: item.triggerFactor
  }))
}

const getBaseNewsQuery = (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize
  return {
    skip,
    take: pageSize,
    include: {
      company: true, // Include related company data
      dataSource: true // Include related dataSource data
    }
  }
}

const createReturnObject = (
  transformedNewsItems: NewsItemReturn[],
  page: number,
  pageSize: number,
  totalCount: number,
  bucketName: string | null = null
) => {
  const totalPages = Math.ceil(totalCount / pageSize)
  const returnObject: {
    newsItems: NewsItemReturn[]
    pagination: {
      currentPage: number
      pageSize: number
      totalPages: number
      totalCount: number
    }
    bucketName?: string
  } = {
    newsItems: transformedNewsItems,
    pagination: {
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

const getAllNews = async (page: number, pageSize: number, companyId?: number, bucketId?: number) => {
  try {
    if (companyId && bucketId) {
      throw new Error(`Only one of companyId or bucketId can be provided`)
    }
    if (!companyId && !bucketId) {
      const newsItems = await prisma.news.findMany(getBaseNewsQuery(page, pageSize))
      const totalCount = await prisma.news.count()
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])

      return createReturnObject(transformedNewsItems, page, pageSize, totalCount)
    } else if (companyId) {
      await getCompanyByID(companyId)
      const queryOptionsWithCompanyId = {
        ...getBaseNewsQuery(page, pageSize),
        where: { companyId }
      }
      const newsItems = await prisma.news.findMany(queryOptionsWithCompanyId)

      const totalCount = await prisma.news.count({
        where: {
          companyId
        }
      })
      // Transform the news items to match the required structure
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])
      return createReturnObject(transformedNewsItems, page, pageSize, totalCount)
    } else if (bucketId) {
      const bucket = await getBucketById(bucketId)
      const companies = await getCompaniesByBucketId(bucketId as number)
      const companyIds = companies.map((company) => company.id)

      const queryOptionsWithCompanyId = {
        ...getBaseNewsQuery(page, pageSize),
        where: { companyId }
      }
      const newsItems = await prisma.news.findMany(queryOptionsWithCompanyId)

      const totalCount = await prisma.news.count({
        where: {
          companyId: {
            in: companyIds
          }
        }
      })
      const transformedNewsItems = transformNewsItems(newsItems as NewsItem[])
      return createReturnObject(transformedNewsItems, page, pageSize, totalCount, bucket.title)
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

import type { Bucket, Company } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const searchCompaniesAndBuckets = async (searchString: string, page: number, pageSize: number, userId: number) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        name: {
          contains: searchString,
          mode: 'insensitive'
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    const whereClause = {
      OR: [
        {
          ownerId: userId
        },
        {
          permissions: {
            some: {
              inviteeId: userId
            }
          }
        },
        {
          isPublic: true
        }
      ]
    }

    // Workaround the not supported multi-level where clause.
    const buckets = await prisma.bucket.findMany({
      where: whereClause
    })

    const authBuckets = buckets.filter((bucket) => bucket.title.toLowerCase().includes(searchString.toLowerCase()))

    // Combine and sort the results
    const combined = [
      ...companies.map((c: Company) => ({ ...c, type: 'company' })),
      ...authBuckets.map((b: Bucket) => ({ ...b, name: b.title, type: 'bucket' }))
    ].sort((a, b) => a.name.localeCompare(b.name))

    if (!page || !pageSize) {
      return combined
    }

    // Apply pagination
    const skip = (page - 1) * pageSize
    const paginatedResults = combined.slice(skip, skip + pageSize)

    const totalCount = combined.length
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      data: paginatedResults,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error searching companies and buckets:', error)
    throw error
  }
}

export { searchCompaniesAndBuckets }

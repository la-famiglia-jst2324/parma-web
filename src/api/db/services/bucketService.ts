import { prisma } from '../prisma/prismaClient'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

// can create a new bucket with the same name??  skip for now
const createBucket = async (data: { title: string; description?: string; ownerId: number; isPublic: boolean }) => {
  try {
    return await prisma.bucket.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: data.ownerId,
        isPublic: data.isPublic
      }
    })
  } catch (error) {
    console.error('Error creating bucket:', error)
    throw new Error('Unable to create bucket')
  }
}

const getBucketById = async (id: number) => {
  try {
    const bucket = await prisma.bucket.findUnique({
      where: { id },
      include: {
        user: true,
        companyBucketMember: true,
        permissions: true
      }
    })
    if (!bucket) {
      throw new ItemNotFoundError(`Bucket with ID ${id} not found.`)
    }
    return bucket
  } catch (error) {
    console.error('Error retrieving bucket:', error)
    throw error
  }
}

const getBucketsByName = async (title: string, page: number, pageSize: number, userId: number) => {
  try {
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

    const allFilteredBuckets = buckets.filter((bucket) => bucket.title.toLowerCase().includes(title.toLowerCase()))

    let paginatedBuckets
    if (page && pageSize) {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      paginatedBuckets = allFilteredBuckets.slice(start, end)
    } else {
      paginatedBuckets = allFilteredBuckets
    }

    if (page && pageSize) {
      const totalCount = allFilteredBuckets.length
      const totalPages = Math.ceil(totalCount / pageSize)
      return {
        paginatedBuckets,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount
        }
      }
    } else {
      return { allFilteredBuckets }
    }
  } catch (error) {
    console.error('Error retrieving all buckets:', error)
    throw new Error('Unable to retrieve buckets')
  }
}

const getAllBuckets = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const buckets = await prisma.bucket.findMany({
      skip,
      take: pageSize
    })
    const totalCount = await prisma.bucket.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      buckets,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error retrieving all buckets:', error)
    throw new Error('Unable to retrieve buckets')
  }
}

const getAccessibleBuckets = async (page: number, pageSize: number, userId: number) => {
  try {
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

    let skip, take
    if (page && pageSize) {
      skip = (page - 1) * pageSize
      take = pageSize
    }

    const buckets = await prisma.bucket.findMany({
      where: whereClause,
      skip,
      take
    })

    if (page && pageSize) {
      const totalCount = await prisma.bucket.count({
        where: whereClause
      })
      const totalPages = Math.ceil(totalCount / pageSize)
      return {
        buckets,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount
        }
      }
    } else {
      return { buckets }
    }
  } catch (error) {
    console.error('Error retrieving all buckets:', error)
    throw new Error('Unable to retrieve buckets')
  }
}

// a user find all buckets of his own. should use filter （by ownerID）
const getOwnBuckets = async (ownerId: number) => {
  try {
    const buckets = await prisma.bucket.findMany({
      where: {
        ownerId
      }
    })
    return buckets
  } catch (error) {
    console.error('Error fetching your buckets:', error)
    throw error
  }
}

// who? only the Bucket creator?  ownerId can be modified?
const updateBucket = async (
  id: number,
  data: {
    title?: string
    description?: string
    isPublic?: boolean
    ownerId?: number
  }
) => {
  try {
    return await prisma.bucket.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating bucket:', error)
    throw new Error('Unable to update bucket')
  }
}

const deleteBucket = async (id: number) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      //  delete its relationship with company
      await prisma.companyBucketMembership.deleteMany({
        where: {
          bucketId: id
        }
      })
      // delete bucket
      return await prisma.bucket.delete({
        where: { id }
      })
    })
    return result
  } catch (error) {
    console.error('Error deleting bucket:', error)
    throw error
  }
}

export {
  createBucket,
  getBucketById,
  getBucketsByName,
  getAllBuckets,
  getOwnBuckets,
  updateBucket,
  deleteBucket,
  getAccessibleBuckets
}

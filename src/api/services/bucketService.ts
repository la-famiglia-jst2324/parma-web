import { prisma } from '../prismaClient'

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
      throw new Error(`Bucket with ID ${id} not found`)
    }
    return bucket
  } catch (error) {
    console.error('Error retrieving bucket:', error)
    throw new Error('Unable to retrieve bucket')
  }
}

const getBucketByName = async (title: string) => {
  try {
    const bucket = await prisma.bucket.findMany({
      where: { title }
    })
    if (!bucket) {
      throw new Error(`Bucket with name ${title} not found.`)
    }
    return bucket
  } catch (error) {
    console.error('Error finding bucket by name:', error)
    throw error
  }
}

const getAllBuckets = async () => {
  try {
    return await prisma.bucket.findMany()
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

export default {
  createBucket,
  getBucketById,
  getBucketByName,
  getAllBuckets,
  getOwnBuckets,
  updateBucket,
  deleteBucket
}

import { prisma } from '../prismaClient'

// FR-13  user add a company to a bucket, update the lists in both company and bucket
const addCompanyToBucket = async (companyId: number, bucketId: number) => {
  try {
    // can not add the same company repeatedly
    // check if a company with the same name already exists
    const existingMembership = await prisma.companyBucketMembership.findUnique({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId
        }
      }
    })
    if (existingMembership) {
      throw new Error(`The company is already added to this bucket.`)
    }
    // not exists
    const membership = await prisma.companyBucketMembership.create({
      data: {
        company: {
          connect: { id: companyId }
        },
        bucket: {
          connect: { id: bucketId }
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error adding a company to a bucket:', error)
    throw error
  }
}

const getCompaniesByBucketId = async (bucketId: number) => {
  try {
    const membership = await prisma.companyBucketMembership.findMany({
      where: {
        bucketId
      },
      include: {
        company: true
        // map list company，not CompanyBucketMembership
      }
    })
    if (membership) {
      return membership.map((membership) => membership.company)
    } else {
      throw new Error(`bucket${bucketId} does not have any company.`)
    }
  } catch (error) {
    console.error('Error retrieving companies from bucket:', error)
    throw error
  }
}

// show all buckets that the company belongs to
const getBucketsByCompanyId = async (companyId: number) => {
  try {
    const membership = await prisma.companyBucketMembership.findMany({
      where: {
        companyId
      },
      include: {
        bucket: true
      }
    })
    if (membership) {
      return membership.map((membership) => membership.bucket)
    } else {
      throw new Error(`company${companyId} does not belong to any buckets.`)
    }
  } catch (error) {
    console.error('Error getting buckets in this company:', error)
    throw error
  }
}

const getCompanyBucketByID = async (bucketId: number, companyId: number) => {
  try {
    const companyBucket = await prisma.companyBucketMembership.findUnique({
      where: {
        companyId_bucketId: {
          bucketId,
          companyId
        }
      }
    })
    if (companyBucket) {
      return companyBucket
    } else {
      throw new Error(`not found.`)
    }
  } catch (error) {
    console.error('Error getting by ID:', error)
    throw error
  }
}

// FR-13 user remove a company from a bucket
const removeCompanyFromBucket = async (companyId: number, bucketId: number) => {
  try {
    const membership = await prisma.companyBucketMembership.delete({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error deleting company from the bucket:', error)
    throw error
  }
}

export default {
  addCompanyToBucket,
  getCompaniesByBucketId,
  getBucketsByCompanyId,
  getCompanyBucketByID,
  removeCompanyFromBucket
}

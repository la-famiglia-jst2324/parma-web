import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  createBucket,
  deleteBucket,
  deleteUser,
  deleteCompany
} from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('Company Bucket Membership Model Tests', () => {
  let userId: number
  let companyId: number
  let bucketId: number
  let newBucketId: number

  beforeAll(async () => {
    const user = await createUser()
    const company = await createCompany(user.id)
    const bucket = await createBucket(user.id)
    userId = user.id
    companyId = company.id
    bucketId = bucket.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteBucket(bucketId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new CompanyBucketMembership', async () => {
    const membership = await prisma.companyBucketMembership.create({
      data: {
        companyId,
        bucketId
      }
    })

    expect(membership).toHaveProperty('companyId', companyId)
    expect(membership).toHaveProperty('bucketId', bucketId)
  })

  test('Retrieve a CompanyBucketMembership', async () => {
    const foundMembership = await prisma.companyBucketMembership.findUnique({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId
        }
      }
    })

    expect(foundMembership).toBeTruthy()
    expect(foundMembership?.companyId).toBe(companyId)
    expect(foundMembership?.bucketId).toBe(bucketId)
  })

  test('Update a CompanyBucketMembership', async () => {
    // Assuming you have another bucket to update to
    const newBucket = await prisma.bucket.create({
      data: {
        title: 'New Test Bucket',
        ownerId: userId
      }
    })

    newBucketId = newBucket.id

    const updatedMembership = await prisma.companyBucketMembership.update({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId
        }
      },
      data: {
        bucketId: newBucketId
      }
    })

    expect(updatedMembership.bucketId).toBe(newBucketId)
  })

  test('Delete a CompanyBucketMembership', async () => {
    const deletedMembership = await prisma.companyBucketMembership.delete({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId: newBucketId
        }
      }
    })

    expect(deletedMembership).toBeTruthy()

    // Clean up the new bucket
    await prisma.bucket.delete({ where: { id: newBucketId } })
  })
})

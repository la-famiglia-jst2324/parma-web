import { PrismaClient } from '@prisma/client'
import { createUser, createCompany, deleteUser, deleteCompany, createBucket } from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('Bucket Model Tests', () => {
  let userId: number
  let companyId: number
  let bucketId: number

  beforeAll(async () => {
    const user = await createUser()
    userId = user.id
    const company = await createCompany(userId)
    companyId = company.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create Bucket Test
  test('Create a bucket', async () => {
    const bucket = await prisma.bucket.create({
      data: {
        title: 'test bucket',
        ownerId: userId
      }
    })
    bucketId = bucket.id

    expect(bucket).toBeTruthy()
    expect(bucket.title).toBe('test bucket')
    expect(bucket.ownerId).toBe(userId)
    expect(bucket.isPublic).toBeFalsy()
  })

  // Read Company Test
  test('Retrieve a bucket', async () => {
    const bucket = await prisma.bucket.findUnique({
      where: { id: bucketId }
    })

    expect(bucket).toBeTruthy()
    expect(bucket.ownerId).toBe(userId)
  })

  // Update Company Test
  test('Update a bucket name', async () => {
    const updatedBucket = await prisma.bucket.update({
      where: { id: bucketId },
      data: { title: 'Updated Bucket title' }
    })

    expect(updatedBucket.title).toBe('Updated Bucket title')
  })

  // Delete User Test
  test('Delete a bucket', async () => {
    await prisma.bucket.delete({
      where: { id: bucketId }
    })

    const bucket = await prisma.bucket.findUnique({
      where: { id: bucketId }
    })

    expect(bucket).toBeNull()
  })
})

describe('BucketAccess Model Tests', () => {
  let bucketId: number
  let bucketOwnerId: number
  let inviteeId: number

  // Set up before all tests
  beforeAll(async () => {
    bucketOwnerId = (await createUser()).id
    inviteeId = (await createUser()).id
    bucketId = (await createBucket(bucketOwnerId)).id

    await prisma.$connect()
  })

  // Clean up after all tests
  afterAll(async () => {
    await deleteUser(bucketOwnerId)
    await deleteUser(inviteeId)

    await prisma.$disconnect()
  })

  // Test for creating a BucketAccess
  test('Create a new BucketAccess', async () => {
    const bucketAccess = await prisma.bucketAccess.create({
      data: {
        bucketId,
        inviteeId,
        permission: 'VIEWER'
      }
    })

    expect(bucketAccess).toHaveProperty('bucketId', bucketId)
    expect(bucketAccess).toHaveProperty('inviteeId', inviteeId)
    expect(bucketAccess.permission).toBe('VIEWER')
  })

  // Test for retrieving a BucketAccess
  test('Retrieve a BucketAccess', async () => {
    const bucketAccess = await prisma.bucketAccess.findUnique({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      }
    })

    expect(bucketAccess).toBeTruthy()
    expect(bucketAccess.bucketId).toBe(bucketId)
    expect(bucketAccess.inviteeId).toBe(inviteeId)
  })

  // Test for updating a BucketAccess
  test('Retrieve a BucketAccess', async () => {
    const bucketAccess = await prisma.bucketAccess.update({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      },
      data: {
        permission: 'MODERATOR'
      }
    })

    expect(bucketAccess.permission).toBe('MODERATOR')
  })

  // Test for deleting a BucketAccess
  test('Delete a BucketAccess', async () => {
    await prisma.bucketAccess.delete({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      }
    })

    const deletedAccess = await prisma.bucketAccess.findUnique({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      }
    })

    expect(deletedAccess).toBeNull()
  })
})

import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { createBucket, deleteBucket, getBucketById, updateBucket } from '@/pages/api/services/bucketService'
import { createUser } from '@/pages/api/services/userService'

const prisma = new PrismaClient()

describe('Bucket Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: number
  let bucketId: number

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
  })

  test('Create a new bucket with valid details', async () => {
    const bucket = await createBucket({ title: 'bucket', description: 'Test bucket', ownerId: userId, isPublic: true })
    bucketId = bucket.id
    expect(bucket).toHaveProperty('id')
    expect(bucket.title).toBe('bucket')
    expect(bucket.description).toBe('Test bucket')
    expect(bucket.ownerId).toBe(userId)
    expect(bucket.isPublic).toBe(true)
  })

  test('Retrieve a bucket by ID', async () => {
    const bucket = await getBucketById(bucketId)
    expect(bucket).toBeTruthy()
    expect(bucket?.id).toBe(bucketId)
    expect(bucket.ownerId).toBe(userId)
    expect(bucket.title).toBe('bucket')
  })

  test('Update a bucket', async () => {
    const updatedBucket = await updateBucket(bucketId, {
      title: 'updatedBucket',
      description: 'updated test bucket',
      isPublic: false
    })
    expect(updatedBucket.title).toBe('updatedBucket')
    expect(updatedBucket.description).toBe('updated test bucket')
    expect(updatedBucket.ownerId).toBe(userId)
    expect(updatedBucket.isPublic).toBe(false)
  })

  test('Delete a bucket', async () => {
    await deleteBucket(bucketId)
    const deletedBucket = await prisma.bucket.findUnique({
      where: { id: bucketId }
    })
    expect(deletedBucket).toBeNull()
  })
})

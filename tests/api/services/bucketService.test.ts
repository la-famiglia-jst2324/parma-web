import type { Bucket } from '@prisma/client'
import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createBucket,
  deleteBucket,
  getBucketById,
  updateBucket,
  getOwnBuckets,
  getAllBuckets,
  getBucketByName
} from '@/api/db/services/bucketService'
import { createUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Bucket Model Tests', () => {
  let userId: number
  let bucketId: number
  let createdbucket: Bucket

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
    const bucket = await createBucket({ title: 'bucket', description: 'Test bucket', ownerId: userId, isPublic: true })
    createdbucket = bucket
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  test('Create a new user with valid details', async () => {
    await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    await createBucket({ title: 'bucket', description: 'Test bucket', ownerId: userId, isPublic: true })
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

  test('Retrieve a bucket by name', async () => {
    const bucket = await getBucketByName(createdbucket.title, 1, 10)
    expect(bucket).toBeTruthy()
  })

  test('Retrieve own buckets', async () => {
    const bucket = await getOwnBuckets(userId)
    expect(Array.isArray(bucket)).toBe(true)
    expect(bucket.length).toBeGreaterThan(0)
    if (bucket.length > 0) {
      expect(bucket[0]).toHaveProperty('id')
      expect(bucket[0]).toHaveProperty('ownerId')
      expect(bucket[0]).toHaveProperty('title')
    }
    expect(bucket).toBeTruthy()
  })

  test('Retrieve all buckets', async () => {
    const bucket = await getAllBuckets(1, 10)
    expect(Array.isArray(bucket.buckets)).toBe(true)
    expect(bucket.buckets.length).toBeGreaterThan(0)
    if (bucket.buckets.length > 0) {
      expect(bucket.buckets[0]).toHaveProperty('id')
      expect(bucket.buckets[0]).toHaveProperty('ownerId')
      expect(bucket.buckets[0]).toHaveProperty('title')
    }
    expect(bucket).toBeTruthy()
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

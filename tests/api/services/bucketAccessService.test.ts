import { PrismaClient, Role } from '@prisma/client'

import { genRandomDummyAuthId } from '../utils/random'
import { createUser } from '@/api/db/services/userService'
import {
  createBucketAccess,
  getBucketAccessByID,
  getInviteesByBucketId,
  updateBucketAccess,
  deleteBucketAccess
} from '@/api/db/services/bucketAccessService'

const prisma = new PrismaClient()

describe('Bucket Access Service Tests', () => {
  let bucketId: number
  let inviteeId: number

  beforeAll(async () => {
    const userOwner = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    const userInvitee = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    const bucket = await prisma.bucket.create({ data: { title: 'Test Bucket', ownerId: userOwner.id } })
    bucketId = bucket.id
    inviteeId = userInvitee.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  test('Create a new bucket access with valid details', async () => {
    const bucketAccess = await createBucketAccess({ bucketId, inviteeId, permission: 'MODERATOR' })
    expect(bucketAccess).toHaveProperty('bucketId')
    expect(bucketAccess.bucketId).toBe(bucketId)
    expect(bucketAccess.inviteeId).toBe(inviteeId)
    expect(bucketAccess.permission).toBe('MODERATOR')
  })

  test('Retrieve a bucket access by ID', async () => {
    const bucketAccess = await getBucketAccessByID(bucketId, inviteeId)
    expect(bucketAccess).toBeTruthy()
    expect(bucketAccess?.bucketId).toBe(bucketId)
    expect(bucketAccess?.inviteeId).toBe(inviteeId)
  })

  test('Retrieve invitees by bucket ID', async () => {
    const invitees = await getInviteesByBucketId(bucketId)
    expect(Array.isArray(invitees)).toBe(true)
    expect(invitees.length).toBeGreaterThan(0)
    if (invitees.length > 0) {
      expect(invitees[0]).toHaveProperty('bucketId')
      expect(invitees[0]).toHaveProperty('permission')
      expect(invitees[0]).toHaveProperty('user')
    }
    expect(invitees).toBeTruthy()
  })

  test('Update a bucket access', async () => {
    const updatedBucketAccess = await updateBucketAccess(bucketId, inviteeId, { permission: 'VIEWER' })
    expect(updatedBucketAccess.permission).toBe('VIEWER')
  })

  test('Delete a bucket access', async () => {
    await deleteBucketAccess(bucketId, inviteeId)
    const deletedBucketAccess = await prisma.bucketAccess.findUnique({
      where: { bucketId_inviteeId: { bucketId, inviteeId } }
    })
    expect(deletedBucketAccess).toBeNull()
  })
})

import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import { deleteUser } from '../models/utils/helperFunctions'
import { createCompany } from '@/api/db/services/companyService'

import { createBucket } from '@/api/db/services/bucketService'
import {
  addCompanyToBucket,
  getCompaniesByBucketId,
  getBucketsByCompanyId,
  getCompanyBucketByID,
  removeCompanyFromBucket
} from '@/api/db/services/companyBucketMembershipService'

import { createUser } from '@/api/db/services/userService'
const prisma = new PrismaClient()
describe('Company Bucket membership Model Tests', () => {
  let userId: number
  let companyId: number
  let bucketId: number

  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id
  })
  test('Create a new company with valid details', async () => {
    const company = await createCompany({ name: 'google', description: 'Test Company', addedBy: userId })
    companyId = company.id
    expect(company).toHaveProperty('id')
    expect(company.name).toBe('google')
    expect(company.description).toBe('Test Company')
    expect(company.addedBy).toBe(userId)
  })

  test('Create a new bucket with valid details', async () => {
    const bucket = await createBucket({ title: 'bucket', description: 'Test bucket', ownerId: userId, isPublic: true })
    bucketId = bucket.id
    expect(bucket).toHaveProperty('id')
    expect(bucket.title).toBe('bucket')
  })

  test('Create a new companyBucketMembership with valid details', async () => {
    const relation = await addCompanyToBucket(companyId, bucketId)
    expect(relation.bucketId).toBe(bucketId)
    expect(relation.companyId).toBe(companyId)
  })

  test('Retrieve companies by bucket id', async () => {
    const companies = await getCompaniesByBucketId(bucketId)
    expect(companies).toBeTruthy()
    expect(companies[0]?.id).toBe(companyId)
  })

  test('Retrieve buckets by company id', async () => {
    const buckets = await getBucketsByCompanyId(companyId)
    expect(buckets).toBeTruthy()
    expect(buckets[0]?.id).toBe(bucketId)
  })

  test('Retrieve buckets by company id', async () => {
    const relation = await getCompanyBucketByID(bucketId, companyId)
    expect(relation).toBeTruthy()
    expect(relation?.bucketId).toBe(bucketId)
  })

  test('Delete a company', async () => {
    await removeCompanyFromBucket(companyId, bucketId)
    const deletedCompany = await prisma.companyBucketMembership.findUnique({
      where: {
        companyId_bucketId: {
          companyId,
          bucketId
        }
      }
    })
    expect(deletedCompany).toBeNull()
  })
})

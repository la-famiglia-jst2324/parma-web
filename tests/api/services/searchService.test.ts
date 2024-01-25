import {
  createBucket,
  createCompany,
  createUser,
  deleteBucket,
  deleteCompany,
  deleteUser
} from '../models/utils/helperFunctions'
import { searchCompaniesAndBuckets } from '@/api/db/services/searchService'

import { prisma } from '@/api/db/prisma/prismaClient'

describe('searchCompaniesAndBuckets', () => {
  let userId: number
  let companyId: number
  let bucketId: number

  beforeAll(async () => {
    // Create a company before each test
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    bucketId = (await createBucket(userId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    // Delete the company after each test
    await deleteCompany(companyId)
    await deleteBucket(bucketId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  it('returns combined and paginated results', async () => {
    const result = await searchCompaniesAndBuckets('test', 1, 2, userId)

    // Check the result, per default the names contain the key word test
    expect(result.data.length).toEqual(2)
    expect(result.pagination.currentPage).toEqual(1)
    expect(result.pagination.pageSize).toEqual(2)
  })
})

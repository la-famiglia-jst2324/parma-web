import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createCompanySubscription,
  getUserCompanySubscriptions,
  deleteCompanySubscription
} from '@/api/db/services/companySubscriptionService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Company Subscription Model Tests', () => {
  let userId: number
  let companyId: number

  beforeAll(async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    const company = await createCompany({ name: 'Google', addedBy: user.id })
    userId = user.id
    companyId = company.id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new Company Subsciption Relation with valid details', async () => {
    const relation = await createCompanySubscription({
      userId,
      companyId
    })
    expect(relation).toHaveProperty('userId')
    expect(relation.userId).toBe(userId)
    expect(relation.companyId).toBe(companyId)
  })

  test('Retrieve a Company Subsciption Relation', async () => {
    const relation = await getUserCompanySubscriptions(userId, companyId)

    expect(relation.userId).toBe(userId)
    expect(relation.companyId).toBe(companyId)
  })

  test('Retrieve all Company Subsciption Relation of one user', async () => {
    const companies = await getUserCompanySubscriptions(userId)

    expect(companies[0].id).toBe(companyId)
  })

  test('Delete a Company SourceMeasurement', async () => {
    await deleteCompanySubscription(userId, companyId)
    const deletedRelation = await prisma.companySubscription.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })
    expect(deletedRelation).toBeNull()
  })
})

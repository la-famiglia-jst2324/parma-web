import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from '../utils/random'
import {
  createNewsSubscription,
  deleteNewsSubscription,
  getNewsSubscriptionById,
  getNewsSubscriptionsByUserId
} from '@/api/db/services/newsSubscriptionService'
import { createCompany, deleteCompany } from '@/api/db/services/companyService'
import { createUser, deleteUser } from '@/api/db/services/userService'

const prisma = new PrismaClient()

describe('Company Datasource Model Tests', () => {
  let newsSubscriptionId: { userId: number; companyId: number }
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

  test('Create a new news subscription Relation', async () => {
    const subscription = await createNewsSubscription({
      userId,
      companyId
    })
    newsSubscriptionId = {
      userId: subscription.userId,
      companyId: subscription.companyId
    }
    expect(subscription).toHaveProperty('userId')
    expect(subscription.userId).toBe(userId)
    expect(subscription).toHaveProperty('companyId')
  })

  test('Retrieve a news subscription', async () => {
    const subscription = await getNewsSubscriptionById(newsSubscriptionId.userId, newsSubscriptionId.companyId)
    expect(subscription.userId).toBe(userId)
    expect(subscription.companyId).toBe(companyId)
  })

  test('Retrieve all news subscriptions of a user', async () => {
    const companies = await getNewsSubscriptionsByUserId(userId)
    expect(companies[0].id).toBe(companyId)
  })

  test('Delete a Company Datasource Relation', async () => {
    await deleteNewsSubscription(userId, companyId)
    const deletedMembership = await prisma.newsSubscription.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })
    expect(deletedMembership).toBeNull()
  })
})

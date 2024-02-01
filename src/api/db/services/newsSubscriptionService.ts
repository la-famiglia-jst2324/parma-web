import type { Company, NewsSubscription } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

type NewsSubscriptionWithCompany = NewsSubscription & {
  company: Company
}

const createNewsSubscription = async (data: { userId: number; companyId: number }) => {
  try {
    const existingSubscription = await prisma.newsSubscription.findUnique({
      where: {
        userId_companyId: {
          userId: data.userId,
          companyId: data.companyId
        }
      }
    })
    if (existingSubscription) {
      throw new Error(`You have already subscribed to this company.`)
    }
    const subscription = await prisma.newsSubscription.create({
      data: {
        userId: data.userId,
        companyId: data.companyId
      }
    })
    return subscription
  } catch (error) {
    console.error('Error subscribe to the company:', error)
    throw error
  }
}

const getNewsSubscriptionById = async (userId: number, companyId: number) => {
  try {
    const subscription = await prisma.newsSubscription.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })
    if (!subscription) {
      throw new Error(`does not have the subscription.`)
    }
    return subscription
  } catch (error) {
    console.error('Error getting data sources in this company:', error)
    throw error
  }
}

const getNewsSubscriptionsByUserId = async (userId: number) => {
  try {
    const subscriptions = await prisma.newsSubscription.findMany({
      where: {
        userId
      },
      include: {
        company: true
      }
    })
    if (!subscriptions) {
      throw new Error(`the user ${userId} does not have any subscriptions.`)
    }
    // list all companies
    return subscriptions.map((membership: NewsSubscriptionWithCompany) => membership.company)
  } catch (error) {
    console.error('Error retrieving subscriptions for user:', error)
    throw error
  }
}

const deleteNewsSubscription = async (userId: number, companyId: number) => {
  try {
    const membership = await prisma.newsSubscription.delete({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error deleting data source from the company:', error)
    throw error
  }
}

export { createNewsSubscription, getNewsSubscriptionById, getNewsSubscriptionsByUserId, deleteNewsSubscription }

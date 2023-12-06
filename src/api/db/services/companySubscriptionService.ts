import { prisma } from '../prisma/prismaClient'

const createCompanySubscription = async (data: { userId: number; companyId: number }) => {
  try {
    const existingSubscription = await prisma.companySubscription.findUnique({
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
    const subscription = await prisma.companySubscription.create({
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

const getCompanySubscriptionById = async (userId: number, companyId: number) => {
  try {
    const subscription = await prisma.companySubscription.findUnique({
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
    console.error('Error getting subscribed companies:', error)
    throw error
  }
}

const getCompanySubscriptionsByUserId = async (userId: number) => {
  try {
    const subscriptions = await prisma.companySubscription.findMany({
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
    return subscriptions.map((membership) => membership.company)
  } catch (error) {
    console.error('Error retrieving subscriptions for user:', error)
    throw error
  }
}

const deleteCompanySubscription = async (userId: number, companyId: number) => {
  try {
    const membership = await prisma.companySubscription.delete({
      where: {
        userId_companyId: {
          userId,
          companyId
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error deleting company subscription:', error)
    throw error
  }
}

export {
  createCompanySubscription,
  getCompanySubscriptionById,
  getCompanySubscriptionsByUserId,
  deleteCompanySubscription
}

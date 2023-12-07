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

const getUserCompanySubscriptions = async (userId: number, companyId?: number) => {
  try {
    if (companyId !== undefined) {
      // Get a specific company subscription
      const subscription = await prisma.companySubscription.findUnique({
        where: {
          userId_companyId: {
            userId,
            companyId
          }
        }
      })
      if (!subscription) {
        throw new Error(`User does not have a subscription with company ID: ${companyId}.`)
      }
      return subscription
    } else {
      // Get all subscriptions for the user
      const subscriptions = await prisma.companySubscription.findMany({
        where: {
          userId
        },
        include: {
          company: true
        }
      })
      if (subscriptions.length === 0) {
        throw new Error(`User ${userId} does not have any subscriptions.`)
      }
      return subscriptions.map((subscription) => subscription.company)
    }
  } catch (error) {
    console.error('Error retrieving company subscriptions:', error)
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

export { createCompanySubscription, getUserCompanySubscriptions, deleteCompanySubscription }

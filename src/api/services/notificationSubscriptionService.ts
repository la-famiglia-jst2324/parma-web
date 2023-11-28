import { prisma } from '../prismaClient'

const createNotificationSubscription = async (data: { userId: number; companyId: number; channelId: number }) => {
  try {
    return await prisma.notificationSubscription.create({
      data: {
        userId: data.userId,
        companyId: data.companyId,
        channelId: data.channelId
      }
    })
  } catch (error) {
    console.error('Error creating notification subscription:', error)
    throw new Error('Unable to create notification subscription')
  }
}

const getNotificationSubscription = async (userId: number, companyId: number, channelId: number) => {
  try {
    const subscription = await prisma.notificationSubscription.findUnique({
      where: {
        userId_companyId_channelId: {
          userId,
          companyId,
          channelId
        }
      }
    })
    if (!subscription) {
      throw new Error('NotificationSubscription not found')
    }
    return subscription
  } catch (error) {
    console.error('Error retrieving notification subscription:', error)
    throw new Error('Unable to retrieve notification subscription')
  }
}

const deleteNotificationSubscription = async (userId: number, companyId: number, channelId: number) => {
  try {
    return await prisma.notificationSubscription.delete({
      where: {
        userId_companyId_channelId: {
          userId,
          companyId,
          channelId
        }
      }
    })
  } catch (error) {
    console.error('Error deleting notification subscription:', error)
    throw new Error('Unable to delete notification subscription')
  }
}

export { createNotificationSubscription, getNotificationSubscription, deleteNotificationSubscription }

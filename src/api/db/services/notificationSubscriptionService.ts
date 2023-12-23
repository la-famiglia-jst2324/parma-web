import type { ChannelPurpose } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createNotificationSubscription = async (data: {
  userId: number
  channelId: number
  channelPurpose: ChannelPurpose
}) => {
  try {
    return await prisma.notificationSubscription.create({
      data: {
        userId: data.userId,
        channelId: data.channelId,
        channelPurpose: data.channelPurpose
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
        userId_channelId: {
          userId,
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
        userId_channelId: {
          userId,
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

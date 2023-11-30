import type { ChannelType, EntityType } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createNotificationChannel = async (data: {
  entityId: string
  entityType: EntityType
  channelType: ChannelType
  destination: string
}) => {
  try {
    return await prisma.notificationChannel.create({
      data: {
        entityId: data.entityId,
        entityType: data.entityType,
        channelType: data.channelType,
        destination: data.destination
      }
    })
  } catch (error) {
    console.error('Error creating notification channel:', error)
    throw new Error('Unable to create notification channel')
  }
}

const getNotificationChannelById = async (id: number) => {
  try {
    const notificationChannel = await prisma.notificationChannel.findUnique({
      where: { id },
      include: {
        notificationSubscriptions: true,
        reportSubscriptions: true
      }
    })
    if (!notificationChannel) {
      throw new Error(`NotificationChannel with ID ${id} not found`)
    }
    return notificationChannel
  } catch (error) {
    console.error('Error retrieving notification channel:', error)
    throw new Error('Unable to retrieve notification channel')
  }
}

const updateNotificationChannel = async (
  id: number,
  data: {
    entityId?: string
    entityType?: EntityType
    channelType?: ChannelType
    destination?: string
  }
) => {
  try {
    return await prisma.notificationChannel.update({
      where: { id },
      data: { ...data }
    })
  } catch (error) {
    console.error('Error updating notification channel:', error)
    throw new Error('Unable to update notification channel')
  }
}
const deleteNotificationChannel = async (id: number) => {
  try {
    return await prisma.notificationChannel.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting notification channel:', error)
    throw new Error('Unable to delete notification channel')
  }
}

export { createNotificationChannel, getNotificationChannelById, updateNotificationChannel, deleteNotificationChannel }

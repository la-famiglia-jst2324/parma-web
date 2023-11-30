import { prisma } from '../prismaClient'

const createNotification = async (data: { message: string; companyId: number; dataSourceId: number }) => {
  try {
    return await prisma.notification.create({
      data: {
        message: data.message,
        companyId: data.companyId,
        dataSourceId: data.dataSourceId
      }
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    throw new Error('Unable to create notification')
  }
}

const getNotificationById = async (id: number) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id }
    })
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found`)
    }
    return notification
  } catch (error) {
    console.error('Error retrieving notification:', error)
    throw new Error('Unable to retrieve notification')
  }
}

const updateNotification = async (
  id: number,
  data: {
    message?: string
  }
) => {
  try {
    return await prisma.notification.update({
      where: { id },
      data
    })
  } catch (error) {
    console.error('Error updating notification:', error)
    throw new Error('Unable to update notification')
  }
}
const deleteNotification = async (id: number) => {
  try {
    return await prisma.notification.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting notification:', error)
    throw new Error('Unable to delete notification')
  }
}
export { createNotification, getNotificationById, updateNotification, deleteNotification }

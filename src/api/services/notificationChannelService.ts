import { ChannelType, EntityType } from '@prisma/client';
import { prisma } from '../prismaClient';

const createNotificationChannel = async (data: {
  entity_id: string;
  entity_type: EntityType;
  channel_type: ChannelType;
  destination: string;
}) => {
  try {
    return await prisma.notificationChannel.create({
      data: {
        entity_id: data.entity_id,
        entity_type: data.entity_type,
        channel_type: data.channel_type,
        destination: data.destination,
      },
    });
  } catch (error) {
    console.error('Error creating notification channel:', error);
    throw new Error('Unable to create notification channel');
  }
}

const getNotificationChannelById = async (id: string) => {
  try {
    const notificationChannel = await prisma.notificationChannel.findUnique({
      where: { id },
      include: {
        notificationSubscriptions: true,
        reportSubscriptions: true,
      },
    });
    if (!notificationChannel) {
      throw new Error(`NotificationChannel with ID ${id} not found`);
    }
    return notificationChannel;
  } catch (error) {
    console.error('Error retrieving notification channel:', error);
    throw new Error('Unable to retrieve notification channel');
  }
}

const updateNotificationChannel = async (id: string, data: {
  entity_id?: string;
  entity_type?: EntityType;
  channel_type?: ChannelType;
  destination?: string;
}) => {
  try {
    return await prisma.notificationChannel.update({
      where: { id },
      data: { ...data },
    });
  } catch (error) {
    console.error('Error updating notification channel:', error);
    throw new Error('Unable to update notification channel');
  }
}
const deleteNotificationChannel = async (id: string) => {
  try {
    return await prisma.notificationChannel.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting notification channel:', error);
    throw new Error('Unable to delete notification channel');
  }
}

export default {
  createNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel,
  deleteNotificationChannel,
};
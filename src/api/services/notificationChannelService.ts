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

const getNotificationChannelById = async (channel_id: string) => {
  try {
    const notificationChannel = await prisma.notificationChannel.findUnique({
      where: { id: channel_id },
    });
    if (!notificationChannel) {
      throw new Error(`NotificationChannel with ID ${channel_id} not found`);
    }
    return notificationChannel;
  } catch (error) {
    console.error('Error retrieving notification channel:', error);
    throw new Error('Unable to retrieve notification channel');
  }
}

const updateNotificationChannel = async (channel_id: string, data: {
  entity_id?: string;
  entity_type?: EntityType;
  channel_type?: ChannelType;
  destination?: string;
}) => {
  try {
    return await prisma.notificationChannel.update({
      where: { id: channel_id },
      data: data,
    });
  } catch (error) {
    console.error('Error updating notification channel:', error);
    throw new Error('Unable to update notification channel');
  }
}
const deleteNotificationChannel = async (channel_id: string) => {
  try {
    return await prisma.notificationChannel.delete({
      where: { id: channel_id },
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
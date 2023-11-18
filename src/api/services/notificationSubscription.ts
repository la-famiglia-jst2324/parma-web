import { ChannelType, EntityType } from '@prisma/client';
import { prisma } from '../prismaClient';

const createNotificationSubscription = async (data: {
  user_id: string;
  company_id: string;
  channel_id: string;
}) => {
  try {
    return await prisma.notificationSubscription.create({
      data: {
        user_id: data.user_id,
        company_id: data.company_id,
        channel_id: data.channel_id,
      },
    });
  } catch (error) {
    console.error('Error creating notification subscription:', error);
    throw new Error('Unable to create notification subscription');
  }
}

const getNotificationSubscription = async (user_id: string, company_id: string, channel_id: string) => {
  try {
    const subscription = await prisma.notificationSubscription.findUnique({
      where: {
        user_id_company_id_channel_id: {
          user_id,
          company_id,
          channel_id,
        },
      },
    });
    if (!subscription) {
      throw new Error('NotificationSubscription not found');
    }
    return subscription;
  } catch (error) {
    console.error('Error retrieving notification subscription:', error);
    throw new Error('Unable to retrieve notification subscription');
  }
}


const deleteNotificationSubscription = async (user_id: string, company_id: string, channel_id: string) => {
  try {
    return await prisma.notificationSubscription.delete({
      where: {
        user_id_company_id_channel_id: {
          user_id,
          company_id,
          channel_id,
        },
      },
    });
  } catch (error) {
    console.error('Error deleting notification subscription:', error);
    throw new Error('Unable to delete notification subscription');
  }
}


export default {
  createNotificationSubscription,
  getNotificationSubscription,
  deleteNotificationSubscription,


};
import { prisma } from '../prismaClient';

const createReportSubscription = async (data: {
  user_id: string;
  company_id: string;
  channel_id: string;
}) => {
  try {
    return await prisma.reportSubscription.create({
      data: {
        user_id: data.user_id,
        company_id: data.company_id,
        channel_id: data.channel_id,
      },
    });
  } catch (error) {
    console.error('Error creating report subscription:', error);
    throw new Error('Unable to create report subscription');
  }
}

const getReportSubscription = async (user_id: string, company_id: string, channel_id: string) => {
  try {
    const subscription = await prisma.reportSubscription.findUnique({
      where: {
        user_id_company_id_channel_id: {
          user_id,
          company_id,
          channel_id,
        },
      },
    });
    if (!subscription) {
      throw new Error('reportSubscription not found');
    }
    return subscription;
  } catch (error) {
    console.error('Error retrieving report subscription:', error);
    throw new Error('Unable to retrieve report subscription');
  }
}

const deleteReportSubscription = async (user_id: string, company_id: string, channel_id: string) => {
  try {
    return await prisma.reportSubscription.delete({
      where: {
        user_id_company_id_channel_id: {
          user_id,
          company_id,
          channel_id,
        },
      },
    });
  } catch (error) {
    console.error('Error deleting report subscription:', error);
    throw new Error('Unable to delete report subscription');
  }
}
export default {
  createReportSubscription,
  getReportSubscription,
  deleteReportSubscription,


};
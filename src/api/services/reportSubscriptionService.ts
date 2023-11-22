import { prisma } from '../prismaClient'

const createReportSubscription = async (data: { userId: number; companyId: number; channelId: number }) => {
  try {
    return await prisma.reportSubscription.create({
      data: {
        userId: data.userId,
        companyId: data.companyId,
        channelId: data.channelId
      }
    })
  } catch (error) {
    console.error('Error creating report subscription:', error)
    throw new Error('Unable to create report subscription')
  }
}

const getReportSubscription = async (userId: number, companyId: number, channelId: number) => {
  try {
    const subscription = await prisma.reportSubscription.findUnique({
      where: {
        userId_companyId_channelId: {
          userId,
          companyId,
          channelId
        }
      }
    })
    if (!subscription) {
      throw new Error('reportSubscription not found')
    }
    return subscription
  } catch (error) {
    console.error('Error retrieving report subscription:', error)
    throw new Error('Unable to retrieve report subscription')
  }
}

const deleteReportSubscription = async (userId: number, companyId: number, channelId: number) => {
  try {
    return await prisma.reportSubscription.delete({
      where: {
        userId_companyId_channelId: {
          userId,
          companyId,
          channelId
        }
      }
    })
  } catch (error) {
    console.error('Error deleting report subscription:', error)
    throw new Error('Unable to delete report subscription')
  }
}
export default {
  createReportSubscription,
  getReportSubscription,
  deleteReportSubscription
}

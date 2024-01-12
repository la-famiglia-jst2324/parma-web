import { prisma } from '../prisma/prismaClient'

const createNotificationRule = async (data: {
  ruleName: string
  sourceMeasurementId: number
  threshold: number
  aggregationMethod?: string
  numAggregationEntries?: number
  notificationMessage?: string
}) => {
  try {
    return await prisma.notificationRules.create({
      data: {
        ruleName: data.ruleName,
        sourceMeasurementId: data.sourceMeasurementId,
        threshold: data.threshold,
        aggregationMethod: data.aggregationMethod,
        numAggregationEntries: data.numAggregationEntries,
        notificationMessage: data.notificationMessage
      }
    })
  } catch (error) {
    console.error('Error creating notification rule:', error)
    throw new Error('Unable to create notification rule')
  }
}

const getNotificationRuleById = async (id: number) => {
  try {
    const notificationRule = await prisma.notificationRules.findUnique({
      where: { ruleId: id }
    })
    if (!notificationRule) {
      throw new Error(`NotificationRule with ID ${id} not found`)
    }
    return notificationRule
  } catch (error) {
    console.error('Error retrieving notification rule:', error)
    throw new Error('Unable to retrieve notification rule')
  }
}

const updateNotificationRule = async (
  id: number,
  data: {
    ruleName?: string
    sourceMeasurementId?: number
    threshold?: number
    aggregationMethod?: string
    numAggregationEntries?: number
    notificationMessage?: string
  }
) => {
  try {
    return await prisma.notificationRules.update({
      where: { ruleId: id },
      data: { ...data }
    })
  } catch (error) {
    console.error('Error updating notification rule:', error)
    throw new Error('Unable to update notification rule')
  }
}

const deleteNotificationRule = async (id: number) => {
  try {
    return await prisma.notificationRules.delete({
      where: { ruleId: id }
    })
  } catch (error) {
    console.error('Error deleting notification rule:', error)
    throw new Error('Unable to delete notification rule')
  }
}

export { createNotificationRule, getNotificationRuleById, updateNotificationRule, deleteNotificationRule }

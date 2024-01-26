import type { ChannelType } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { prisma } from '../prisma/prismaClient'
import { deleteSecret, getSecretManagerClient, storeSecret } from '@/api/gcp/secret_manager'

/**
 * The apiKey, if provided, is stored in the secret manager and a secretId
 * is stored instead in the database.
 * @param data
 * @returns
 */
const createNotificationChannel = async (
  data: { channelType: ChannelType; destination: string; apiKey?: string },
  secretPrefix: string = 'parma-analytics-notification-channel-key'
) => {
  try {
    let secretId = null
    // create a secret if the request contains a key.
    if (data.apiKey) {
      secretId = `${secretPrefix}-${uuid()}`
      const smClient = getSecretManagerClient()
      await storeSecret(smClient, secretId, data.apiKey)
    }

    return await prisma.notificationChannel.create({
      data: {
        channelType: data.channelType,
        destination: data.destination,
        secretId
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
        notificationSubscriptions: true
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

/**
 * Updates the notification channel with id with the provided data.
 * If an apiKey is provided in the request, the method adds a secretId (if not
 * existing) and updates the value stored in the secret manager.
 * @param id
 * @param data
 * @returns
 */
const updateNotificationChannel = async (
  id: number,
  data: {
    entityId?: string
    channelType?: ChannelType
    destination?: string
    apiKey?: string
  }
) => {
  try {
    let secretId = null
    if (data.apiKey) {
      const notificationChannel = await getNotificationChannelById(id)
      // check if a secretId already exists or not.
      secretId = notificationChannel?.secretId || `parma-analytics-notification-channel-key-${uuid()}`
      const smClient = getSecretManagerClient()
      await storeSecret(smClient, secretId, data.apiKey)
    }
    // ignore apiKey
    delete data.apiKey
    // include secretId to the payload only if it is defined
    const updatePayload = {
      ...data,
      ...(secretId != null && { secretId })
    }

    return await prisma.notificationChannel.update({
      where: { id },
      data: { ...updatePayload }
    })
  } catch (error) {
    console.error('Error updating notification channel:', error)
    throw new Error('Unable to update notification channel')
  }
}
const deleteNotificationChannel = async (id: number) => {
  try {
    const notificationChannel = await getNotificationChannelById(id)
    if (notificationChannel.secretId) {
      const smClient = getSecretManagerClient()
      await deleteSecret(smClient, notificationChannel.secretId)
    }

    return await prisma.notificationChannel.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting notification channel:', error)
    throw new Error('Unable to delete notification channel')
  }
}

export { createNotificationChannel, getNotificationChannelById, updateNotificationChannel, deleteNotificationChannel }

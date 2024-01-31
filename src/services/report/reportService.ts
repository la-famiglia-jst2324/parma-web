import type { ChannelType, ChannelPurpose } from '@prisma/client'
import fetchClient from '../fetchClient'

export async function postNotificationChannel(channelType: ChannelType, destination: string, apiKey: string) {
  try {
    const response = await fetchClient.post(`/api/notificationChannel`, { channelType, destination, apiKey })
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function postNotificationSubscription(channelId: number, channelPurpose: ChannelPurpose) {
  try {
    const response = await fetchClient.post(`/api/notificationSubscription`, { channelId, channelPurpose })
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

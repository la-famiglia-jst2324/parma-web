import type { NextApiRequest, NextApiResponse } from 'next'

import {
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { channelId } = req.query

  switch (method) {
    case 'GET':
      try {
        const notificationChannel = await getNotificationChannelById(Number(channelId))
        if (notificationChannel) res.status(200).json(notificationChannel)
        else res.status(400).json({ error: 'No NotificationChannel found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedNotificationChannel = await updateNotificationChannel(Number(channelId), req.body)
        res.status(200).json(updatedNotificationChannel)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteNotificationChannel(Number(channelId))
        res.status(200).json({ message: 'NotificationChannel successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

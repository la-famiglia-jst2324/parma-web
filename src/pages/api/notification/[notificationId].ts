import type { NextApiRequest, NextApiResponse } from 'next'

import { getNotificationById, updateNotification, deleteNotification } from '@/api/db/services/notificationService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { notificationId } = req.query

  switch (method) {
    case 'GET':
      try {
        const notification = await getNotificationById(Number(notificationId))
        if (notification) res.status(200).json(notification)
        else res.status(400).json({ error: 'No Notification found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedNotification = await updateNotification(Number(notificationId), req.body)
        res.status(200).json(updatedNotification)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteNotification(Number(notificationId))
        res.status(200).json({ message: 'Notification successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

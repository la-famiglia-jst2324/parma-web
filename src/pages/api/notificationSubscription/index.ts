import type { NextApiRequest, NextApiResponse } from 'next'

import {
  createNotificationSubscription,
  deleteNotificationSubscription
} from '@/api/db/services/notificationSubscriptionService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { userId, companyId, channelId } = req.body

  switch (method) {
    // case 'GET':
    //   try {
    //     const notificationChannel = await getNotificationSubscription(userId,companyId,channelId)
    //     if (notificationChannel) {
    //       res.status(201).json(notificationChannel)
    //     } else res.status(400).json({ error: 'No subscription found' })
    //   } catch (error) {
    //     res.status(500).json({ error: 'Internal Server Error' })
    //   }
    //   break
    case 'POST':
      try {
        const notificationChannel = await createNotificationSubscription(req.body)
        if (notificationChannel) {
          res.status(201).json(notificationChannel)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteNotificationSubscription(userId, companyId, channelId)
        res.status(200).json({ message: 'Notification Subscription successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

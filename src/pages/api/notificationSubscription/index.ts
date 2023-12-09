import type { NextApiRequest, NextApiResponse } from 'next'

import type { User } from '@prisma/client'
import { createNotificationSubscription } from '@/api/db/services/notificationSubscriptionService'
export default async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'POST':
      try {
        const notificationChannel = await createNotificationSubscription({ userId, ...req.body })
        if (notificationChannel) {
          res.status(201).json(notificationChannel)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

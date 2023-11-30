import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotification } from '@/api/db/services/notificationService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const notification = await createNotification(req.body)
        if (notification) {
          res.status(201).json(notification)
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

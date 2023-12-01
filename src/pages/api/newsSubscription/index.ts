import type { NextApiRequest, NextApiResponse } from 'next'
import { createNewsSubscription } from '@/api/db/services/newsSubscriptionService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const newSubscription = await createNewsSubscription(req.body)
        if (newSubscription) {
          res.status(201).json(newSubscription)
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

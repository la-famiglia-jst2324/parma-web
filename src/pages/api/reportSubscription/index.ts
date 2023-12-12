import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createReportSubscription } from '@/api/db/services/reportSubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'POST':
      try {
        const reportSubscription = await createReportSubscription({ userId, ...req.body })
        if (reportSubscription) {
          res.status(201).json(reportSubscription)
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
export default withAuthValidation(handler)

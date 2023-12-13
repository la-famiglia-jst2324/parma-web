import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createReportSubscription, deleteReportSubscription } from '@/api/db/services/reportSubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const { companyId, channelId } = req.body
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
    case 'DELETE':
      try {
        await deleteReportSubscription(userId, companyId, channelId)
        res.status(200).json({ message: 'Report Subscription successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
export default withAuthValidation(handler)

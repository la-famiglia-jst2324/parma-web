import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getUserCompanySubscriptions } from '@/api/db/services/companySubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const { companyId } = req.query

  switch (method) {
    case 'GET':
      try {
        const subscription = await getUserCompanySubscriptions(userId, Number(companyId))
        if (subscription) res.status(200).json(subscription)
        else res.status(400).json({ error: 'subscription not found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
export default withAuthValidation(handler)

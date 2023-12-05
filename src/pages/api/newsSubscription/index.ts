import type { NextApiRequest, NextApiResponse } from 'next'
import { createNewsSubscription, deleteNewsSubscription, getNewsSubscriptionById, getNewsSubscriptionsByUserId } from '@/api/db/services/newsSubscriptionService'
import { User } from '@prisma/client'
import { withAuthValidation } from '@/api/middleware/auth'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const { companyId } = req.body
  const userId = user.id
  const flag = req.query.subscribe

  switch (method) {
    case 'POST':
      try {
        if (Boolean(flag) == true) {
          const newSubscription = await createNewsSubscription({ userId, ...req.body })
          if (newSubscription) {
            res.status(201).json(newSubscription)
          } else res.status(400).json({ error: 'Invalid request parameters' })
        }
        else {
          const existingSubscription = await getNewsSubscriptionById(userId, companyId)
          if (existingSubscription) {
            await deleteNewsSubscription(userId, companyId)
            res.status(200).json({ message: 'news subscription successfully Deleted' })
          } else {
            res.status(404).json({ error: 'news subscription not found' })
          }
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case "GET":
      try {
        const companies = await getNewsSubscriptionsByUserId(userId)
        if (companies) res.status(200).json(companies)
        else res.status(400).json({ error: 'No subscribed companies found' })
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
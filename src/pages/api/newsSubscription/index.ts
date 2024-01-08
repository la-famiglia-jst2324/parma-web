import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { z, ZodError } from 'zod'
import formatZodErrors from '../lib/utils/zodCustomMessage'
import {
  createNewsSubscription,
  deleteNewsSubscription,
  getNewsSubscriptionById,
  getNewsSubscriptionsByUserId
} from '@/api/db/services/newsSubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const newsSubscriptionSchema = z.object({
  companyId: z.number().int().positive()
})
/**
 * @swagger
 * /api/newsSubscription:
 *   post:
 *     summary: Manage a news subscription
 *     description: Creates or deletes a news subscription for a user based on a flag. If the flag is 'true', it creates a subscription; otherwise, it deletes an existing subscription.
 *     parameters:
 *       - in: query
 *         name: subscribe
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *         description: Flag indicating whether to create ('true') or delete ('false') a subscription.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: integer
 *             required:
 *               - companyId
 *     responses:
 *       201:
 *         description: Successfully created a new news subscription.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsSubscription'
 *       200:
 *         description: News subscription successfully deleted.
 *       400:
 *         description: Invalid request parameters or news subscription not found for deletion.
 *       404:
 *         description: News subscription not found for deletion.
 *       500:
 *         description: Internal Server Error.
 *
 *   get:
 *     summary: Retrieve news subscriptions by user ID
 *     description: Fetches news subscriptions associated with a given user ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of subscribed companies for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: No subscribed companies found.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     NewsSubscription:
 *       type: object
 *       required:
 *         - userId
 *         - companyId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         userId:
 *           type: integer
 *         companyId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const { companyId } = newsSubscriptionSchema.parse(req.body)
  const userId = user.id
  const flag = req.query.subscribe

  switch (method) {
    case 'POST':
      try {
        if (flag === 'true') {
          const newSubscription = await createNewsSubscription({ userId, companyId })
          if (newSubscription) {
            res.status(201).json(newSubscription)
          } else res.status(400).json({ error: 'Invalid request parameters' })
        } else {
          const existingSubscription = await getNewsSubscriptionById(userId, companyId)
          if (existingSubscription) {
            await deleteNewsSubscription(userId, companyId)
            res.status(200).json({ message: 'news subscription successfully Deleted' })
          } else {
            res.status(404).json({ error: 'news subscription not found' })
          }
        }
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break

    case 'GET':
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

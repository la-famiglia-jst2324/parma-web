import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { z, ZodError } from 'zod'
import formatZodErrors from '../../lib/utils/zodCustomMessage'
import {
  createCompanySubscription,
  deleteCompanySubscription,
  getUserCompanySubscriptions
} from '@/api/db/services/companySubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const companySubscriptionSchema = z.object({
  companyId: z.number().int().positive()
})
/**
 * @swagger
 * /api/company/subscribed:
 *   post:
 *     summary: Subscribe or unsubscribe a user to a company
 *     description: Allows a user to subscribe or unsubscribe from a company. The action is based on the query parameter 'subscribe'.
 *     parameters:
 *       - in: query
 *         name: subscribe
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ 'true', 'false' ]
 *         description: Flag to indicate subscribing (true) or unsubscribing (false).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *             properties:
 *               companyId:
 *                 type: integer
 *                 description: The ID of the company to subscribe or unsubscribe.
 *     responses:
 *       201:
 *         description: Successfully subscribed to the company.
 *       200:
 *         description: Successfully unsubscribed from the company.
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Company subscription not found (for unsubscribing).
 *       500:
 *         description: Internal Server Error.
 *
 *   get:
 *     summary: Retrieve subscribed companies for a user
 *     description: Fetches all companies that the user is currently subscribed to.
 *     responses:
 *       200:
 *         description: Successfully retrieved subscribed companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: No subscribed companies found.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 */

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const flag = req.query.subscribe

  switch (method) {
    case 'POST':
      try {
        const { companyId } = companySubscriptionSchema.parse(req.body)
        if (flag === 'true') {
          const newSubscription = await createCompanySubscription({ userId, companyId })
          if (newSubscription) {
            res.status(201).json(newSubscription)
          } else res.status(400).json({ error: 'Invalid request parameters' })
        } else {
          const existingSubscription = await getUserCompanySubscriptions(userId, companyId)
          if (existingSubscription) {
            await deleteCompanySubscription(userId, companyId)
            res.status(200).json({ message: 'company subscription successfully Deleted' })
          } else {
            res.status(404).json({ error: 'company subscription not found' })
          }
        }
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break

    case 'GET':
      try {
        const companies = await getUserCompanySubscriptions(userId)
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

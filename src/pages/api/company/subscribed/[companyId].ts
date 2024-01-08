import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getUserCompanySubscriptions } from '@/api/db/services/companySubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/company/subscribed/companyId:
 *   get:
 *     summary: Retrieve a user's subscription to a specific company
 *     description: Fetches subscription details for a user to a specific company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved subscription details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySubscription'
 *       400:
 *         description: Subscription not found.
 *       404:
 *         description: Item not found error.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 * components:
 *   schemas:
 *     CompanySubscription:
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

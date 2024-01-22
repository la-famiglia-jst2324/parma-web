import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { fetchCrmCompanies } from '@/api/db/services/companyService' // replace with your actual service file
import { withAuthValidation } from '@/api/middleware/auth'

/**
 * @swagger
 * /api/fetchCrmCompanies:
 *   post:
 *     tags:
 *       - CrmCompany
 *     summary: Trigger fetching of CRM companies
 *     description: Triggers the service that fetches CRM companies and returns the result.
 *     responses:
 *       200:
 *         description: Message containing the new companies names.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id

  switch (method) {
    case 'POST':
      try {
        const result = await fetchCrmCompanies(userId)
        res.status(200).json({ result })
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

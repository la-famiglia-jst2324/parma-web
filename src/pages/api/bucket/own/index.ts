import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getOwnBuckets } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
/**
 * @swagger
 * /api/bucket/own:
 *   get:
 *     tags:
 *       - bucket
 *     summary: Retrieve a user's own buckets
 *     description: Fetches buckets associated with user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's own buckets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bucket'
 *       400:
 *         description: No buckets found.
 *       500:
 *         description: Internal Server Error.
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'GET':
      try {
        const buckets = await getOwnBuckets(userId)
        return res.status(200).json(buckets)
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

import type { NextApiRequest, NextApiResponse } from 'next'

import { getCommentValueByID } from '@/api/db/services/commentValueService'

/**
 * @swagger
 * tags:
 *   - name: measurementValue
 * /api/commentValues/valueId:
 *   get:
 *     tags:
 *       - measurementValue
 *     summary: Retrieve comment value by value ID
 *     description: Fetches comment value associated with a given value ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved comment value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentValue'
 *       400:
 *         description: No comment value found.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     CommentValue:
 *       type: object
 *       required:
 *         - id
 *         - companyMeasurementId
 *         - value
 *         - timestamp
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         companyMeasurementId:
 *           type: integer
 *         value:
 *           type: string
 *         timestamp:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { valueId } = req.query

  switch (method) {
    case 'GET':
      try {
        const value = await getCommentValueByID(Number(valueId))
        if (value) res.status(200).json(value)
        else res.status(400).json({ error: 'No Measurement Value found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default handler // No auth

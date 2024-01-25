import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { searchCompaniesAndBuckets } from '@/api/db/services/searchService'
import { withAuthValidation } from '@/api/middleware/auth'

/**
 * @swagger
 * tags:
 *   - name: search
 * /api/search:
 *   get:
 *     tags:
 *       - search
 *     summary: Retrieves buckets and companies.
 *     description: Search companies and buckets by name. Support pagination.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully Retrieve buckets and companies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyBucketSearchResult'
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     CompanyBucketSearchResult:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             oneOf:
 *               - $ref: '#/components/schemas/Company'
 *               - $ref: '#/components/schemas/Bucket'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: integer
 *             pageSize:
 *               type: integer
 *             totalPages:
 *               type: integer
 *             totalCount:
 *               type: integer
 */
const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const { name, page, pageSize } = req.query

  switch (method) {
    case 'GET':
      try {
        const searchString: string = (name as string) ?? ''
        const result = await searchCompaniesAndBuckets(
          searchString,
          parseInt(page as string),
          parseInt(pageSize as string),
          user.id
        )
        res.status(200).json(result)
      } catch (error) {
        console.error('Error searching companies and buckets:', error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)

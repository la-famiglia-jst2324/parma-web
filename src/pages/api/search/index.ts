import type { NextApiRequest, NextApiResponse } from 'next'
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
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: true
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
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { name, page, pageSize } = req.query
        const searchString: string = (name as string) ?? ''
        const pageNumber = Number(page) || 1
        const pageSizeNumber = Number(pageSize) || 10

        const result = await searchCompaniesAndBuckets(searchString, pageNumber, pageSizeNumber)
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

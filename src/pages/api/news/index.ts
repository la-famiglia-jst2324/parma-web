import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import formatZodErrors from '../lib/utils/zodCustomMessage'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
import { getAllNews } from '@/api/db/services/newsService'

const NewsSchema = z.object({
  page: z
    .string()
    .optional()
    .refine((val: string | undefined) => val === undefined || !isNaN(parseInt(val, 10)), {
      message: 'page must be a number'
    })
    .transform((val: string | undefined) => (val === undefined ? undefined : parseInt(val, 10))),
  pageSize: z
    .string()
    .optional()
    .refine((val: string | undefined) => val === undefined || !isNaN(parseInt(val, 10)), {
      message: 'pageSize must be a number'
    })
    .transform((val: string | undefined) => (val === undefined ? undefined : parseInt(val, 10))),
  companyId: z
    .string()
    .optional()
    .refine((val: string | undefined) => val === undefined || !isNaN(parseInt(val, 10)), {
      message: 'companyId must be a number'
    })
    .transform((val: string | undefined) => (val === undefined ? undefined : parseInt(val, 10))),
  bucketId: z
    .string()
    .optional()
    .refine((val: string | undefined) => val === undefined || !isNaN(parseInt(val, 10)), {
      message: 'bucketId must be a number'
    })
    .transform((val: string | undefined) => (val === undefined ? undefined : parseInt(val, 10))),
  startDate: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => {
        return val === undefined || !isNaN(Date.parse(val))
      },
      {
        message: 'date must be a valid date string'
      }
    ),
  endDate: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => {
        return val === undefined || !isNaN(Date.parse(val))
      },
      {
        message: 'date must be a valid date string'
      }
    )
})

export type NewsData = z.infer<typeof NewsSchema>
/**
 * @swagger
 * tags:
 *   - name: news
 * /api/news:
 *   get:
 *     tags:
 *       - news
 *     summary: Retrieves news items
 *     description: This endpoint allows you to retrieve news items, optionally filtered by company ID, bucket ID, and date range. Pagination is supported.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: companyId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: bucketId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of news items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsResponse'
 *       404:
 *         description: No news items are found.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     NewsItemReturn:
 *       type: object
 *       required:
 *         - id
 *         - companyId
 *         - title
 *         - description
 *         - companyName
 *         - dataSourceName
 *         - notificationDate
 *         - timestamp
 *         - triggerFactor
 *       properties:
 *         id:
 *           type: string
 *         companyId:
 *           type: string
 *         title:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *         companyName:
 *           type: string
 *         dataSourceName:
 *           type: string
 *         notificationDate:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         bucketName:
 *           type: string
 *         triggerFactor:
 *           type: string
 *           nullable: true
 *
 *     NewsResponse:
 *       type: object
 *       properties:
 *         newsItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NewsItemReturn'
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
 *         bucketName:
 *           type: string
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { page, pageSize, companyId, bucketId, startDate, endDate } = NewsSchema.parse(req.query)
        const news = await getAllNews(page, pageSize, companyId, bucketId, startDate, endDate)
        res.status(200).json(news)
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof z.ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
  }
}

export default withAuthValidation(handler)

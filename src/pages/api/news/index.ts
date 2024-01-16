import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import formatZodErrors from '../lib/utils/zodCustomMessage'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
import { getAllNews } from '@/api/db/services/newsService'

const NewsSchema = z.object({
  page: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10)),
  pageSize: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10)),
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

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { page, pageSize, companyId, bucketId, startDate, endDate } = NewsSchema.parse(req.query)
        if (page && pageSize) {
          const news = await getAllNews(page, pageSize, companyId, bucketId, startDate, endDate)
          if (news) res.status(200).json(news)
          else res.status(404).json({ error: 'No News found' })
        } else {
          res.status(400).json({ error: 'page and pageSize are required!' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof z.ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
  }
}

export default withAuthValidation(handler)

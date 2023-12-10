import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import { getRawDataForCompany } from '@/api/db/services/rawDataService'

const companyAttachmentQuerySchema = z.object({
  companyId: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10))
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = companyAttachmentQuerySchema.parse(req.query)

  const { method } = req
  const { companyId } = query

  switch (method) {
    case 'GET':
      try {
        const rawData = await getRawDataForCompany(companyId)
        if (rawData) {
          res.status(200).json(rawData)
        } else res.status(404).json({ error: `Raw data for company ${companyId} not Found` })
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

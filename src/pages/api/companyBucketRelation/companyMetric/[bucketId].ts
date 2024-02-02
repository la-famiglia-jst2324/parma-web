import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import type { Company } from '@prisma/client'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
import { getCompaniesByBucketId } from '@/api/db/services/companyBucketMembershipService'
import { getMeasurementValueCompanyId } from '@/api/db/services/companySourceMeasurementService'

const membershipGetSchema = z.object({
  bucketId: z.string().transform((value) => {
    if (!isNaN(Number(value))) return Number(value)
    throw new Error('bucketId must be a number')
  })
})

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { bucketId } = membershipGetSchema.parse(req.query)
        if (bucketId) {
          const companies = await getCompaniesByBucketId(bucketId)
          const companyIds = companies.map((company: Company) => company.id)
          const companySourceMeasurement = await getMeasurementValueCompanyId(companyIds)
          if (companySourceMeasurement) res.status(200).json(companySourceMeasurement)
          else res.status(404).json({ error: 'No measurement value for a company id found' })
        } else res.status(400).json({ error: 'No company id was provided' })
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

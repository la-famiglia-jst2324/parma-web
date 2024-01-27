import type { NextApiRequest, NextApiResponse } from 'next'
import { getMeasurementValueCompanyId } from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { companyId } = req.query
  switch (method) {
    case 'GET':
      try {
        if (companyId) {
          const companySourceMeasurement = await getMeasurementValueCompanyId(Number(companyId))
          if (companySourceMeasurement) res.status(200).json(companySourceMeasurement)
          else res.status(400).json({ error: 'No measurement value for a company id found' })
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

export default handler // No auth

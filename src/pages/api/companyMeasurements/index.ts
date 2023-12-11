import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createCompanySourceMeasurement,
  getAllCompanySourceMeasurements
} from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  const { page = 1, pageSize = 10 } = req.query

  switch (method) {
    case 'GET':
      try {
        const companySourceMeasurements = await getAllCompanySourceMeasurements(
          parseInt(page as string),
          parseInt(pageSize as string)
        )
        if (companySourceMeasurements) res.status(200).json(companySourceMeasurements)
        else res.status(400).json({ error: 'No company source measurements found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        const newCompanySourceMeasurement = await createCompanySourceMeasurement({ ...req.body })
        if (newCompanySourceMeasurement) {
          res.status(201).json(newCompanySourceMeasurement)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

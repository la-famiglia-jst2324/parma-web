import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getCompanySourceMeasurementByID,
  updateCompanySourceMeasurement,
  deleteCompanySourceMeasurement
} from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { companyMeasurementId } = req.query

  switch (method) {
    case 'GET':
      try {
        if (companyMeasurementId) {
          const companySourceMeasurement = await getCompanySourceMeasurementByID(Number(companyMeasurementId))
          if (companySourceMeasurement) res.status(200).json(companySourceMeasurement)
          else res.status(400).json({ error: 'No company source measurement found' })
        } else res.status(400).json({ error: 'No company source measurements id was provided' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const updatedCompanySourceMeasurement = await updateCompanySourceMeasurement(
          Number(companyMeasurementId),
          req.body
        )
        if (updatedCompanySourceMeasurement) {
          res.status(200).json(updatedCompanySourceMeasurement)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        const deletedCompanySourceMeasurement = await deleteCompanySourceMeasurement(Number(companyMeasurementId))
        if (deletedCompanySourceMeasurement) {
          res.status(200).json(deletedCompanySourceMeasurement)
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

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getChildMeasurementsByParentId,
  updateParentMeasurementId,
  getSourceMeasurementByID
} from '@/api/db/services/sourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { id } = req.query
  const { newParentId } = req.body
  switch (method) {
    case 'GET':
      try {
        const measurement = await getChildMeasurementsByParentId(Number(id))
        if (measurement) res.status(200).json(measurement)
        else res.status(400).json({ error: 'No Data Source Measurement found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingMeasurement = await getSourceMeasurementByID(Number(id))
        if (existingMeasurement) {
          const updatedMeasurement = await updateParentMeasurementId(Number(id), Number(newParentId))
          res.status(200).json(updatedMeasurement)
        } else {
          res.status(404).json({ error: 'measurement not found' })
        }
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

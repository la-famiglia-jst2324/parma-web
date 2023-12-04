import type { NextApiRequest, NextApiResponse } from 'next'
import { createSourceMeasurement, getAllSourceMeasurements } from '@/api/db/services/sourceMeasurementService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const measurements = await getAllSourceMeasurements()
        if (measurements.length > 0) res.status(200).json(measurements)
        else res.status(400).json({ error: 'No Data Sources Measurements found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        const newMeasurement = await createSourceMeasurement(req.body)
        if (newMeasurement) {
          res.status(201).json(newMeasurement)
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

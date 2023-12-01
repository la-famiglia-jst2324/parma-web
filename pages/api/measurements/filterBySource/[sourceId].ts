import type { NextApiRequest, NextApiResponse } from 'next'
import { getMeasurementsBySourceId } from '@/api/services/sourceMeasurementService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { sourceModuleId } = req.query
  switch (method) {
    case ('GET'):
      try {
        const measurements = await getMeasurementsBySourceId(Number(sourceModuleId))
        if (measurements) res.status(200).json(measurements)
        else res.status(400).json({ error: 'No Data Source Measurements found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
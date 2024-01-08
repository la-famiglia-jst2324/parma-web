import type { NextApiRequest, NextApiResponse } from 'next'
import { getMeasurementsBySourceId } from '@/api/db/services/sourceMeasurementService'
/**
 * @swagger
 * /api/measurements/filterBySource/sourceModuleId:
 *   get:
 *     summary: Retrieve measurements by source module ID
 *     description: Fetches measurements associated with a specific source module based on the provided source module ID.
 *     parameters:
 *       - in: query
 *         name: sourceModuleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the source module to retrieve its associated measurements.
 *     responses:
 *       200:
 *         description: Successfully retrieved the measurements for the source module.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: No Data Source Measurements found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { sourceModuleId } = req.query
  switch (method) {
    case 'GET':
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

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getChildMeasurementsByParentId,
  updateParentMeasurementId,
  getSourceMeasurementByID
} from '@/api/db/services/sourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

/**
 * @swagger
 * /api/measurements/nested/id:
 *   get:
 *     tags:
 *       - sourceMeasurement
 *     summary: Retrieve all child source measurements by the parent source measurement ID
 *     description: Fetches details of child source measurements based on the provided parent ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the child source measurements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: No Child Data Source Measurement found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - sourceMeasurement
 *     summary: Update the parent id of a Source Measurement
 *     description: Updates the parent of an existing Source Measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newParentId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the Source Measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SourceMeasurement'
 *       500:
 *         description: Internal Server Error.
 */
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

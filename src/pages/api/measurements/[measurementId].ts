import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getSourceMeasurementByID,
  updateSourceMeasurement,
  deleteSourceMeasurement
} from '@/api/db/services/sourceMeasurementService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/measurements/measurementId:
 *   get:
 *     tags:
 *       - sourceMeasurement
 *     summary: Retrieve a source measurement by ID
 *     description: Fetches details of a specific source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: measurementId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the source measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: No Data Source Measurement found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - sourceMeasurement
 *     summary: Update a Source Measurement
 *     description: Updates the details of an existing Source Measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: measurementId
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
 *               sourceModuleId:
 *                 type: integer
 *               type:
 *                 type: string
 *               companyId:
 *                 type: integer
 *               measurementName:
 *                 type: string
 *               parentMeasurementId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the Source Measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SourceMeasurement'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - sourceMeasurement
 *     summary: Delete a source measurement
 *     description: Deletes a specific source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: measurementId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Measurement successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { measurementId } = req.query

  switch (method) {
    case 'GET':
      try {
        const measurement = await getSourceMeasurementByID(Number(measurementId))
        if (measurement) res.status(200).json(measurement)
        else res.status(400).json({ error: 'No Data Source Measurement found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingMeasurement = await getSourceMeasurementByID(Number(measurementId))
        if (existingMeasurement) {
          const updatedMeasurement = await updateSourceMeasurement(Number(measurementId), req.body)
          res.status(200).json(updatedMeasurement)
        } else {
          res.status(404).json({ error: 'measurement not found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteSourceMeasurement(Number(measurementId))
        res.status(200).json({ message: 'Measurement successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default handler // No auth

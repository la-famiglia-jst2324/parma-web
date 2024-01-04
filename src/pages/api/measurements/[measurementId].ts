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
 *     summary: Retrieve a source measurement by ID
 *     description: Fetches details of a specific source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: measurementId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the source measurement to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the source measurement.
 *       400:
 *         description: No Data Source Measurement found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

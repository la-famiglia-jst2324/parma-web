import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getCompanySourceMeasurementByID,
  updateCompanySourceMeasurement,
  deleteCompanySourceMeasurement
} from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * tags:
 *   - name: companyMeasurement
 * /api/companyMeasurements/id:
 *   get:
 *     tags:
 *       - companyMeasurement
 *     summary: Retrieve a company source measurement by ID
 *     description: Fetches details of a specific company source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: companyMeasurementId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the company source measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySourceMeasurement'
 *       400:
 *         description: No company source measurement found or no ID was provided.
 *       404:
 *         description: Company source measurement not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - companyMeasurement
 *     summary: Update a company source measurement
 *     description: Updates the details of an existing company source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: companyMeasurementId
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
 *               sourceMeasurementId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the company source measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySourceMeasurement'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - companyMeasurement
 *     summary: Delete a company source measurement
 *     description: Deletes a specific company source measurement based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: companyMeasurementId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company source measurement deleted successfully.
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default handler // No auth

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createCompanySourceMeasurement,
  getAllCompanySourceMeasurements
} from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

/**
 * @swagger
 * /api/companyMeasurements:
 *   get:
 *     summary: Retrieve all company source measurements
 *     description: Fetches a paginated list of all company source measurements.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of company source measurements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanySourceMeasurement'
 *       400:
 *         description: No company source measurements found.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     summary: Create a new company source measurement
 *     description: Creates a new company source measurement with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sourceMeasurementId
 *               - companyId
 *             properties:
 *               sourceMeasurementId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created a new company source measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySourceMeasurement'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     CompanySourceMeasurement:
 *       type: object
 *       required:
 *         - companyMeasurementId
 *         - sourceMeasurementId
 *         - companyId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         companyMeasurementId:
 *           type: integer
 *         sourceMeasurementId:
 *           type: integer
 *         companyId:
 *           type: integer
 */
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

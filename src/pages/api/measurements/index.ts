import type { NextApiRequest, NextApiResponse } from 'next'
import type { SourceMeasurement } from '@prisma/client'
import {
  createSourceMeasurement,
  getAllSourceMeasurements,
  getSourceMeasurementByID
} from '@/api/db/services/sourceMeasurementService'
import { getCompanySourceMeasurementByCompanyId } from '@/api/db/services/companySourceMeasurementService'
import { withAuthValidation } from '@/api/middleware/auth'
interface SourceMeasurementWithChild {
  id: number
  sourceModuleId: number
  type: string
  measurementName: string
  parentMeasurementId: number | null
  createdAt: Date
  modifiedAt: Date
  childSourceMeasurements: SourceMeasurement[]
}
/**
 * @swagger
 * tags:
 *   - name: sourceMeasurement
 * /api/measurements:
 *   get:
 *     tags:
 *       - sourceMeasurement
 *     summary: Retrieve common source measurements (intersection) and its child measurements of a list of company IDs
 *     description: Fetches source measurements associated with given company IDs. Can handle multiple company IDs.
 *     parameters:
 *       - in: query
 *         name: companyIds
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the common source measurements for the given company IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: No relation found or no data source measurements found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     tags:
 *       - sourceMeasurement
 *     summary: Create a new source measurement
 *     description: Creates a new source measurement with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sourceModuleId
 *               - type
 *               - measurementName
 *             properties:
 *               sourceModuleId:
 *                 type: integer
 *               type:
 *                 type: string
 *               measurementName:
 *                 type: string
 *               parentMeasurementId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created a new source measurement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     SourceMeasurement:
 *       type: object
 *       required:
 *         - id
 *         - sourceModuleId
 *         - type
 *         - measurementName
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         sourceModuleId:
 *           type: integer
 *         type:
 *           type: string
 *         measurementName:
 *           type: string
 *         parentMeasurementId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { companyIds } = req.query
  const companiesArray = Array.isArray(companyIds) ? companyIds.map((company) => Number(company)) : [Number(companyIds)]

  switch (method) {
    case 'GET':
      try {
        let measurementWithChildren: SourceMeasurementWithChild[] = []
        if (companyIds && companiesArray.length > 1) {
          const relation = await getCompanySourceMeasurementByCompanyId(companiesArray)
          const sourceMeasurementMap: { [key: number]: number } = {}
          // count sourceMeasurementId
          for (const item of relation) {
            if (companyIds.includes(String(item.companyId))) {
              sourceMeasurementMap[item.sourceMeasurementId] = (sourceMeasurementMap[item.sourceMeasurementId] || 0) + 1
            }
          }
          // check amount companyIds===sourceMeasurementId
          const commonSourceMeasurementIds = Object.keys(sourceMeasurementMap)
            .filter((id) => sourceMeasurementMap[+id] === companyIds.length)
            .map((id) => +id)
          const result: SourceMeasurement[] = []
          for (const id of commonSourceMeasurementIds) {
            for (const item of relation) {
              if (item.sourceMeasurementId === id && !result.some((r) => r.id === item.sourceMeasurement.id)) {
                result.push(item.sourceMeasurement)
              }
            }
          }
          measurementWithChildren = await getMeasurementsWithChildren(result)
          if (result.length > 0) res.status(200).json(measurementWithChildren)
          else res.status(400).json({ error: 'No relation found' })
        } else if (companyIds && companiesArray.length === 1) {
          const relation = await getCompanySourceMeasurementByCompanyId(companiesArray)
          if (relation) {
            const measurements = relation.map((item) => item.sourceMeasurement)
            res.status(200).json(await getMeasurementsWithChildren(measurements))
          } else res.status(400).json({ error: 'No relation found' })
        } else {
          const measurements = await getAllSourceMeasurements()
          res.status(200).json(measurements)
        }
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
export default withAuthValidation(handler)

// Function to get measurement with all nested children
async function getMeasurementsWithChildren(measurements: SourceMeasurement[]) {
  const measurementsWithChildren: SourceMeasurementWithChild[] = []
  for (const measurement of measurements) {
    const withChild = await getSourceMeasurementByID(measurement.id)
    measurementsWithChildren.push(withChild)
  }
  return measurementsWithChildren
}

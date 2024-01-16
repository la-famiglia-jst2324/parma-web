import type { NextApiRequest, NextApiResponse } from 'next'
import { getMeasurementsOfCompaniesBySourceId } from '@/api/db/services/sourceMeasurementService'
import { getDataSourceByName } from '@/api/db/services/dataSourceService'

const newsSources = await getDataSourceByName('News') // Change when available
const newsSourceId = Number(newsSources[0].id)
/**
 * @swagger
 * tags:
 *   - name: dashboard
 * /api/dashboard:
 *   get:
 *     tags:
 *       - dashboard
 *     summary: Retrieve measurements of companies by source ID
 *     description: Fetches measurements for companies based on a source ID. Can optionally filter by a list of company IDs.
 *     parameters:
 *       - in: query
 *         name: companyIds
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the company measurements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SourceMeasurement'
 *       400:
 *         description: No data found for the given parameters.
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
  const companyIds = req.query.companyIds

  switch (method) {
    case 'GET':
      try {
        let companyMeasurements = null
        if (companyIds) {
          const companyIdsList = String(companyIds)
            .split(',')
            .map((x) => Number(x))
          companyMeasurements = await getMeasurementsOfCompaniesBySourceId(newsSourceId, companyIdsList)
        } else {
          companyMeasurements = await getMeasurementsOfCompaniesBySourceId(newsSourceId)
        }

        if (companyMeasurements) res.status(200).json(companyMeasurements)
        else res.status(400).json({ error: 'No data found' })
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

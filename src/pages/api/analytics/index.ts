import type { NextApiRequest, NextApiResponse } from 'next'
import { getValueByMeasurementIdCompanyId } from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

/**
 * @swagger
 * tags:
 *   - name: analytics
 *     description: data analytics
 * /api/analytics:
 *   get:
 *     tags:
 *       - analytics
 *     summary: Retrieves measurement data for specified companies and a measurement ID
 *     description: Fetches measurement data based on a given measurement ID and an array of company IDs. The data is grouped by dates and includes values for each company.
 *     parameters:
 *       - in: query
 *         name: measurementId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the measurement to retrieve data for.
 *       - in: query
 *         name: companies
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         required: true
 *         description: An array of company IDs to retrieve measurement data for.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved the measurement data.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/IntValue'
 *       400:
 *         description: Bad request, if no relation is found.
 *       404:
 *         description: Not found, if the specified item is not found.
 *       405:
 *         description: Method not allowed, if an unsupported method is used.
 *       500:
 *         description: Internal server error.
 * components:
 *   schemas:
 *     IntValue:
 *       type: object
 *       required:
 *         - id
 *         - companyMeasurementId
 *         - value
 *         - timestamp
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         companyMeasurementId:
 *           type: integer
 *         value:
 *           type: integer
 *         timestamp:
 *           type: timestamp
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 *     FloatValue:
 *       type: object
 *       required:
 *         - id
 *         - companyMeasurementId
 *         - value
 *         - timestamp
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         companyMeasurementId:
 *           type: integer
 *         value:
 *           type: float
 *         timestamp:
 *           type: timestamp
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { measurementId, companies, startDate, endDate } = req.query
  const companiesArray = Array.isArray(companies) ? companies.map((company) => Number(company)) : [Number(companies)]
  switch (method) {
    case 'GET':
      try {
        const relation = await getValueByMeasurementIdCompanyId(Number(measurementId), companiesArray)
        const dateCompanyMap: Record<string, Record<string, number>> = {}
        const valueType = relation[0].sourceMeasurement.type
        relation.forEach((data) => {
          switch (valueType.toLowerCase()) {
            case 'int':
              data.measurementIntValues.forEach((measurement) => {
                const date = new Date(measurement.timestamp).toLocaleDateString('en-US')
                if (!dateCompanyMap[date]) {
                  dateCompanyMap[date] = {}
                }
                dateCompanyMap[date][data.company.name] = measurement.value
              })

              break

            case 'float':
              data.measurementFloatValues.forEach((measurement) => {
                const date = new Date(measurement.timestamp).toLocaleDateString('en-US')
                if (!dateCompanyMap[date]) {
                  dateCompanyMap[date] = {}
                }
                dateCompanyMap[date][data.company.name] = measurement.value
              })
              break

            default:
              res.status(405).json({ error: 'Value Type Not Allowed' })
              break
          }
        })
        let result = Object.entries(dateCompanyMap).map(([date, companies]) => {
          return {
            date,
            ...companies
          }
        })

        //  timespan filter
        if (startDate && endDate) {
          // check startDate and endDate
          if (typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).send('Invalid start or end date')
          }
          // ensure the whole day
          const start = new Date(startDate)
          start.setHours(0, 0, 0, 0)
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999)
          result = result.filter((entry) => {
            const entryDate = new Date(entry.date)
            return entryDate >= start && entryDate <= end
          })
        }

        if (result) res.status(200).json(result)
        else res.status(400).json({ error: 'No relation found' })
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
export default withAuthValidation(handler)

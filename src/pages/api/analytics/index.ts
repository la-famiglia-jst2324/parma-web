import type { NextApiRequest, NextApiResponse } from 'next'
import { getValueByMeasurementIdCompanyId } from '@/api/db/services/companySourceMeasurementService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { measurementId, companies, startDate, endDate } = req.query
  const companiesArray = Array.isArray(companies) ? companies.map((company) => Number(company)) : [Number(companies)]
  // check startDate and endDate
  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).send('Invalid start or end date')
  }
  // ensure the whole day
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)
  switch (method) {
    case 'GET':
      try {
        const relation = await getValueByMeasurementIdCompanyId(Number(measurementId), companiesArray)
        const dateCompanyMap: Record<string, Record<string, number>> = {}
        const valueType = relation[0].sourceMeasurement.type
        relation.forEach((data) => {
          switch (valueType) {
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
        const result = Object.entries(dateCompanyMap).map(([date, companies]) => {
          return {
            date,
            ...companies
          }
        })

        //  timespan filter
        const filteredResult = result.filter((entry) => {
          const entryDate = new Date(entry.date)
          return entryDate >= start && entryDate <= end
        })
        if (filteredResult) res.status(200).json(filteredResult)
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

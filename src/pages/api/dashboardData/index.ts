import type { NextApiRequest, NextApiResponse } from 'next'
import { getMeasurementsOfCompaniesBySourceId } from '@/api/db/services/sourceMeasurementService'
import { getDataSourceByName } from '@/api/db/services/dataSourceService'

const newsSources = await getDataSourceByName('News') // Change when available
const newsSourceId = Number(newsSources[0])

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

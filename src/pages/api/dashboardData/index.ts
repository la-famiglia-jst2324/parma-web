import type { NextApiRequest, NextApiResponse } from 'next'
import type { SourceMeasurement } from '@prisma/client'
import { getMeasurementsBySourceIdAndCompanyId } from '@/api/db/services/sourceMeasurementService'
import { getDataSourceByName } from '@/api/db/services/dataSourceService'

const newsSource = await getDataSourceByName('News') // Change when available

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const companyIds = req.query.companyIds

  switch (method) {
    case 'GET':
      try {
        if (companyIds) {
          const idsArray = String(companyIds).split(',')
          const promises = idsArray.map((id) => getMeasurementsBySourceIdAndCompanyId(newsSource[0].id, Number(id)))
          const companyMeasurements = await Promise.all(promises)
          // dictionary with company ids and their corresponding data sources
          const companyDataMeasurementDict = idsArray.reduce<Record<string, SourceMeasurement[] | undefined>>(
            (acc, id, index) => {
              acc[id] = companyMeasurements[index]
              return acc
            },
            {}
          )

          if (companyDataMeasurementDict) res.status(200).json(companyDataMeasurementDict)
          else res.status(400).json({ error: 'No data found' })
        } else {
          res.status(400).json({ error: 'No companyIds provided' })
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

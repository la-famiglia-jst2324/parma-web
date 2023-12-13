import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSourceByName } from '@/api/db/services/dataSourceService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const name = req.query.name

  switch (method) {
    case 'GET':
      try {
        const datasources = await getDataSourceByName(String(name))
        if (datasources) res.status(200).json(datasources)
        else res.status(400).json({ error: 'No data sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { getAllDataSources, createDataSource } from '@/api/services/dataSourceService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const name = (req.query.name as string) || ''
        const page = parseInt(req.query.page as string, 10) || 1
        const size = parseInt(req.query.size as string, 10) || 10

        const dataSources = await getAllDataSources(page, size, name)
        if (dataSources.length > 0) res.status(200).json(dataSources)
        else res.status(400).json({ error: 'No Data Sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new data source
        const newBucket = await createDataSource(req.body)
        if (newBucket) {
          res.status(201).json(newBucket)
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

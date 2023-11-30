import type { NextApiRequest, NextApiResponse } from 'next'

import { createDataSource, getAllDataSources } from '@/api/db/services/dataSourceService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const dataSources = await getAllDataSources()
        if (dataSources.length > 0) res.status(200).json(dataSources)
        else res.status(400).json({ error: 'No Data Sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new bucket
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

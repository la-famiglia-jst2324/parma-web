import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSourceByID, updateDataSource } from '@/api/services/dataSourceService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { dataSourceId } = req.query

  switch (method) {
    case 'PUT':
      try {
        const existingBucket = await getDataSourceByID(Number(dataSourceId))
        if (existingBucket) {
          // Update Bucket
          const updatedBucket = await updateDataSource(Number(dataSourceId), req.body)
          res.status(200).json(updatedBucket)
        } else {
          // Bucket not found
          res.status(404).json({ error: 'Bucket not found' })
        }
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

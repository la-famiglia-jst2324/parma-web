import type { NextApiRequest, NextApiResponse } from 'next'

import { createBucket, getBucketByName, getAllBuckets } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { User } from '@prisma/client'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const bucketName = req.query.name
  const userId = user.id
  switch (method) {
    case 'GET':
      try {
        if (bucketName) {
          const bucket = await getBucketByName(String(bucketName))
          if (bucket) res.status(200).json(bucket)
          else res.status(400).json({ error: 'No Bucket found' })
        } else {
          const buckets = await getAllBuckets()
          if (buckets.length > 0) res.status(200).json(buckets)
          else res.status(400).json({ error: 'No Buckets found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new bucket
        const newBucket = await createBucket({ userId, ...req.body })
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
export default withAuthValidation(handler)
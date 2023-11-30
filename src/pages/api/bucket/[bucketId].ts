import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteBucket, getBucketById, updateBucket } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { bucketId } = req.query

  switch (method) {
    case 'GET':
      try {
        const bucket = await getBucketById(Number(bucketId))
        if (bucket) res.status(200).json(bucket)
        else res.status(400).json({ error: 'No Bucket found' })
        // get all buckets
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingBucket = await getBucketById(Number(bucketId))
        if (existingBucket) {
          // Update Bucket
          const updatedBucket = await updateBucket(Number(bucketId), req.body)
          res.status(200).json(updatedBucket)
        } else {
          res.status(404).json({ error: 'Bucket not found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Failed to update bucket' })
      }
      break

    case 'DELETE':
      try {
        const existingBucket = await getBucketById(Number(bucketId))
        if (existingBucket) {
          await deleteBucket(Number(bucketId))
          res.status(200).json({ message: 'Bucket successfully Deleted' })
        } else res.status(404).json({ error: 'Company not found' })
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

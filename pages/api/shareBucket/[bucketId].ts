import type { NextApiRequest, NextApiResponse } from 'next'

import { createBucketAccess, getBucketAccessByID, updateBucketAccess, deleteBucketAccess } from '@/api/services/bucketAccessService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { bucketId } = req.query
  switch (method) {
    //Share a bucket with other users 
    case 'POST':
      try {
        const data = {
          bucketId,
          ...req.body
        };
        const newAccess = await createBucketAccess(data)
        if (newAccess) {
          res.status(201).json(newAccess)
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
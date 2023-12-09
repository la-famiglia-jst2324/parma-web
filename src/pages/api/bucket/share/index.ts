import type { NextApiRequest, NextApiResponse } from 'next'

import { createBucketAccess } from '@/api/db/services/bucketAccessService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const id = req.query.bucketId
  switch (method) {
    // Share a bucket with other users
    case 'POST':
      try {
        const data = {
          bucketId: Number(id),
          ...req.body
        }
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

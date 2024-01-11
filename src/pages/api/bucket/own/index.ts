import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getOwnBuckets } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'GET':
      try {
        const buckets = await getOwnBuckets(userId)
        if (buckets) res.status(200).json(buckets)
        else res.status(400).json({ error: 'No your own buckets found' })
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
export default withAuthValidation(handler)

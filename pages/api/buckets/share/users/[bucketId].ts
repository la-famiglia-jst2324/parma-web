import type { NextApiRequest, NextApiResponse } from 'next'
import { getInviteesByBucketId } from '@/api/services/bucketAccessService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { bucketId } = req.query

  switch (method) {
    case ('GET'):
      try {
        const invitees = await getInviteesByBucketId(Number(bucketId))
        if (invitees) res.status(200).json(invitees)
        else res.status(400).json({ error: 'No invitees found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
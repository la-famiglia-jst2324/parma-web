import type { NextApiRequest, NextApiResponse } from 'next'
import { getInviteesByBucketId, updateBucketAccess, deleteBucketAccess } from '@/api/db/services/bucketAccessService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { bucketId } = req.query

  switch (method) {
    case 'GET':
      try {
        const invitees = await getInviteesByBucketId(Number(bucketId))
        if (invitees) res.status(200).json(invitees)
        else res.status(400).json({ error: 'No Invitees found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const { inviteeId, permission } = req.body
        const updatedAccess = await updateBucketAccess(Number(bucketId), inviteeId, { permission })
        res.status(200).json(updatedAccess)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        const { inviteeId } = req.body
        await deleteBucketAccess(Number(bucketId), inviteeId)
        res.status(200).json({ message: 'Bucket access deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

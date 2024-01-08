import type { NextApiRequest, NextApiResponse } from 'next'
import { getInviteesByBucketId, updateBucketAccess, deleteBucketAccess } from '@/api/db/services/bucketAccessService'
/**
 * @swagger
 * /api/bucket/share/id:
 *   get:
 *     tags:
 *       - bucket
 *     summary: Retrieve invitees for a bucket
 *     description: Fetches invitees based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved invitees.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BucketAccess'
 *       400:
 *         description: No Invitees found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     summary: Update bucket access for an invitee
 *     description: Updates the access permissions for an invitee in a bucket.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteeId
 *               - permission
 *             properties:
 *               inviteeId:
 *                 type: integer
 *               permission:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated bucket access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BucketAccess'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     summary: Delete bucket access for an invitee
 *     description: Deletes the access of an invitee to a bucket.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteeId
 *             properties:
 *               inviteeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bucket access deleted successfully.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 */

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

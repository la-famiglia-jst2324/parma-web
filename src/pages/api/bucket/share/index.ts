import type { NextApiRequest, NextApiResponse } from 'next'

import { createBucketAccess } from '@/api/db/services/bucketAccessService'
/**
 * @swagger
 * /api/bucket/share:
 *   post:
 *     tags:
 *       - bucket
 *     summary: Share a bucket with other users
 *     description: Allows the sharing of a specific bucket with other users by creating new bucket access.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the bucket to be shared.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userIds
 *               - permission
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of user IDs to share the bucket with.
 *               permission:
 *                 type: string
 *                 description: The access level for the shared users.
 *     responses:
 *       201:
 *         description: Successfully created new bucket access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BucketAccess'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 * components:
 *   schemas:
 *     BucketAccess:
 *       type: object
 *       required:
 *         - bucketId
 *         - inviteeId
 *         - permission
 *       properties:
 *         bucketId:
 *           type: integer
 *           description: The unique identifier of the bucket
 *         inviteeId:
 *           type: integer
 *           description: The name of the bucket
 *         permission:
 *           type: integer
 *           description: The invitee id
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

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

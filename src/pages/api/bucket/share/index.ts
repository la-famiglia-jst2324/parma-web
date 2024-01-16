import type { NextApiRequest, NextApiResponse } from 'next'

import { createBucketAccess } from '@/api/db/services/bucketAccessService'
import { withAuthValidation } from '@/api/middleware/auth'
/**
 * @swagger
 * /api/bucket/share:
 *   post:
 *     tags:
 *       - bucket
 *     summary: Share a bucket with other users
 *     description: Allows the sharing of a specific bucket with other users by creating new bucket access.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - bucketId
 *                 - inviteeId
 *                 - permission
 *               properties:
 *                 bucketId:
 *                   type: integer
 *                 inviteeId:
 *                   type: integer
 *                 permission:
 *                   type: string
 *     responses:
 *       201:
 *         description: Successfully created new bucket access.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BucketAccess'
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
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         bucketId:
 *           type: integer
 *         inviteeId:
 *           type: integer
 *         permission:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    // Share a bucket with other users
    case 'POST':
      try {
        // ensure req.body is array
        if (!Array.isArray(req.body)) {
          res.status(400).json({ error: 'Invalid request format' })
          break
        }
        const createPromises = req.body.map((invite) => {
          const data = {
            bucketId: Number(invite.bucketId),
            inviteeId: Number(invite.inviteeId),
            permission: invite.permission
          }
          return createBucketAccess(data)
        })
        const newAccesses = await Promise.all(createPromises)

        if (newAccesses.every((access) => access)) {
          res.status(201).json(newAccesses)
        } else {
          res.status(400).json({ error: 'Invalid request parameters' })
        }
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

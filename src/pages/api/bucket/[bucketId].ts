import type { NextApiRequest, NextApiResponse } from 'next'

import type { User } from '@prisma/client'
import { deleteBucket, getBucketById, updateBucket } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { getBucketAccessByID } from '@/api/db/services/bucketAccessService'

/**
 * @swagger
 * /api/bucket/id:
 *   get:
 *     tags:
 *       - bucket
 *     summary: Retrieve a bucket by ID
 *     description: Fetches a bucket's details based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the bucket details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bucket'
 *       400:
 *         description: No Bucket found for the provided ID.
 *       404:
 *         description: Bucket not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - bucket
 *     summary: Update a bucket
 *     description: Updates the details of an existing bucket based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *               ownerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the bucket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bucket'
 *       404:
 *         description: Bucket not found.
 *       500:
 *         description: Failed to update bucket.
 *
 *   delete:
 *     tags:
 *       - bucket
 *     summary: Delete a bucket
 *     description: Deletes a bucket based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bucket successfully deleted.
 *       404:
 *         description: Bucket not found.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const { bucketId } = req.query

  switch (method) {
    case 'GET':
      try {
        const bucket = await getBucketById(Number(bucketId))
        if (!bucket) {
          res.status(400).json({ error: 'No Bucket found' })
        }
        // check the user has access to bucket.
        const bucketAccess = await getBucketAccessByID(bucket.id, user.id)
        if (bucketAccess) res.status(200).json(bucket)
        else res.status(400).json({ error: 'Not authorized to view this bucket' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingBucket = await getBucketById(Number(bucketId))
        if (existingBucket) {
          const bucketAccess = await getBucketAccessByID(existingBucket.id, user.id)
          if (!bucketAccess || bucketAccess.permission !== 'MODERATOR') {
            res.status(400).json({ error: 'Not authorized to update this bucket' })
          }

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

export default handler // No auth

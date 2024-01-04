import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteBucket, getBucketById, updateBucket } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

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
 *         description: The ID of the bucket to retrieve.
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
 *     summary: Update a bucket
 *     description: Updates the details of an existing bucket based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the bucket to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bucket'
 *     responses:
 *       200:
 *         description: Successfully updated the bucket.
 *       404:
 *         description: Bucket not found.
 *       500:
 *         description: Failed to update bucket.
 *
 *   delete:
 *     summary: Delete a bucket
 *     description: Deletes a bucket based on the provided bucket ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the bucket to delete.
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

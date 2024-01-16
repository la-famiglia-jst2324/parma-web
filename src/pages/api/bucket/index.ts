import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { createBucket, getBucketByName, getAllBuckets } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
/**
 * @swagger
 * tags:
 *   - name: bucket
 * /api/bucket:
 *   get:
 *     tags:
 *       - bucket
 *     summary: Retrieve a list of buckets or a specific bucket
 *     description: Fetches a list of all buckets or a specific bucket by name. Requires authentication.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The name of the bucket to fetch
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of buckets or a single bucket details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bucket'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Bucket not found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - bucket
 *     summary: Create a new bucket
 *     description: Creates a new bucket with the given details. Requires authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - ownerId
 *               - isPublic
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The created bucket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bucket'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Bucket:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - ownerId
 *         - isPublic
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the bucket
 *         title:
 *           type: string
 *           description: The name of the bucket
 *         ownerId:
 *           type: integer
 *           description: The owner identifier of the bucket
 *         description:
 *           type: string
 *         isPublic:
 *           type: boolean
 *           description: Whether the bucket is publicly accessible
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const bucketName = req.query.name
  const { page, pageSize } = req.query

  switch (method) {
    case 'GET':
      try {
        if (bucketName) {
          const bucket = await getBucketByName(
            String(bucketName),
            parseInt(page as string),
            parseInt(pageSize as string)
          )
          if (bucket) res.status(200).json(bucket)
          else res.status(400).json({ error: 'No Bucket found' })
        } else {
          const buckets = await getAllBuckets(parseInt(page as string), parseInt(pageSize as string))
          if (buckets) res.status(200).json(buckets)
          else res.status(400).json({ error: 'No Buckets found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        // Create a new bucket
        const newBucket = await createBucket({ ownerId: user.id, ...req.body })
        if (newBucket) {
          res.status(201).json(newBucket)
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
export default withAuthValidation(handler)

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Company, User } from '@prisma/client'
import { z, ZodError } from 'zod'
import {
  addCompanyToBucket,
  getCompaniesByBucketId,
  getBucketsByCompanyId,
  removeCompanyFromBucket,
  checkCompanyBucketMembershipExistence
} from '@/api/db/services/companyBucketMembershipService'
import { createCompanySubscription, deleteCompanySubscription } from '@/api/db/services/companySubscriptionService'
import { getCompanyByID } from '@/api/db/services/companyService'
import { getBucketById } from '@/api/db/services/bucketService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import { withAuthValidation } from '@/api/middleware/auth'

// Input Validation Schema
const membershipSchema = z.object({
  bucketId: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
      message: 'Bucket ID must be a positive integer.'
    })
    .transform((val) => parseInt(val, 10)),
  companyId: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
      message: 'Company ID must be a positive integer.'
    })
    .transform((val) => parseInt(val, 10))
})

// Input Validation Schema
const membershipGetSchema = z.object({
  bucketId: z
    .string()
    .optional()
    .refine((val) => val === undefined || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0), {
      message: 'Bucket ID must be a positive integer.'
    })
    .transform((val) => (val === undefined ? undefined : parseInt(val, 10))),
  companyId: z
    .string()
    .optional()
    .refine((val) => val === undefined || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0), {
      message: 'Company ID must be a positive integer.'
    })
    .transform((val) => (val === undefined ? undefined : parseInt(val, 10)))
})
/**
 * @swagger
 * tags:
 *   - name: companyBucketRelation
 * /api/companyBucketRelation:
 *   get:
 *     tags:
 *       - companyBucketRelation
 *     summary: Retrieve companies or buckets based on a bucket or company ID
 *     description: Fetches companies for a given bucket ID or buckets for a given company ID.
 *     parameters:
 *       - in: query
 *         name: bucketId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: companyId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved companies or buckets.
 *       400:
 *         description: Invalid arguments.
 *       404:
 *         description: No Companies or Buckets found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     tags:
 *       - companyBucketRelation
 *     summary: Create a membership between a company and a bucket
 *     description: Adds a company to a bucket and subscribes the user to the company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bucketId
 *               - companyId
 *             properties:
 *               bucketId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Membership already exists.
 *       201:
 *         description: Successfully created a new membership and subscribed user to the company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyBucketMembership'
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Company or Bucket not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - companyBucketRelation
 *     summary: Remove a membership between a company and a bucket
 *     description: Removes a company from a bucket and unsubscribes the user from the company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bucketId
 *               - companyId
 *             properties:
 *               bucketId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Company removed from bucket successfully.
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Company or Bucket not found.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     CompanyBucketMembership:
 *       type: object
 *       required:
 *         - companyId
 *         - bucketId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         companyId:
 *           type: integer
 *         bucketId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id

  switch (method) {
    case 'GET':
      try {
        const { bucketId, companyId } = membershipGetSchema.parse(req.query)
        if (bucketId) {
          // check if the bucket exists
          await getBucketById(bucketId)

          const companies = await getCompaniesByBucketId(bucketId)
          if (companies) res.status(200).json(companies)
          else res.status(404).json({ error: 'No Companies found' })
        } else if (companyId) {
          // check if the company exists
          await getCompanyByID(companyId)

          const buckets = await getBucketsByCompanyId(companyId)
          if (buckets) res.status(200).json(buckets)
          else res.status(404).json({ error: 'No Buckets found' })
        } else res.status(400).json({ error: 'Invalid Arguments' })
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        if (!Array.isArray(req.body)) {
          res.status(400).json({ error: 'Invalid request format' })
          break
        }
        const results = await Promise.all(
          req.body.map(async ({ bucketId, companyId }) => {
            try {
              const parsedData = membershipSchema.parse({ bucketId, companyId })

              await getCompanyByID(parsedData.companyId)
              await getBucketById(parsedData.bucketId)

              const existingMembership = await checkCompanyBucketMembershipExistence(
                parsedData.bucketId,
                parsedData.companyId
              )
              if (existingMembership) return { existingMembership }

              const membership = await addCompanyToBucket(parsedData.companyId, parsedData.bucketId)
              await createCompanySubscription({ userId, companyId: parsedData.companyId })

              return { membership }
            } catch (error) {
              if (error instanceof ZodError) return { error: formatZodErrors(error) }
              else if (error instanceof ItemNotFoundError) return { error: error.message }
              else throw error
            }
          })
        )

        const errors = results.filter((result) => result.error)
        if (errors.length > 0) {
          res.status(400).json(errors)
        } else {
          const companies: Array<Company> = []
          const re = results.map((r) => r.membership || r.existingMembership)

          const companyIds = re.map((item) => item?.companyId).filter((id) => id !== undefined)

          for (const element of companyIds) {
            if (typeof element === 'number') {
              const company = await getCompanyByID(element)
              companies.push(company)
            }
          }
          res.status(201).json(companies)
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        const { bucketId, companyId } = req.query
        const companyIds = Array.isArray(companyId) ? companyId.map((company) => Number(company)) : [Number(companyId)]
        // check if the bucket exists
        await getBucketById(Number(bucketId))

        // check if the companies exist and remove them from the bucket and delete their subscriptions
        await Promise.all(
          companyIds.map(async (id) => {
            await getCompanyByID(id) // assuming this throws an error if the company doesn't exist
            await removeCompanyFromBucket(id, Number(bucketId))
            await deleteCompanySubscription(userId, id)
          })
        )

        res.status(200).json(companyIds)
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)

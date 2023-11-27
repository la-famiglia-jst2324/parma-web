import type { NextApiRequest, NextApiResponse } from 'next'

import companyBucketMembershipService from '@/api/services/companyBucketMembershipService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

const { addCompanyToBucket, getCompaniesByBucketId, getBucketsByCompanyId, removeCompanyFromBucket } =
  companyBucketMembershipService

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const bucketId = Number(req.query.bucketId)
  const companyId = Number(req.query.companyId)

  switch (method) {
    case 'GET':
      try {
        if (bucketId && companyId) res.status(400).json({ error: 'Invalid Arguments' })
        if (bucketId) {
          const companies = await getCompaniesByBucketId(bucketId)
          if (companies.length > 0) res.status(200).json(companies)
          else res.status(400).json({ error: 'No Companies found' })
        } else if (companyId) {
          const buckets = await getBucketsByCompanyId(companyId)
          if (buckets.length > 0) res.status(200).json(buckets)
          else res.status(400).json({ error: 'No Buckets found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const membership = await addCompanyToBucket(companyId, bucketId)
        res.status(200).json(membership)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        await removeCompanyFromBucket(companyId, bucketId)
        res.status(200).json({ message: 'Company Removed from Bucket Successfully' })
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

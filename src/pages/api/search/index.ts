import type { NextApiRequest, NextApiResponse } from 'next'
import { searchCompaniesAndBuckets } from '@/api/db/services/searchService'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { name, page, pageSize } = req.query
        const searchString: string = (name as string) ?? ''
        const pageNumber = Number(page) || 1
        const pageSizeNumber = Number(pageSize) || 10

        const result = await searchCompaniesAndBuckets(searchString, pageNumber, pageSizeNumber)
        res.status(200).json(result)
      } catch (error) {
        console.error('Error searching companies and buckets:', error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)

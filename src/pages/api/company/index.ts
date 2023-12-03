import type { NextApiRequest, NextApiResponse } from 'next'

import { createCompany, getAllCompanies } from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { page = 1, pageSize = 10 } = req.query

  switch (method) {
    case 'GET':
      try {
        // Gets a company
        const companies = await getAllCompanies(parseInt(page as string), parseInt(pageSize as string))
        if (companies) res.status(200).json(companies)
        else res.status(400).json({ error: 'No Companies found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new company
        const newCompany = await createCompany(req.body)
        if (newCompany) {
          res.status(201).json(newCompany)
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

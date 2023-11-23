import type { NextApiRequest, NextApiResponse } from 'next'

import companyService from '@/api/services/companyService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
const { createCompany, getAllCompanies } = companyService

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // Gets a company
        const companies = await getAllCompanies()
        if (companies.length > 0) res.status(200).json(companies)
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

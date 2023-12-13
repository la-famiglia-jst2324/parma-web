import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import {
  createCompany,
  getAllCompanies,
  getAllCompaniesWithoutPagi,
  getCompanyByName
} from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const companyName = req.query.name
  const { page, pageSize } = req.query

  switch (method) {
    case 'GET':
      try {
        // Gets a company
        if (companyName) {
          console.log(companyName)
          const company = await getCompanyByName(
            String(companyName),
            parseInt(page as string),
            parseInt(pageSize as string)
          )
          if (company) res.status(200).json(company)
          else res.status(400).json({ error: 'No Companies found' })
        } else if (page && pageSize) {
          const companies = await getAllCompanies(parseInt(page as string), parseInt(pageSize as string))
          if (companies) res.status(200).json(companies)
          else res.status(400).json({ error: 'No Companies found' })
        } else {
          const companies = await getAllCompaniesWithoutPagi()
          if (companies) res.status(200).json(companies)
          else res.status(400).json({ error: 'No Companies found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        // Create a new company
        const newCompany = await createCompany({ ...req.body, addedBy: userId })
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
export default withAuthValidation(handler)

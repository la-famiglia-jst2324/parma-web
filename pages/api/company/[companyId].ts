import type { NextApiRequest, NextApiResponse } from 'next'

import companyService from '@/api/services/companyService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
const { getCompanyByID, updateCompany, deleteCompany } = companyService

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { companyId } = req.query

  switch (method) {
    case 'GET':
      try {
        // get a single company
        const company = await getCompanyByID(Number(companyId))
        if (company) res.status(200).json(company)
        else res.status(400).json({ error: 'No Company found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingCompany = await getCompanyByID(Number(companyId))
        if (existingCompany) {
          // Update Company
          const updatedCompany = await updateCompany(Number(companyId), req.body)
          res.status(200).json(updatedCompany)
        } else res.status(404).json({ error: 'Company not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        const existingCompany = await getCompanyByID(Number(companyId))
        // delete a company
        if (existingCompany) {
          await deleteCompany(Number(companyId))
          res.status(200).json({ message: 'Company successfully Deleted' })
        } else {
          res.status(404).json({ error: 'Company not found' })
        }
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

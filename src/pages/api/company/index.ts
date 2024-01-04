import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import {
  createCompany,
  getAllCompanies,
  getAllCompaniesWithoutPagination,
  getCompanyByName
} from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
import { addCompanyDataSourceRelationshipForCompany } from '@/api/db/services/companyDataSourceService'
/**
 * @swagger
 * /api/company:
 *   get:
 *     summary: Retrieve companies or a specific company by name
 *     description: Fetches either a specific company by name or all companies. Supports optional pagination.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: The name of the company to retrieve. If provided, returns only the specified company.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *         description: The number of items per page for pagination.
 *     responses:
 *       200:
 *         description: Successfully retrieved company or companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: No Companies found.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal Server Error.
 *   post:
 *     summary: Create a new company
 *     description: Creates a new company with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - addedBy
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               addedBy:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created a new company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 */

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
          const companies = await getAllCompaniesWithoutPagination()
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
        // Create a new company.
        const newCompany = await createCompany({ ...req.body, addedBy: userId })
        // Register the new company in th company data source relationship.
        await addCompanyDataSourceRelationshipForCompany(newCompany.id)
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

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
/**
 * @swagger
 * tags:
 *   - name: company
 * /api/company:
 *   get:
 *     tags:
 *       - company
 *     summary: Retrieve companies or a specific company by name
 *     description: Fetches either a specific company by name or all companies. Supports optional pagination.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
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
 *       500:
 *         description: Internal Server Error.
 *   post:
 *     tags:
 *       - company
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
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - addedBy
 *         - description
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const companyName = req.query.name
  const { page, pageSize } = req.query

  switch (method) {
    case 'GET':
      try {
        let companies
        // Gets a company
        if (companyName) {
          companies = await getCompanyByName(
            String(companyName),
            parseInt(page as string),
            parseInt(pageSize as string)
          )
        } else if (page && pageSize) {
          companies = await getAllCompanies(parseInt(page as string), parseInt(pageSize as string))
        } else {
          companies = await getAllCompaniesWithoutPagination()
        }
        if (companies) res.status(200).json(companies)
        else res.status(400).json({ error: 'No Companies found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        // Create a new company.
        // New company data source relationships will be added for this company with all existing data sources.
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

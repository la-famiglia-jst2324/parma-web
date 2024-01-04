import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteCompany, getCompanyByID, updateCompany } from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/company/id:
 *   get:
 *     summary: Retrieve a company by ID
 *     description: Fetches details of a company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the company details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: No Company found for the provided ID.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     summary: Update a company
 *     description: Updates the details of an existing company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Successfully updated the company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     summary: Delete a company
 *     description: Deletes a company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company to delete.
 *     responses:
 *       200:
 *         description: Company successfully deleted.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - addedBy
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

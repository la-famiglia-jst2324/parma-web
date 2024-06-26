import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteCompany, getCompanyByID, updateCompany } from '@/api/db/services/companyService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/company/id:
 *   get:
 *     tags:
 *       - company
 *     summary: Retrieve a company by ID
 *     description: Fetches details of a company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
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
 *     tags:
 *       - company
 *     summary: Update a company
 *     description: Updates the details of an existing company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
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
 *     tags:
 *       - company
 *     summary: Delete a company
 *     description: Deletes a company based on the provided company ID.
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company successfully deleted.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal Server Error.
 *       405:
 *         description: Method Not Allowed.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { companyId } = req.query

  switch (method) {
    case 'GET':
      try {
        // get a single company
        const company = await getCompanyByID(Number(companyId))
        if (company) res.status(200).json(company)
        else res.status(404).json({ error: `No company with id: ${companyId} found` })
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
        } else res.status(204).json({ error: `No company with id: ${companyId} found` })
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
          res.status(204).json({ error: `No company with id: ${companyId} found` })
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

export default handler // No auth

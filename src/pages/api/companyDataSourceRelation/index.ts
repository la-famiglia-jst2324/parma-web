import type { NextApiRequest, NextApiResponse } from 'next'

import {
  createCompanyDataSource,
  deleteCompanyDataSource,
  getCompaniesByDataSourceId,
  getDataSourcesByCompanyId,
  updateCompanyDataSource
} from '@/api/db/services/companyDataSourceService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * tags:
 *   - name: companyDataSourceRelation
 * /api/companyDataSourceRelation:
 *   get:
 *     tags:
 *       - companyDataSourceRelation
 *     summary: Retrieve companies or data sources
 *     description: Fetches companies by a data source ID or data sources by a company ID. Only one ID should be provided at a time.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: companyId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved companies or data sources.
 *       400:
 *         description: Invalid arguments or no companies/data sources found.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     tags:
 *       - companyDataSourceRelation
 *     summary: Create a new company data source relationship
 *     description: Creates relation between a data source and a company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataSourceId
 *               - companyId
 *               - isDataSourceActive
 *               - healthStatus
 *             properties:
 *               isDataSourceActive:
 *                 type: boolean
 *               companyId:
 *                 type: integer
 *               dataSourceId:
 *                 type: integer
 *               healthStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created a new data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyDataSource'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - companyDataSourceRelation
 *     summary: Update a company data source
 *     description: Updates an existing data source for a company.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: true
 *         schema:
 *           type: integer
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
 *               isDataSourceActive:
 *                 type: boolean
 *               healthStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyDataSource'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - companyDataSourceRelation
 *     summary: Delete a company data source
 *     description: Deletes a data source for a company.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company data source deleted successfully.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     CompanyDataSource:
 *       type: object
 *       required:
 *         - dataSourceId
 *         - companyId
 *         - isDataSourceActive
 *         - healthStatus
 *       properties:
 *         dataSourceId:
 *           type: integer
 *         companyId:
 *           type: integer
 *         isDataSourceActive:
 *           type: boolean
 *         healthStatus:
 *           type: string
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const dataSourceId = Number(req.query.dataSourceId)
  const companyId = Number(req.query.companyId)

  switch (method) {
    case 'GET':
      try {
        if (dataSourceId && companyId) res.status(400).json({ error: 'Invalid Arguments' })
        if (dataSourceId) {
          const companies = await getCompaniesByDataSourceId(dataSourceId)
          if (companies.length > 0) res.status(200).json(companies)
          else res.status(400).json({ error: 'No Companies found' })
        } else if (companyId) {
          const buckets = await getDataSourcesByCompanyId(companyId)
          if (buckets.length > 0) res.status(200).json(buckets)
          else res.status(400).json({ error: 'No Buckets found' })
        } else res.status(400).json({ error: 'Invalid Arguments' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        const dataSource = await createCompanyDataSource(req.body)
        if (dataSource) res.status(200).json(dataSource)
        else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedData = await updateCompanyDataSource(companyId, dataSourceId, req.body)
        res.status(200).json(updatedData)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        await deleteCompanyDataSource(companyId, dataSourceId)
        res.status(200).json({ message: 'Company Data Source Deleted Successfully' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
  }
}

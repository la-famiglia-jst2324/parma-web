import type { NextApiRequest, NextApiResponse } from 'next'

import { ZodError, z } from 'zod'
import { Frequency, HealthStatus } from '@prisma/client'
import { deleteDataSource, getDataSourceByID, updateDataSource } from '@/api/db/services/dataSourceService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'

const updateDataSourceSchema = z.object({
  sourceName: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() !== '', { message: 'Source name cannot be empty.' }),
  isActive: z.boolean().optional(),
  healthStatus: z.nativeEnum(HealthStatus).optional(),
  frequency: z.nativeEnum(Frequency).optional(),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() !== '', { message: 'Description cannot be empty.' }),
  invocationEndpoint: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() !== '', { message: 'Invocation endpoint cannot be empty.' })
})

/**
 * @swagger
 * /api/dataSources/id:
 *   get:
 *     tags:
 *       - dataSource
 *     summary: Retrieve a data source by ID
 *     description: Fetches details of a specific data source based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: No Data Source found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - dataSource
 *     summary: Update a data source
 *     description: Updates the details of an existing data source based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
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
 *               sourceName:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               frequency:
 *                 type: string
 *               healthStatus:
 *                 type: string
 *               invocationEndpoint:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: Validation error or no Data Source found.
 *       404:
 *         description: Data Source not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - dataSource
 *     summary: Delete a data source
 *     description: Deletes a specific data source based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data Source successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { dataSourceId } = req.query

  switch (method) {
    case 'GET':
      try {
        const dataSource = await getDataSourceByID(Number(dataSourceId))
        if (dataSource) res.status(200).json(dataSource)
        else res.status(400).json({ error: 'No Data Source found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const parseResult = updateDataSourceSchema.parse(req.body)
        const existingDataSource = await getDataSourceByID(Number(dataSourceId))
        if (existingDataSource) {
          // Update Bucket
          const updatedBucket = await updateDataSource(Number(dataSourceId), parseResult)
          res.status(200).json(updatedBucket)
        } else res.status(400).json({ error: 'No Data Source found' })
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ errors: formatZodErrors(error) })
        else if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteDataSource(Number(dataSourceId))
        res.status(200).json({ message: 'Data Source successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

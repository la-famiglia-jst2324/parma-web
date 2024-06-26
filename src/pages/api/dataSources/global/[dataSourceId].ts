import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSourceByID, updateDataSource } from '@/api/db/services/dataSourceService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/dataSources/global/dataSourceId:
 *   put:
 *     tags:
 *       - dataSource
 *     summary: Update a data source
 *     description: Updates an existing data source based on the provided data source ID.
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
 *       404:
 *         description: data source not found.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { dataSourceId } = req.query
  switch (method) {
    case 'PUT':
      try {
        const existingDataSource = await getDataSourceByID(Number(dataSourceId))
        if (existingDataSource) {
          const updatedDataSource = await updateDataSource(Number(dataSourceId), req.body)
          res.status(200).json(updatedDataSource)
        } else {
          res.status(404).json({ error: 'data source not found' })
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

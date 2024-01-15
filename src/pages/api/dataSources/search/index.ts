import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataSourceByName } from '@/api/db/services/dataSourceService'
/**
 * @swagger
 * tags:
 *   - name: dataSourceSearching
 * /api/dataSources/search:
 *   get:
 *     tags:
 *       - dataSourceSearching
 *     summary: Retrieve data sources by name
 *     description: Fetches data sources based on a provided name.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved data sources.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: No data sources found for the provided name.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const name = req.query.name

  switch (method) {
    case 'GET':
      try {
        const datasources = await getDataSourceByName(String(name))
        if (datasources) res.status(200).json(datasources)
        else res.status(400).json({ error: 'No data sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

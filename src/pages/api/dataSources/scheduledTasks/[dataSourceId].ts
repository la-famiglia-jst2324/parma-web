import type { NextApiRequest, NextApiResponse } from 'next'
import { getScheduledTaskByDatasourceID } from '@/api/db/services/scheduledTaskService'
/**
 * @swagger
 * /api/dataSources/scheduledTasks/dataSourceId:
 *   get:
 *     summary: Retrieve a scheduled task by data source ID
 *     description: Fetches details of a scheduled task associated with a specific data source based on the provided data source ID.
 *     parameters:
 *       - in: query
 *         name: dataSourceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the scheduled task for the data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduledTask'
 *       400:
 *         description: No Data Source found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     ScheduledTask:
 *       type: object
 *       required:
 *         - taskId
 *         - dataSourceId
 *         - scheduleType
 *         - scheduledAt
 *         - maxRunSeconds
 *         - status
 *         - attempts
 *       properties:
 *         taskId:
 *           type: integer
 *         dataSourceId:
 *           type: integer
 *         scheduleType:
 *           type: string
 *         scheduledAt:
 *           type: string
 *         maxRunSeconds:
 *           type: string
 *         status:
 *           type: string
 *         attempts:
 *           type: integer
 *         startedAt:
 *           type: string
 *         endedAt:
 *           type: string
 *         resultSummary:
 *           type: string
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { dataSourceId } = req.query

  switch (method) {
    case 'GET':
      try {
        const dataSource = await getScheduledTaskByDatasourceID(Number(dataSourceId))
        if (dataSource) res.status(200).json(dataSource)
        else res.status(400).json({ error: 'No Data Source found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

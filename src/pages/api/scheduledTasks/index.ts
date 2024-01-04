import type { NextApiRequest, NextApiResponse } from 'next'
import { createScheduledTask, getAllScheduledTasks } from '@/api/db/services/scheduledTaskService'
/**
 * @swagger
 * /api/scheduledTasks:
 *   post:
 *     summary: Create a new scheduled task
 *     description: Creates a new scheduled task with the details provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - schedule
 *               # Include other required fields here
 *             properties:
 *               name:
 *                 type: string
 *               schedule:
 *                 type: string
 *               # Define other properties of the scheduled task here
 *     responses:
 *       201:
 *         description: Successfully created a new scheduled task.
 *       500:
 *         description: Internal Server Error.
 *
 *   get:
 *     summary: Retrieve all scheduled tasks
 *     description: Fetches a paginated list of all scheduled tasks.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of scheduled tasks.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const task = await createScheduledTask(req.body)
        res.status(201).json(task)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'GET':
      try {
        const page = Number(req.query.page) || 1
        const pageSize = Number(req.query.pageSize) || 10
        const tasks = await getAllScheduledTasks(page, pageSize)
        res.status(200).json(tasks)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { getScheduledTaskByID, updateScheduledTask, deleteScheduledTask } from '@/api/db/services/scheduledTaskService'
/**
 * @swagger
 * /api/scheduledTasks/taskId:
 *   get:
 *     tags:
 *       - scheduledTask
 *     summary: Retrieve a scheduled task by ID
 *     description: Fetches details of a specific scheduled task based on the provided task ID.
 *     parameters:
 *       - in: query
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the scheduled task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduledTask'
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - scheduledTask
 *     summary: Update a scheduled task
 *     description: Updates the details of an existing scheduled task based on the provided task ID.
 *     parameters:
 *       - in: query
 *         name: taskId
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
 *               dataSourceId:
 *                 type: integer
 *               scheduleType:
 *                 type: string
 *                 enum:
 *                   - ON_DEMAND
 *                   - REGULAR
 *               resultSummary:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - PROCESSING
 *                   - SUCCESS
 *                   - FAILED
 *               attempts:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the scheduled task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduledTask'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - scheduledTask
 *     summary: Delete a scheduled task
 *     description: Deletes a specific scheduled task based on the provided task ID.
 *     parameters:
 *       - in: query
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { taskId } = req.query

  switch (method) {
    case 'GET':
      try {
        const task = await getScheduledTaskByID(Number(taskId))
        if (task) res.status(200).json(task)
        else res.status(404).json({ error: 'Task not found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const updatedTask = await updateScheduledTask(Number(taskId), req.body)
        res.status(200).json(updatedTask)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteScheduledTask(Number(taskId))
        res.status(200).json({ message: 'Task successfully deleted' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default handler // No auth

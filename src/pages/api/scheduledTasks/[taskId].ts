import type { NextApiRequest, NextApiResponse } from 'next'
import { getScheduledTaskByID, updateScheduledTask, deleteScheduledTask } from '@/api/db/services/scheduledTaskService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

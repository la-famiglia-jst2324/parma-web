import type { NextApiRequest, NextApiResponse } from 'next'
import { createScheduledTask, getAllScheduledTasks } from '@/api/db/services/scheduledTasksService'

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

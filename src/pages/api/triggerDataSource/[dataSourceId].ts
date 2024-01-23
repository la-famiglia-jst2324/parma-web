import type { NextApiRequest, NextApiResponse } from 'next'
import { ScheduleType, TaskStatus } from '@prisma/client'
import { getDataSourceByID } from '@/api/db/services/dataSourceService'
import { withAuthValidation } from '@/api/middleware/auth'
import { createScheduledTask } from '@/api/db/services/scheduledTaskService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { dataSourceId } = req.query

  /**
   * Schedules an on-demand task for data source with Id
   * @param dataSourceId
   * @returns
   */
  const scheduleTask = async (dataSourceId: number) => {
    // Schedule an on-demand task.
    return createScheduledTask({
      dataSourceId,
      scheduleType: ScheduleType.ON_DEMAND,
      status: TaskStatus.PENDING
    })
  }

  /**
   * Calls the /schedule endpoint in parma analytics
   * @returns the /schedule endpoint's response
   */
  const triggerScheduledTasks = async () => {
    let analyticsUrl = process.env.PARMA_ANALYTICS_BASE_URL
    if (!analyticsUrl) {
      throw new Error('PARMA_ANALYTICS_URL is not defined in the environment.')
    }
    analyticsUrl = analyticsUrl.endsWith('/') ? analyticsUrl.slice(0, -1) : analyticsUrl
    const scheduleURL = new URL('/schedule', analyticsUrl)
    const response = await fetch(scheduleURL.toString())

    if (response.ok && response.status !== 204) {
      return response
    } else {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }

  switch (method) {
    case 'POST':
      try {
        const dataSource = await getDataSourceByID(Number(dataSourceId))
        await scheduleTask(dataSource.id)
        const data = await triggerScheduledTasks()
        res.status(200).json(data)
      } catch (error) {
        if (error instanceof ItemNotFoundError)
          res.status(404).json({ error: `No data source with id: ${dataSourceId}  found` })
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
export default withAuthValidation(handler)

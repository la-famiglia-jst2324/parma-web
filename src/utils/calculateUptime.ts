import type { ScheduledTasks } from '@prisma/client'
import { TaskStatus } from '@prisma/client'

function calculateUptime(scheduledTasks: ScheduledTasks[]) {
  let totalDuration = 0
  let successfulDuration = 0

  scheduledTasks.forEach((task) => {
    const start = new Date(task.startedAt)
    const end = task.endedAt ? new Date(task.endedAt) : new Date()

    // Calculate duration in milliseconds
    const taskDuration = end.getTime() - start.getTime()

    totalDuration += taskDuration
    if (task.status === TaskStatus.SUCCESS) {
      successfulDuration += taskDuration
    }
  })

  // Avoid division by zero
  if (totalDuration === 0) return 0

  // Convert milliseconds to a more understandable unit (like hours) if needed
  const uptime = (successfulDuration / totalDuration) * 100

  // Limit the result to at most 2 decimal places
  return parseFloat(uptime.toFixed(2))
}

export default calculateUptime

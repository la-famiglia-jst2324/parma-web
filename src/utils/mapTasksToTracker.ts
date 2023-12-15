import { TaskStatus } from '@prisma/client'
import type { ScheduledTask } from '@prisma/client'

enum Color {
  Gray = 'gray',
  Yellow = 'yellow',
  Emerald = 'emerald',
  Red = 'red'
}

interface Tracker {
  color: Color
  tooltip: string
}

const mapTasksToTracker = (tasks: ScheduledTask[]): Tracker[] => {
  return tasks.map((task) => {
    let color: Color
    let tooltip: string

    switch (task.status) {
      case TaskStatus.PENDING:
        color = Color.Gray
        tooltip = `Task ${task.taskId}: Pending`
        break
      case TaskStatus.PROCESSING:
        color = Color.Yellow
        tooltip = `Task ${task.taskId}: Processing`
        break
      case TaskStatus.SUCCESS:
        color = Color.Emerald
        tooltip = `Task ${task.taskId}: Operational`
        break
      case TaskStatus.FAILED:
        color = Color.Red
        tooltip = `Task ${task.taskId}: Failure`
        break
      default:
        color = Color.Gray
        tooltip = `Task ${task.taskId}: Unknown Status`
    }

    return { color, tooltip }
  })
}

export default mapTasksToTracker

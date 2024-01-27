import { PrismaClient, ScheduleType, TaskStatus } from '@prisma/client'
import { createDataSource, deleteDataSource } from '../models/utils/helperFunctions'
import {
  createScheduledTask,
  getScheduledTaskByID,
  getAllScheduledTasks,
  updateScheduledTask,
  deleteScheduledTask,
  deleteFutureScheduledTasks
} from '@/api/db/services/scheduledTaskService'

const prisma = new PrismaClient()

describe('ScheduledTasks Service Tests', () => {
  let taskId: number
  let dataSourceId: number

  beforeAll(async () => {
    dataSourceId = (await createDataSource()).id
    await prisma.$connect()
  })

  afterAll(async () => {
    // Delete all scheduled tasks associated with the dataSourceId
    await prisma.scheduledTask.deleteMany({
      where: { dataSourceId }
    })
    await deleteDataSource(dataSourceId)
    await prisma.$disconnect()
  })

  test('Create a new scheduled task with valid details', async () => {
    const task = await createScheduledTask({
      dataSourceId,
      scheduleType: ScheduleType.ON_DEMAND,
      resultSummary: 'Test task',
      status: TaskStatus.PENDING,
      attempts: 0
    })
    taskId = task.taskId

    expect(task).toHaveProperty('taskId')
    expect(task.dataSourceId).toBe(dataSourceId)
    expect(task.scheduleType).toBe(ScheduleType.ON_DEMAND)
    expect(task.resultSummary).toBe('Test task')
    expect(task.status).toBe(TaskStatus.PENDING)
    expect(task.attempts).toBe(0)
  })

  test('Retrieve a scheduled task by ID', async () => {
    const task = await getScheduledTaskByID(taskId)

    expect(task).toBeTruthy()
    expect(task?.taskId).toBe(taskId)
  })

  test('Retrieve all scheduled tasks', async () => {
    const tasks = await getAllScheduledTasks(1, 10)

    expect(tasks).toBeTruthy()
    expect(tasks.scheduledTasks.length).toBeGreaterThan(0)
  })

  test('Update a scheduled task', async () => {
    const updatedTask = await updateScheduledTask(taskId, {
      status: TaskStatus.SUCCESS
    })

    expect(updatedTask.status).toBe(TaskStatus.SUCCESS)
  })

  test('Delete a scheduled task', async () => {
    await deleteScheduledTask(taskId)
    const deletedTask = await prisma.scheduledTask.findUnique({
      where: { taskId }
    })
    expect(deletedTask).toBeNull()
  })

  test('deleteFutureScheduledTasks behaves correctly', async () => {
    const now = new Date()

    const tasksToCreate = [
      { scheduleType: ScheduleType.ON_DEMAND, timeOffset: 10 * 60000 }, // 10 minutes in the future
      { scheduleType: ScheduleType.REGULAR, timeOffset: 10 * 60000 }, // 10 minutes in the future
      { scheduleType: ScheduleType.ON_DEMAND, timeOffset: 3 * 60000 }, // 3 minutes in the future
      { scheduleType: ScheduleType.REGULAR, timeOffset: 3 * 60000 }, // 3 minutes in the future
      { scheduleType: ScheduleType.ON_DEMAND, timeOffset: -5 * 60000 }, // 5 minutes in the past
      { scheduleType: ScheduleType.REGULAR, timeOffset: -5 * 60000 } // 5 minutes in the past
    ]

    for (const task of tasksToCreate) {
      const createdTask = await createScheduledTask({
        dataSourceId,
        scheduleType: task.scheduleType,
        status: TaskStatus.PENDING
      })

      await prisma.scheduledTask.update({
        where: { taskId: createdTask.taskId },
        data: { scheduledAt: new Date(Date.now() + task.timeOffset) }
      })
    }

    await deleteFutureScheduledTasks(dataSourceId)

    const remainingTasks = await prisma.scheduledTask.findMany({
      where: { dataSourceId }
    })

    expect(remainingTasks.length).toBe(4)
    remainingTasks.forEach((task) => {
      expect(task.scheduledAt.getTime()).toBeLessThanOrEqual(now.getTime() + 5 * 60000)
    })
  })
})

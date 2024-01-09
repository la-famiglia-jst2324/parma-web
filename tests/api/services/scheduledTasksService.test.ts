import { PrismaClient, ScheduleType, TaskStatus } from '@prisma/client'
import { createDataSource, deleteDataSource } from '../models/utils/helperFunctions'
import {
  createScheduledTask,
  getScheduledTaskByID,
  getAllScheduledTasks,
  updateScheduledTask,
  deleteScheduledTask
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
})

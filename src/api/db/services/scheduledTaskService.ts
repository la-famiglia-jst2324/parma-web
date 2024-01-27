import type { ScheduleType, TaskStatus } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createScheduledTask = async (data: {
  dataSourceId: number
  scheduleType: ScheduleType
  resultSummary?: string
  status: TaskStatus
  attempts?: number
}) => {
  try {
    return await prisma.scheduledTask.create({
      data: {
        dataSourceId: data.dataSourceId,
        scheduleType: data.scheduleType,
        resultSummary: data.resultSummary,
        status: data.status,
        attempts: data.attempts
      }
    })
  } catch (error) {
    console.error('Error creating scheduled task:', error)
    throw new Error('Unable to create scheduled task')
  }
}

const getScheduledTaskByID = async (taskId: number) => {
  try {
    const scheduledTask = await prisma.scheduledTask.findUnique({
      where: { taskId }
    })
    if (!scheduledTask) {
      throw new Error(`Scheduled task with ID ${taskId} not found.`)
    }
    return scheduledTask
  } catch (error) {
    console.error('Error getting a scheduled task by ID:', error)
    throw error
  }
}

const getScheduledTaskByDatasourceID = async (dataSourceId: number) => {
  try {
    const scheduledTasks = await prisma.scheduledTask.findMany({
      where: { dataSourceId }
    })
    if (!scheduledTasks) {
      throw new Error(`Scheduled task with ID ${dataSourceId} not found.`)
    }
    return scheduledTasks
  } catch (error) {
    console.error('Error getting a scheduled task by ID:', error)
    throw error
  }
}

const getAllScheduledTasks = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const scheduledTasks = await prisma.scheduledTask.findMany({
      skip,
      take: pageSize
    })
    const totalCount = await prisma.scheduledTask.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      scheduledTasks,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error fetching all scheduled tasks:', error)
    throw error
  }
}

const updateScheduledTask = async (
  taskId: number,
  data: {
    dataSourceId?: number
    scheduleType?: ScheduleType
    resultSummary?: string
    status?: TaskStatus
    attempts?: number
  }
) => {
  return await prisma.scheduledTask.update({
    where: { taskId },
    data: {
      ...data
    }
  })
}

const deleteScheduledTask = async (taskId: number) => {
  try {
    return await prisma.scheduledTask.delete({
      where: { taskId }
    })
  } catch (error) {
    console.error('Error deleting scheduled task:', error)
    throw error
  }
}

const deleteFutureScheduledTasks = async (dataSourceId: number) => {
  try {
    await prisma.scheduledTask.deleteMany({
      where: {
        dataSourceId,
        scheduledAt: {
          gt: new Date()
        }
      }
    })
  } catch (error) {
    console.error('Error deleting future scheduled tasks:', error)
    throw error
  }
}

export {
  createScheduledTask,
  getScheduledTaskByID,
  getAllScheduledTasks,
  updateScheduledTask,
  deleteScheduledTask,
  getScheduledTaskByDatasourceID,
  deleteFutureScheduledTasks
}

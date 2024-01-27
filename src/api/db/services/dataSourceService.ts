import type { Frequency, HealthStatus } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { deleteFutureScheduledTasks } from '@/api/db/services/scheduledTaskService'

const createDataSource = async (data: {
  sourceName: string
  isActive: boolean
  frequency: Frequency
  healthStatus: HealthStatus
  description?: string
  invocationEndpoint: string
}) => {
  try {
    return await prisma.dataSource.create({
      data: {
        sourceName: data.sourceName,
        isActive: data.isActive,
        frequency: data.frequency,
        healthStatus: data.healthStatus,
        description: data.description,
        invocationEndpoint: data.invocationEndpoint
      }
    })
  } catch (error) {
    console.error('Error creating data source:', error)
    throw new Error('Unable to create data source')
  }
}

const getDataSourceByID = async (id: number) => {
  try {
    const datasource = await prisma.dataSource.findUnique({
      where: { id }
    })
    if (!datasource) {
      throw new ItemNotFoundError(`Data source with ID ${id} not found.`)
    }
    return datasource
  } catch (error) {
    console.error('Error getting a data source by ID:', error)
    throw error
  }
}

const getDataSourceByName = async (sourceName: string) => {
  try {
    const datasource = await prisma.dataSource.findMany({
      where: { sourceName }
    })
    if (!datasource) {
      throw new Error(`DataSource with name ${sourceName} not found.`)
    }
    return datasource
  } catch (error) {
    console.error('Error finding data source by name:', error)
    throw error
  }
}

const getAllDataSources = async (page: number, pageSize: number, name: string) => {
  try {
    let datasources
    if (!page || !pageSize) {
      datasources = await prisma.dataSource.findMany({
        where: {
          sourceName: {
            contains: name,
            mode: 'insensitive' // case-insensitive
          }
        }
      })
    } else
      datasources = await prisma.dataSource.findMany({
        where: {
          sourceName: {
            contains: name,
            mode: 'insensitive' // case-insensitive
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
    const totalCount = await prisma.dataSource.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      datasources,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error getting all data sources:', error)
    throw error
  }
}

const updateDataSource = async (
  id: number,
  data: {
    sourceName?: string
    isActive?: boolean
    healthStatus?: HealthStatus
    frequency?: Frequency
    description?: string
    invocationEndpoint?: string
  }
) => {
  try {
    if (data.frequency) {
      await handleDataSourceFrequencyUpdate(id, data.frequency)
    }

    return await prisma.dataSource.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating data source:', error)
    throw error
  }
}

async function handleDataSourceFrequencyUpdate(
  dataSourceId: number,
  updatedFrequency: Frequency | undefined
): Promise<void> {
  // Check if frequency is updated
  if (!updatedFrequency) {
    return
  }

  const existingDataSource = await getDataSourceByID(dataSourceId)
  if (!existingDataSource) {
    throw new Error('Data source not found')
  }

  // Check if new frequency is different from the current value
  if (updatedFrequency !== existingDataSource.frequency) {
    // If so, delete all future scheduled tasks
    await deleteFutureScheduledTasks(dataSourceId)
  }
}

const deleteDataSource = async (id: number) => {
  try {
    const datasource = await prisma.dataSource.delete({
      where: { id }
    })
    return datasource
  } catch (error) {
    console.error('Error deleting data source:', error)
    throw error
  }
}

export {
  createDataSource,
  getDataSourceByID,
  getDataSourceByName,
  getAllDataSources,
  updateDataSource,
  deleteDataSource
}

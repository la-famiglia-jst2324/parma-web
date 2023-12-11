import type { Frequency, HealthStatus } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createDataSource = async (data: {
  sourceName: string
  isActive: boolean
  defaultFrequency: Frequency
  healthStatus: HealthStatus
  description?: string
  invocationEndpoint: string
}) => {
  try {
    return await prisma.dataSource.create({
      data: {
        sourceName: data.sourceName,
        isActive: data.isActive,
        defaultFrequency: data.defaultFrequency,
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
      throw new Error(`Data source with ID ${id} not found.`)
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
    const datasources = await prisma.dataSource.findMany({
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
    defaultFrequency?: Frequency
    description?: string
    invocationEndpoint?: string
  }
) => {
  try {
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

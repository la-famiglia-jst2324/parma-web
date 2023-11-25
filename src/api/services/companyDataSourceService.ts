import type { HealthStatus } from '@prisma/client'
import { prisma } from '../prismaClient'
// FR-04 Users add/edit/remove data sources for a company
// add Datasource To Company
const createCompanyDataSource = async (data: {
  dataSourceId: number
  companyId: number
  isDataSourceActive: boolean
  healthStatus: HealthStatus
}) => {
  try {
    // check if the data source already in the company
    const existingMembership = await prisma.companyDataSource.findUnique({
      where: {
        dataSourceId_companyId: {
          dataSourceId: data.dataSourceId,
          companyId: data.companyId
        }
      }
    })
    if (existingMembership) {
      throw new Error(`The data source is already in this company.`)
    }
    const membership = await prisma.companyDataSource.create({
      data: {
        dataSourceId: data.dataSourceId,
        companyId: data.companyId,
        isDataSourceActive: data.isDataSourceActive,
        healthStatus: data.healthStatus
      }
    })
    return membership
  } catch (error) {
    console.error('Error adding a data source to company:', error)
    throw error
  }
}

const getDataSourcesByCompanyId = async (companyId: number) => {
  try {
    const membership = await prisma.companyDataSource.findMany({
      where: {
        companyId
      },
      include: {
        dataSources: true
      }
    })
    if (membership) {
      // list data sources
      return membership.map((membership) => membership.dataSources)
    } else {
      throw new Error(`company${companyId} does not have any data sources.`)
    }
  } catch (error) {
    console.error('Error getting data sources in this company:', error)
    throw error
  }
}

// maybe dont need
const getCompaniesByDataSourceId = async (datasourceId: number) => {
  try {
    const membership = await prisma.companyDataSource.findMany({
      where: {
        dataSourceId: datasourceId
      },
      include: {
        companies: true
      }
    })
    if (membership) {
      // list all company
      return membership.map((membership) => membership.companies)
    } else {
      throw new Error(`the data source${datasourceId} does not have any company.`)
    }
  } catch (error) {
    console.error('Error retrieving companies from data source:', error)
    throw error
  }
}

const updateCompanyDataSource = async (
  dataSourceId: number,
  companyId: number,
  updateData: {
    isDataSourceActive?: boolean
    healthStatus?: HealthStatus
  }
) => {
  try {
    return await prisma.companyDataSource.update({
      where: {
        dataSourceId_companyId: {
          dataSourceId,
          companyId
        }
      },
      data: {
        ...updateData
      }
    })
  } catch (error) {
    console.error('Error updating company data source:', error)
    throw new Error('Unable to update company data source')
  }
}

// remove Datasource from Company
const deleteCompanyDataSource = async (companyId: number, datasourceId: number) => {
  try {
    const membership = await prisma.companyDataSource.delete({
      where: {
        dataSourceId_companyId: {
          companyId,
          dataSourceId: datasourceId
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error deleting data source from the company:', error)
    throw error
  }
}

export default {
  createCompanyDataSource,
  getDataSourcesByCompanyId,
  getCompaniesByDataSourceId,
  updateCompanyDataSource,
  deleteCompanyDataSource
}

import type { HealthStatus } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
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
    if (!membership) {
      throw new Error(`company${companyId} does not have any data sources.`)
    }
    // list data sources
    return membership.map((membership) => membership.dataSources)
  } catch (error) {
    console.error('Error getting data sources in this company:', error)
    throw error
  }
}

// maybe dont need
const getCompaniesByDataSourceId = async (dataSourceId: number) => {
  try {
    const membership = await prisma.companyDataSource.findMany({
      where: {
        dataSourceId
      },
      include: {
        companies: true
      }
    })
    if (!membership) {
      throw new Error(`the data source${dataSourceId} does not have any company.`)
    }
    // list all company
    return membership.map((membership) => membership.companies)
  } catch (error) {
    console.error('Error retrieving companies from data source:', error)
    throw error
  }
}

const updateCompanyDataSource = async (
  companyId: number,
  dataSourceId: number,
  updateData: {
    isDataSourceActive?: boolean
    healthStatus?: HealthStatus
  }
) => {
  try {
    console.log(updateData)
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
const deleteCompanyDataSource = async (companyId: number, dataSourceId: number) => {
  try {
    const membership = await prisma.companyDataSource.delete({
      where: {
        dataSourceId_companyId: {
          dataSourceId,
          companyId
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error deleting data source from the company:', error)
    throw error
  }
}

/**
 * Adds new companyDataSource relationship entries for the given company id with all the existing data sources.
 * @param companyId
 */
const addCompanyDataSourceRelationshipForCompany = async (companyId: number) => {
  try {
    // Get all data sources
    const dataSources = await prisma.dataSource.findMany()

    // For each data source, add a new entry in companyDataSource
    for (const dataSource of dataSources) {
      await prisma.companyDataSource.create({
        data: {
          companyId,
          dataSourceId: dataSource.id,
          isDataSourceActive: true,
          healthStatus: 'UP'
        }
      })
    }
  } catch (error) {
    console.error('Error getting all data sources:', error)
    throw error
  }
}

/**
 * Adds new companyDataSource relationship entries for the given datasource id with all the existing companies.
 * @param datasourceId
 */
const addCompanyDataSourceRelationshipForDatasource = async (datasourceId: number) => {
  try {
    // Get all companies
    const companies = await prisma.company.findMany()

    // For each company, add a new entry in companyDataSource
    for (const company of companies) {
      await prisma.companyDataSource.create({
        data: {
          companyId: company.id,
          dataSourceId: datasourceId,
          isDataSourceActive: true,
          healthStatus: 'UP'
        }
      })
    }
  } catch (error) {
    console.error('Error getting all the companies:', error)
    throw error
  }
}

export {
  createCompanyDataSource,
  getDataSourcesByCompanyId,
  getCompaniesByDataSourceId,
  updateCompanyDataSource,
  deleteCompanyDataSource,
  addCompanyDataSourceRelationshipForCompany,
  addCompanyDataSourceRelationshipForDatasource
}

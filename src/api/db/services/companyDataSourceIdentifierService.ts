import type { IdentifierType } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

const createCompanyDataSourceIdentifier = async (data: {
  companyDataSourceId: number
  identifierType: IdentifierType
  property: string
  value: string
  validity: Date
}) => {
  try {
    return await prisma.companyDataSourceIdentifier.create({
      data
    })
  } catch (error) {
    console.error('Error creating company data source identifier:', error)
    throw new Error('Unable to create company data source identifier')
  }
}

const getAllCompanyDataSourceIdentifiers = async (page: number, pageSize: number) => {
  try {
    const totalCount = await prisma.companyDataSourceIdentifier.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    const identifiers = await prisma.companyDataSourceIdentifier.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return {
      data: identifiers,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error retrieving all company data source identifiers:', error)
    throw new Error('Unable to retrieve all company data source identifiers')
  }
}

const getCompanyDataSourceIdentifierById = async (id: number) => {
  try {
    const identifier = await prisma.companyDataSourceIdentifier.findUnique({
      where: { id }
    })
    if (!identifier) {
      throw new Error(`CompanyDataSourceIdentifier with ID ${id} not found`)
    }
    return identifier
  } catch (error) {
    console.error('Error retrieving company data source identifier:', error)
    throw new Error('Unable to retrieve company data source identifier')
  }
}

const getCompanyDataSourceIdentifiersByDataSourceId = async (companyDataSourceId: number) => {
  try {
    const identifiers = await prisma.companyDataSourceIdentifier.findMany({
      where: { companyDataSourceId }
    })
    if (!identifiers || identifiers.length === 0) {
      throw new ItemNotFoundError(
        `CompanyDataSourceIdentifier with companyDataSourceId ${companyDataSourceId} not found`
      )
    }
    return identifiers
  } catch (error) {
    console.error('Error retrieving company data source identifiers:', error)
    throw new ItemNotFoundError('Unable to retrieve company data source identifiers')
  }
}

const updateCompanyDataSourceIdentifier = async (
  id: number,
  data: {
    companyDataSourceId?: number
    identifierType?: IdentifierType
    property?: string
    value?: string
    validity?: Date
  }
) => {
  try {
    return await prisma.companyDataSourceIdentifier.update({
      where: { id },
      data
    })
  } catch (error) {
    console.error('Error updating company data source identifier:', error)
    throw new Error('Unable to update company data source identifier')
  }
}

const deleteCompanyDataSourceIdentifier = async (id: number) => {
  try {
    return await prisma.companyDataSourceIdentifier.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting company data source identifier:', error)
    throw new Error('Unable to delete company data source identifier')
  }
}

export {
  createCompanyDataSourceIdentifier,
  getCompanyDataSourceIdentifierById,
  updateCompanyDataSourceIdentifier,
  deleteCompanyDataSourceIdentifier,
  getCompanyDataSourceIdentifiersByDataSourceId,
  getAllCompanyDataSourceIdentifiers
}

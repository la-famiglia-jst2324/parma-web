import { prisma } from '../prisma/prismaClient'

const createCompanySourceMeasurement = async (data: { sourceMeasurementId: number; companyId: number }) => {
  try {
    return await prisma.companySourceMeasurement.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
        companyId: data.companyId
      }
    })
  } catch (error) {
    console.error('Error creating company source measurement:', error)
    throw new Error('Unable to create company source measurement')
  }
}

const getCompanySourceMeasurementByID = async (id: number) => {
  try {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findUnique({
      where: { companyMeasurementId: id }
    })
    if (!companySourceMeasurement) {
      throw new Error(`Company source measurement with ID ${id} not found.`)
    }
    return companySourceMeasurement
  } catch (error) {
    console.error('Error getting a company source measurement by ID:', error)
    throw error
  }
}

const getValueByMeasurementIdCompanyId = async (sourceMeasurementId: number, companyIds: number[]) => {
  try {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findMany({
      where: {
        sourceMeasurementId,
        companyId: companyIds ? { in: companyIds } : undefined
      },
      include: {
        sourceMeasurement: true,
        company: true,
        measurementIntValues: true,
        measurementFloatValues: true
      }
    })
    if (!companySourceMeasurement) {
      throw new Error(`Company source measurement relation not found.`)
    }
    return companySourceMeasurement
  } catch (error) {
    console.error('Error getting a company source measurement by ID:', error)
    throw error
  }
}

const getAllCompanySourceMeasurements = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const companySourceMeasurements = await prisma.companySourceMeasurement.findMany({
      skip,
      take: pageSize
    })
    const totalCount = await prisma.companySourceMeasurement.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      companySourceMeasurements,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error fetching all company source measurements:', error)
    throw error
  }
}

const updateCompanySourceMeasurement = async (
  id: number,
  data: {
    sourceMeasurementId?: number
    companyId?: number
  }
) => {
  return await prisma.companySourceMeasurement.update({
    where: { companyMeasurementId: id },
    data: {
      ...data
    }
  })
}

const deleteCompanySourceMeasurement = async (id: number) => {
  try {
    return await prisma.companySourceMeasurement.delete({
      where: { companyMeasurementId: id }
    })
  } catch (error) {
    console.error('Error deleting company source measurement:', error)
    throw error
  }
}

export {
  createCompanySourceMeasurement,
  getCompanySourceMeasurementByID,
  getValueByMeasurementIdCompanyId,
  getAllCompanySourceMeasurements,
  updateCompanySourceMeasurement,
  deleteCompanySourceMeasurement
}

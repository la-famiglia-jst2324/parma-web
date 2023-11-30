import { prisma } from '../prismaClient'

const createSourceMeasurement = async (data: {
  sourceModuleId: number
  type: string
  companyId: number
  measurementName: string
}) => {
  try {
    return await prisma.sourceMeasurement.create({
      data: {
        sourceModuleId: data.sourceModuleId,
        type: data.type,
        companyId: data.companyId,
        measurementName: data.measurementName
      }
    })
  } catch (error) {
    console.error('Error creating a source measurement:', error)
    throw new Error('Unable to create a source measurement')
  }
}

const getSourceMeasurementByID = async (id: number) => {
  try {
    const measurement = await prisma.sourceMeasurement.findUnique({
      where: { id }
    })
    if (!measurement) {
      throw new Error(`source measurement with ID ${id} not found.`)
    }
    return measurement
  } catch (error) {
    console.error('Error getting the source measurement by ID:', error)
    throw error
  }
}

const getAllSourceMeasurements = async () => {
  try {
    const measurements = await prisma.sourceMeasurement.findMany()
    return measurements
  } catch (error) {
    console.error('Error fetching all source measurements:', error)
    throw error
  }
}

const updateSourceMeasurement = async (
  id: number,
  data: {
    sourceModuleId?: number
    type?: string
    companyId?: number
    measurementName?: string
  }
) => {
  try {
    return await prisma.sourceMeasurement.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating source measurement:', error)
    throw error
  }
}

const deleteSourceMeasurement = async (id: number) => {
  try {
    const measurement = await prisma.sourceMeasurement.delete({
      where: { id }
    })
    return measurement
  } catch (error) {
    console.error('Error deleting measurement:', error)
    throw error
  }
}

export {
  createSourceMeasurement,
  getSourceMeasurementByID,
  getAllSourceMeasurements,
  updateSourceMeasurement,
  deleteSourceMeasurement
}

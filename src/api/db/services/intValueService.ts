import { prisma } from '../prisma/prismaClient'

const createIntValue = async (data: { companyMeasurementId: number; value: number }) => {
  try {
    return await prisma.measurementIntValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value
      }
    })
  } catch (error) {
    console.error('Error creating int measurement value:', error)
    throw new Error('Unable to create int measurement value')
  }
}

const getIntValueByID = async (id: number) => {
  try {
    const intValue = await prisma.measurementIntValue.findUnique({
      where: { id }
    })
    if (!intValue) {
      throw new Error(`int value with ID ${id} not found.`)
    }
    return intValue
  } catch (error) {
    console.error('Error getting the int value by ID:', error)
    throw error
  }
}

const getAllIntValues = async () => {
  try {
    const intValues = await prisma.measurementIntValue.findMany()
    return intValues
  } catch (error) {
    console.error('Error fetching all int values:', error)
    throw error
  }
}

const updateIntValue = async (
  id: number,
  data: {
    sourceMeasurementId: number
    value: number
  }
) => {
  try {
    return await prisma.measurementIntValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating int value:', error)
    throw error
  }
}

const deleteIntValue = async (id: number) => {
  try {
    const intValue = await prisma.measurementIntValue.delete({
      where: { id }
    })
    return intValue
  } catch (error) {
    console.error('Error deleting int value:', error)
    throw error
  }
}

export { createIntValue, getIntValueByID, getAllIntValues, updateIntValue, deleteIntValue }

import { prisma } from '../prismaClient'

const createFloatValue = async (data: { sourceMeasurementId: number; value: number }) => {
  try {
    return await prisma.measurementFloatValue.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
        value: data.value
      }
    })
  } catch (error) {
    console.error('Error creating float measurement value:', error)
    throw new Error('Unable to create float measurement value')
  }
}

const getFloatValueByID = async (id: number) => {
  try {
    const floatValue = await prisma.measurementFloatValue.findUnique({
      where: { id }
    })
    if (floatValue) {
      return floatValue
    } else {
      throw new Error(`float value with ID ${id} not found.`)
    }
  } catch (error) {
    console.error('Error getting the float value by ID:', error)
    throw error
  }
}

const getAllFloatValues = async () => {
  try {
    const floatValues = await prisma.measurementFloatValue.findMany()
    return floatValues
  } catch (error) {
    console.error('Error fetching all float values:', error)
    throw error
  }
}

const updateFloatValue = async (
  id: number,
  data: {
    sourceMeasurementId: number
    value: number
  }
) => {
  try {
    return await prisma.measurementFloatValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating float value:', error)
    throw error
  }
}

const deleteFloatValue = async (id: number) => {
  try {
    const floatValue = await prisma.measurementFloatValue.delete({
      where: { id }
    })
    return floatValue
  } catch (error) {
    console.error('Error deleting float value:', error)
    throw error
  }
}

export default {
  createFloatValue,
  getFloatValueByID,
  getAllFloatValues,
  updateFloatValue,
  deleteFloatValue
}

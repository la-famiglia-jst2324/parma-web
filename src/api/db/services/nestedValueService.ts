import { prisma } from '../prisma/prismaClient'

const createNestedValue = async (data: { companyMeasurementId: number; value: string; timestamp: Date }) => {
  try {
    return await prisma.measurementNestedValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value,
        timestamp: data.timestamp
      }
    })
  } catch (error) {
    console.error('Error creating nested measurement value:', error)
    throw new Error('Unable to create nested measurement value')
  }
}

const getNestedValueByID = async (id: number) => {
  try {
    const nestedValue = await prisma.measurementNestedValue.findUnique({
      where: { id }
    })
    if (!nestedValue) {
      throw new Error(`Nested value with ID ${id} not found.`)
    }
    return nestedValue
  } catch (error) {
    console.error('Error getting the nested value by ID:', error)
    throw error
  }
}

const getAllNestedValues = async () => {
  try {
    const nestedValues = await prisma.measurementNestedValue.findMany()
    return nestedValues
  } catch (error) {
    console.error('Error fetching all nested values:', error)
    throw error
  }
}

const updateNestedValue = async (
  id: number,
  data: {
    companyMeasurementId: number
    value: string
    timestamp?: Date
  }
) => {
  try {
    return await prisma.measurementNestedValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating nested value:', error)
    throw error
  }
}

const deleteNestedValue = async (id: number) => {
  try {
    const nestedValue = await prisma.measurementNestedValue.delete({
      where: { id }
    })
    return nestedValue
  } catch (error) {
    console.error('Error deleting nested value:', error)
    throw error
  }
}

export { createNestedValue, getNestedValueByID, getAllNestedValues, updateNestedValue, deleteNestedValue }

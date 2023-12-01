import { prisma } from '../prisma/prismaClient'

const createTextValue = async (data: { sourceMeasurementId: number; value: string }) => {
  try {
    return await prisma.measurementTextValue.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
        value: data.value
      }
    })
  } catch (error) {
    console.error('Error creating text measurement value:', error)
    throw new Error('Unable to create text measurement value')
  }
}

const getTextValueByID = async (id: number) => {
  try {
    const textValue = await prisma.measurementTextValue.findUnique({
      where: { id }
    })
    if (!textValue) {
      throw new Error(`Text value with ID ${id} not found.`)
    }
    return textValue
  } catch (error) {
    console.error('Error getting the text value by ID:', error)
    throw error
  }
}

const getAllTextValues = async () => {
  try {
    const textValues = await prisma.measurementTextValue.findMany()
    return textValues
  } catch (error) {
    console.error('Error fetching all text values:', error)
    throw error
  }
}

const updateTextValue = async (
  id: number,
  data: {
    sourceMeasurementId: number
    value: string
  }
) => {
  try {
    return await prisma.measurementTextValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating text value:', error)
    throw error
  }
}

const deleteTextValue = async (id: number) => {
  try {
    const textValue = await prisma.measurementTextValue.delete({
      where: { id }
    })
    return textValue
  } catch (error) {
    console.error('Error deleting text value:', error)
    throw error
  }
}

export { createTextValue, getTextValueByID, getAllTextValues, updateTextValue, deleteTextValue }

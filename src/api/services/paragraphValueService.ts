import { prisma } from '../prismaClient'

const createParagraphValue = async (data: { sourceMeasurementId: number; value: string }) => {
  try {
    return await prisma.measurementParagraphValue.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
        value: data.value
      }
    })
  } catch (error) {
    console.error('Error creating paragraph measurement value:', error)
    throw new Error('Unable to create paragraph measurement value')
  }
}

const getParagraphValueByID = async (id: number) => {
  try {
    const paragraphValue = await prisma.measurementParagraphValue.findUnique({
      where: { id }
    })
    if (paragraphValue) {
      return paragraphValue
    } else {
      throw new Error(`paragraph value with ID ${id} not found.`)
    }
  } catch (error) {
    console.error('Error getting the paragraph value by ID:', error)
    throw error
  }
}

const getAllParagraphValues = async () => {
  try {
    const paragraphValues = await prisma.measurementParagraphValue.findMany()
    return paragraphValues
  } catch (error) {
    console.error('Error fetching all paragraph values:', error)
    throw error
  }
}

const updateParagraphValue = async (
  id: number,
  data: {
    sourceMeasurementId: number
    value: string
  }
) => {
  try {
    return await prisma.measurementParagraphValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating paragraph value:', error)
    throw error
  }
}

const deleteParagraphValue = async (id: number) => {
  try {
    const paragraphValue = await prisma.measurementParagraphValue.delete({
      where: { id }
    })
    return paragraphValue
  } catch (error) {
    console.error('Error deleting paragraph value:', error)
    throw error
  }
}

export default {
  createParagraphValue,
  getParagraphValueByID,
  getAllParagraphValues,
  updateParagraphValue,
  deleteParagraphValue
}

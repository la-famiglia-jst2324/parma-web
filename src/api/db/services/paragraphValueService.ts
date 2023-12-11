import { prisma } from '../prisma/prismaClient'

const createParagraphValue = async (data: { companyMeasurementId: number; value: string }) => {
  try {
    return await prisma.measurementParagraphValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
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
    if (!paragraphValue) {
      throw new Error(`paragraph value with ID ${id} not found.`)
    }
    return paragraphValue
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
    companyMeasurementId: number
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

export {
  createParagraphValue,
  getParagraphValueByID,
  getAllParagraphValues,
  updateParagraphValue,
  deleteParagraphValue
}

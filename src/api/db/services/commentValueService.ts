import { prisma } from '../prisma/prismaClient'

const createCommentValue = async (data: { companyMeasurementId: number; value: string }) => {
  try {
    return await prisma.measurementCommentValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value
      }
    })
  } catch (error) {
    console.error('Error creating comment measurement value:', error)
    throw new Error('Unable to create comment measurement value')
  }
}

const getCommentValueByID = async (id: number) => {
  try {
    const commentValue = await prisma.measurementCommentValue.findUnique({
      where: { id }
    })
    if (!commentValue) {
      throw new Error(`comment value with ID ${id} not found.`)
    }
    return commentValue
  } catch (error) {
    console.error('Error getting the comment value by ID:', error)
    throw error
  }
}

const getAllCommentValues = async () => {
  try {
    const commentValues = await prisma.measurementCommentValue.findMany()
    return commentValues
  } catch (error) {
    console.error('Error fetching all comment values:', error)
    throw error
  }
}

const updateCommentValue = async (
  id: number,
  data: {
    companyMeasurementId: number
    value: string
  }
) => {
  try {
    return await prisma.measurementCommentValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating comment value:', error)
    throw error
  }
}

const deleteCommentValue = async (id: number) => {
  try {
    const commentValue = await prisma.measurementCommentValue.delete({
      where: { id }
    })
    return commentValue
  } catch (error) {
    console.error('Error deleting comment value:', error)
    throw error
  }
}

export { createCommentValue, getCommentValueByID, getAllCommentValues, updateCommentValue, deleteCommentValue }

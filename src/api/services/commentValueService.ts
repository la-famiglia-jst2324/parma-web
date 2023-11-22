import { prisma } from '../prismaClient'

const createCommentValue = async (data: { sourceMeasurementId: number; value: number }) => {
  try {
    return await prisma.measurementCommentValue.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
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
    if (commentValue) {
      return commentValue
    } else {
      throw new Error(`comment value with ID ${id} not found.`)
    }
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
    sourceMeasurementId: number
    value: number
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

export default {
  createCommentValue,
  getCommentValueByID,
  getAllCommentValues,
  updateCommentValue,
  deleteCommentValue
}

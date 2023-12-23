import { prisma } from '../prisma/prismaClient'

const createLinkValue = async (data: { companyMeasurementId: number; value: string; timestamp: Date }) => {
  try {
    return await prisma.measurementLinkValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value,
        timestamp: data.timestamp
      }
    })
  } catch (error) {
    console.error('Error creating link measurement value:', error)
    throw new Error('Unable to create link measurement value')
  }
}

const getLinkValueByID = async (id: number) => {
  try {
    const linkValue = await prisma.measurementLinkValue.findUnique({
      where: { id }
    })
    if (!linkValue) {
      throw new Error(`Link value with ID ${id} not found.`)
    }
    return linkValue
  } catch (error) {
    console.error('Error getting the link value by ID:', error)
    throw error
  }
}

const getAllLinkValues = async () => {
  try {
    const linkValues = await prisma.measurementLinkValue.findMany()
    return linkValues
  } catch (error) {
    console.error('Error fetching all link values:', error)
    throw error
  }
}

const updateLinkValue = async (
  id: number,
  data: {
    companyMeasurementId: number
    value: string
    timestamp?: Date
  }
) => {
  try {
    return await prisma.measurementLinkValue.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating link value:', error)
    throw error
  }
}

const deleteLinkValue = async (id: number) => {
  try {
    const linkValue = await prisma.measurementLinkValue.delete({
      where: { id }
    })
    return linkValue
  } catch (error) {
    console.error('Error deleting link value:', error)
    throw error
  }
}

export { createLinkValue, getLinkValueByID, getAllLinkValues, updateLinkValue, deleteLinkValue }

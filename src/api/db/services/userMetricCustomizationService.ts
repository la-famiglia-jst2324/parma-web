import { prisma } from '../prisma/prismaClient'

const createUserMetricCustomization = async (data: { customizationId: number; sourceMeasurementId: number }) => {
  try {
    const userMetricCustomization = await prisma.userMetricCustomization.create({
      data: {
        customizationId: data.customizationId,
        sourceMeasurementId: data.sourceMeasurementId
      }
    })
    return userMetricCustomization
  } catch (error) {
    console.error('Error creating user customization:', error)
    throw new Error('Unable to create user customization')
  }
}
const getAllUserMetricsByCustomizationId = async (customizationId: number) => {
  try {
    const userMetricCustomizations = await prisma.userMetricCustomization.findMany({
      where: {
        customizationId
      },
      include: {
        sourceMeasurement: {
          include: {
            dataSource: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })
    return userMetricCustomizations
  } catch (error) {
    throw new Error('Unable to retrieve user customization metric IDs')
  }
}

export { createUserMetricCustomization, getAllUserMetricsByCustomizationId }

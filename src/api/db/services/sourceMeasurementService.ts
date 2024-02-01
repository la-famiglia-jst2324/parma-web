import type { CompanySourceMeasurement, SourceMeasurement } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

type SourceMeasurementWithCSMs = SourceMeasurement & {
  companySourceMeasurements: CompanySourceMeasurement[]
}

const createSourceMeasurement = async (data: {
  sourceModuleId: number
  type: string
  measurementName: string
  parentMeasurementId?: number | null
}) => {
  try {
    return await prisma.sourceMeasurement.create({
      data: {
        sourceModuleId: data.sourceModuleId,
        type: data.type,
        measurementName: data.measurementName,
        parentMeasurementId: data.parentMeasurementId
      }
    })
  } catch (error) {
    console.error('Error creating a source measurement:', error)
    throw new Error('Unable to create a source measurement')
  }
}

const getSourceMeasurementByID = async (id: number) => {
  try {
    const measurement = await prisma.sourceMeasurement.findUnique({
      where: { id },
      include: {
        childSourceMeasurements: true
      }
    })
    if (!measurement) {
      throw new ItemNotFoundError(`source measurement with ID ${id} not found.`)
    }
    return measurement
  } catch (error) {
    console.error('Error getting the source measurement by ID:', error)
    throw error
  }
}

// get all measurements of a data source
const getMeasurementsBySourceId = async (sourceModuleId: number) => {
  try {
    const measurements = await prisma.sourceMeasurement.findMany({
      where: { sourceModuleId }
    })
    if (!measurements) {
      throw new Error(`source measurements of data source ID ${sourceModuleId} not found.`)
    }
    return measurements
  } catch (error) {
    console.error('Error getting the source measurements of data source :', error)
    throw error
  }
}

const getAllSourceMeasurements = async () => {
  try {
    const measurements = await prisma.sourceMeasurement.findMany()
    return measurements
  } catch (error) {
    console.error('Error fetching all source measurements:', error)
    throw error
  }
}

const updateSourceMeasurement = async (
  id: number,
  data: {
    sourceModuleId?: number
    type?: string
    companyId?: number
    measurementName?: string
    parentMeasurementId?: number | null
  }
) => {
  try {
    return await prisma.sourceMeasurement.update({
      where: { id },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating source measurement:', error)
    throw error
  }
}

const deleteSourceMeasurement = async (id: number) => {
  try {
    const measurement = await prisma.sourceMeasurement.delete({
      where: { id }
    })
    return measurement
  } catch (error) {
    console.error('Error deleting measurement:', error)
    throw error
  }
}

const getChildMeasurementsByParentId = async (id: number) => {
  const measurements = await prisma.sourceMeasurement.findMany({
    where: { parentMeasurementId: id },
    include: { childSourceMeasurements: true }
  })

  for (let i = 0; i < measurements.length; i++) {
    const children = await getChildMeasurementsByParentId(measurements[i].id)
    measurements[i].childSourceMeasurements = children
  }
  return measurements
}

const updateParentMeasurementId = async (childId: number, newParentId: number | null) => {
  try {
    return await prisma.sourceMeasurement.update({
      where: { id: childId },
      data: { parentMeasurementId: newParentId }
    })
  } catch (error) {
    console.error('Error updating child source measurement parent:', error)
    throw new Error('Unable to update child source measurement parent')
  }
}

const getMeasurementsByCompanyIdSourceId = async (sourceModuleId: number, companyId: number) => {
  try {
    const measurements = await prisma.sourceMeasurement.findMany({
      where: {
        sourceModuleId
      },
      include: {
        companySourceMeasurements: {
          where: {
            companyId
          },
          select: {
            companyId: true
          }
        }
      }
    })
    // add the companyId to the result

    const flattenedMeasurements = measurements.flatMap((measurement: SourceMeasurementWithCSMs) =>
      measurement.companySourceMeasurements.map((csm: CompanySourceMeasurement) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { companySourceMeasurements, ...measurementWithoutCompanySourceMeasurements } = measurement
        const rest = { ...measurementWithoutCompanySourceMeasurements, ...csm }
        return rest
      })
    )
    return flattenedMeasurements
  } catch (error) {
    console.error('Error getting the measurements of specific company and data source module:', error)
    throw error
  }
}
export {
  createSourceMeasurement,
  getSourceMeasurementByID,
  getAllSourceMeasurements,
  getMeasurementsBySourceId,
  updateSourceMeasurement,
  getChildMeasurementsByParentId,
  updateParentMeasurementId,
  deleteSourceMeasurement,
  getMeasurementsByCompanyIdSourceId
}

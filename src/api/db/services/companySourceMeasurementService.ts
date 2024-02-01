import { prisma } from '../prisma/prismaClient'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

interface Result {
  companyName: string
  measurement: Measurement
}

interface Measurement {
  metricName: string
  value: number
  date: Date | null
}

const createCompanySourceMeasurement = async (data: { sourceMeasurementId: number; companyId: number }) => {
  try {
    return await prisma.companySourceMeasurement.create({
      data: {
        sourceMeasurementId: data.sourceMeasurementId,
        companyId: data.companyId
      }
    })
  } catch (error) {
    console.error('Error creating company source measurement:', error)
    throw new Error('Unable to create company source measurement')
  }
}

const getCompanySourceMeasurementByID = async (id: number) => {
  try {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findUnique({
      where: { companyMeasurementId: id }
    })
    if (!companySourceMeasurement) {
      throw new Error(`Company source measurement with ID ${id} not found.`)
    }
    return companySourceMeasurement
  } catch (error) {
    console.error('Error getting a company source measurement by ID:', error)
    throw error
  }
}

const getCompanySourceMeasurementByCompanyId = async (companyIds: number[]) => {
  try {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findMany({
      where: {
        companyId: companyIds ? { in: companyIds } : undefined
      },
      include: {
        sourceMeasurement: true
      }
    })
    if (!companySourceMeasurement) {
      throw new Error(`Company source measurement with ID ${companyIds} not found.`)
    }
    return companySourceMeasurement
  } catch (error) {
    console.error('Error getting a company source measurement by ID:', error)
    throw error
  }
}

const getValueByMeasurementIdCompanyId = async (sourceMeasurementId: number, companyIds: number[]) => {
  try {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findMany({
      where: {
        sourceMeasurementId,
        companyId: companyIds ? { in: companyIds } : undefined
      },
      include: {
        sourceMeasurement: true,
        company: true,
        measurementIntValues: true,
        measurementFloatValues: true,
        measurementCommentValues: true
      }
    })
    if (!companySourceMeasurement) {
      throw new Error(`Company source measurement relation not found.`)
    }
    return companySourceMeasurement
  } catch (error) {
    console.error('Error getting a company source measurement by ID:', error)
    throw error
  }
}

const getAllCompanySourceMeasurements = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const companySourceMeasurements = await prisma.companySourceMeasurement.findMany({
      skip,
      take: pageSize
    })
    const totalCount = await prisma.companySourceMeasurement.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      companySourceMeasurements,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error fetching all company source measurements:', error)
    throw error
  }
}

const updateCompanySourceMeasurement = async (
  id: number,
  data: {
    sourceMeasurementId?: number
    companyId?: number
  }
) => {
  return await prisma.companySourceMeasurement.update({
    where: { companyMeasurementId: id },
    data: {
      ...data
    }
  })
}

const deleteCompanySourceMeasurement = async (id: number) => {
  try {
    return await prisma.companySourceMeasurement.delete({
      where: { companyMeasurementId: id }
    })
  } catch (error) {
    console.error('Error deleting company source measurement:', error)
    throw error
  }
}

const getMeasurementValueCompanyId = async (companyIds: number[]) => {
  try {
    const measurementNames = ['# of Employees', 'Monthly Revenue']
    const companySourceMeasurements = await prisma.companySourceMeasurement.findMany({
      where: {
        companyId: companyIds ? { in: companyIds } : undefined
      },
      include: {
        sourceMeasurement: true,
        company: true
      }
    })
    const resultObject = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedCompanies = await companySourceMeasurements.reduce(
      async (accPromise: any[], item: any) => {
        const acc = await accPromise
        const company = item.company
        const measurementName = item.sourceMeasurement.measurementName
        let value: number = 0
        let date: Date = new Date()

        if (
          item.sourceMeasurement.type === 'int' &&
          measurementNames.includes(item.sourceMeasurement.measurementName)
        ) {
          const res = await prisma.measurementIntValue.findMany({
            where: {
              companyMeasurementId: item.companyMeasurementId
            },
            orderBy: { timestamp: 'desc' },
            take: 1
          })
          if (res.length > 0) {
            value = res[0].value
            date = res[0].timestamp
          }
        } else if (
          item.sourceMeasurement.type === 'float' &&
          measurementNames.includes(item.sourceMeasurement.measurementName)
        ) {
          const res = await prisma.measurementFloatValue.findMany({
            where: {
              companyMeasurementId: item.companyMeasurementId
            },
            orderBy: { timestamp: 'desc' },
            take: 1
          })
          if (res.length > 0) {
            value = res[0].value
            date = res[0].timestamp
          }
        }

        const result: Result = {
          companyName: company.name,
          measurement: {
            metricName: measurementName,
            value,
            date
          }
        }
        if (!acc[company.id]) {
          acc[company.id] = []
        }
        acc[company.id].push(result)

        return acc
      },
      Promise.resolve({} as Record<number, Result[]>)
    )

    for (const key in groupedCompanies) {
      if (Object.prototype.hasOwnProperty.call(groupedCompanies, key)) {
        const array = groupedCompanies[key]
        const measurements: Measurement[] = []
        let companyName = ''
        array.forEach((item: Result) => {
          if (item.measurement.value) measurements.push(item.measurement)
          companyName = item.companyName
        })
        resultObject.push({
          companyId: key,
          companyName,
          measurements
        })
      }
    }

    if (!companySourceMeasurements) {
      throw new ItemNotFoundError(`Company source measurement with ID ${companyIds} not found.`)
    }
    return resultObject
  } catch (error) {
    console.error('Error getting a company source measurement value by ID:', error)
    throw error
  }
}
export {
  createCompanySourceMeasurement,
  getCompanySourceMeasurementByID,
  getValueByMeasurementIdCompanyId,
  getCompanySourceMeasurementByCompanyId,
  getAllCompanySourceMeasurements,
  updateCompanySourceMeasurement,
  deleteCompanySourceMeasurement,
  getMeasurementValueCompanyId
}

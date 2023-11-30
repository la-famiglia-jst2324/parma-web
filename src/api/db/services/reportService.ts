import { prisma } from '../prisma/prismaClient'

const createReport = async (data: { companyId: number; name: string; reportFileUrl: string }) => {
  try {
    return await prisma.report.create({
      data: {
        companyId: data.companyId,
        name: data.name,
        reportFileUrl: data.reportFileUrl
      }
    })
  } catch (error) {
    console.error('Error creating report:', error)
    throw new Error('Unable to create report')
  }
}

const getReportById = async (id: number) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id }
    })
    if (!report) {
      throw new Error(`Report with ID ${id} not found`)
    }
    return report
  } catch (error) {
    console.error('Error retrieving report:', error)
    throw new Error('Unable to retrieve report')
  }
}

const updateReport = async (
  id: number,
  data: {
    companyId?: number
    name?: string
    reportFileUrl?: string
  }
) => {
  try {
    return await prisma.report.update({
      where: { id },
      data
    })
  } catch (error) {
    console.error('Error updating report:', error)
    throw new Error('Unable to update report')
  }
}

const deleteReport = async (id: number) => {
  try {
    return await prisma.report.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting report:', error)
    throw new Error('Unable to delete report')
  }
}
export { createReport, getReportById, updateReport, deleteReport }

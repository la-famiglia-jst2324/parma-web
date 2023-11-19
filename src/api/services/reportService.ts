import { prisma } from '../prismaClient';

const createReport = async (data: {
  company_id: string;
  name: string;
  report_file_url: string;
}) => {
  try {
    return await prisma.report.create({
      data: {
        company_id: data.company_id,
        name: data.name,
        report_file_url: data.report_file_url,
      },
    });
  } catch (error) {
    console.error('Error creating report:', error);
    throw new Error('Unable to create report');
  }
}

const getReportById = async (id: string) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id },
    });
    if (!report) {
      throw new Error(`Report with ID ${id} not found`);
    }
    return report;
  } catch (error) {
    console.error('Error retrieving report:', error);
    throw new Error('Unable to retrieve report');
  }
}

const updateReport = async (id: string, data: {
  company_id?: string;
  name?: string;
  report_file_url?: string;
}) => {
  try {
    return await prisma.report.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    console.error('Error updating report:', error);
    throw new Error('Unable to update report');
  }
}

const deleteReport = async (id: string) => {
  try {
    return await prisma.report.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    throw new Error('Unable to delete report');
  }
}
export default {
  createReport,
  getReportById,
  updateReport,
  deleteReport,

};

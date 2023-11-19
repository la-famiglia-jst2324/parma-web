import { prisma } from '../prismaClient';

const createSourceMeasurement = async (data: {
  source_module_id: string;
  type: string;
  company_id: string;
  measurement_name: string;
}) => {
  try {
    return await prisma.sourceMeasurement.create({
      data: {
        source_module_id: data.source_module_id,
        type: data.type,
        company_id: data.company_id,
        measurement_name: data.measurement_name,
      },
    });
  } catch (error) {
    console.error('Error creating a source measurement:', error);
    throw new Error('Unable to create a source measurement');
  }
}

const getSourceMeasurementByID = async (id: string) => {
  try {
    const measurement = await prisma.sourceMeasurement.findUnique({
      where: { id },
    });
    if (measurement) {
      return measurement;
    } else {
      throw new Error(`source measurement with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error getting the source measurement by ID:', error);
    throw error;
  }
};

const getAllSourceMeasurements = async () => {
  try {
    const measurements = await prisma.sourceMeasurement.findMany();
    return measurements;
  } catch (error) {
    console.error('Error fetching all source measurements:', error);
    throw error;
  }
};

const updateSourceMeasurement = async (id: string, data: {
  source_module_id?: string;
  type?: string;
  company_id?: string;
  measurement_name?: string;
}) => {
  try {
    return await prisma.sourceMeasurement.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating source measurement:', error);
    throw error;
  }
};

const deleteSourceMeasurement = async (id: string) => {
  try {
    const measurement = await prisma.sourceMeasurement.delete({
      where: { id },
    });
    return measurement;
  } catch (error) {
    console.error('Error deleting measurement:', error);
    throw error;
  }
};

export default {
  createSourceMeasurement,
  getSourceMeasurementByID,
  getAllSourceMeasurements,
  updateSourceMeasurement,
  deleteSourceMeasurement,
};
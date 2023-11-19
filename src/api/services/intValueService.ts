import { prisma } from '../prismaClient';

const createIntValue = async (data: {
  source_measurement_id: string;
  value: number;
}) => {
  try {
    return await prisma.measurementIntValue.create({
      data: {
        source_measurement_id: data.source_measurement_id,
        value: data.value,
      },
    });
  } catch (error) {
    console.error('Error creating int measurement value:', error);
    throw new Error('Unable to create int measurement value');
  }
}

const getIntValueByID = async (id: string) => {
  try {
    const intValue = await prisma.measurementIntValue.findUnique({
      where: { id },
    });
    if (intValue) {
      return intValue;
    } else {
      throw new Error(`int value with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error getting the int value by ID:', error);
    throw error;
  }
};

const getAllIntValues = async () => {
  try {
    const intValues = await prisma.measurementIntValue.findMany();
    return intValues;
  } catch (error) {
    console.error('Error fetching all int values:', error);
    throw error;
  }
};

const updateIntValue = async (id: string, data: {
  source_measurement_id: string;
  value: number;
}) => {
  try {
    return await prisma.measurementIntValue.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating int value:', error);
    throw error;
  }
};

const deleteIntValue = async (id: string) => {
  try {
    const intValue = await prisma.measurementIntValue.delete({
      where: { id },
    });
    return intValue;
  } catch (error) {
    console.error('Error deleting int value:', error);
    throw error;
  }
};

export default {
  createIntValue,
  getIntValueByID,
  getAllIntValues,
  updateIntValue,
  deleteIntValue,

};
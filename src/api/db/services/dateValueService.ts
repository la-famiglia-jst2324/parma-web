import { prisma } from '../prisma/prismaClient';

const createDateValue = async (data: { companyMeasurementId: number; value: Date; timestamp: Date }) => {
  try {
    return await prisma.measurementDateValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value,
        timestamp: data.timestamp,
      },
    });
  } catch (error) {
    console.error('Error creating date measurement value:', error);
    throw new Error('Unable to create date measurement value');
  }
};

const getDateValueByID = async (id: number) => {
  try {
    const dateValue = await prisma.measurementDateValue.findUnique({
      where: { id },
    });
    if (!dateValue) {
      throw new Error(`Date value with ID ${id} not found.`);
    }
    return dateValue;
  } catch (error) {
    console.error('Error getting the date value by ID:', error);
    throw error;
  }
};

const getAllDateValues = async () => {
  try {
    const dateValues = await prisma.measurementDateValue.findMany();
    return dateValues;
  } catch (error) {
    console.error('Error fetching all date values:', error);
    throw error;
  }
};

const updateDateValue = async (
  id: number,
  data: {
    companyMeasurementId: number;
    value: Date;
    timestamp?: Date;
  }
) => {
  try {
    return await prisma.measurementDateValue.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating date value:', error);
    throw error;
  }
};

const deleteDateValue = async (id: number) => {
  try {
    const dateValue = await prisma.measurementDateValue.delete({
      where: { id },
    });
    return dateValue;
  } catch (error) {
    console.error('Error deleting date value:', error);
    throw error;
  }
};

export { createDateValue, getDateValueByID, getAllDateValues, updateDateValue, deleteDateValue };

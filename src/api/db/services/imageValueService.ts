import { prisma } from '../prisma/prismaClient';

const createImageValue = async (data: { companyMeasurementId: number; value: string; timestamp: Date }) => {
  try {
    return await prisma.measurementImageValue.create({
      data: {
        companyMeasurementId: data.companyMeasurementId,
        value: data.value,
        timestamp: data.timestamp,
      },
    });
  } catch (error) {
    console.error('Error creating image measurement value:', error);
    throw new Error('Unable to create image measurement value');
  }
};

const getImageValueByID = async (id: number) => {
  try {
    const imageValue = await prisma.measurementImageValue.findUnique({
      where: { id },
    });
    if (!imageValue) {
      throw new Error(`Image value with ID ${id} not found.`);
    }
    return imageValue;
  } catch (error) {
    console.error('Error getting the image value by ID:', error);
    throw error;
  }
};

const getAllImageValues = async () => {
  try {
    const imageValues = await prisma.measurementImageValue.findMany();
    return imageValues;
  } catch (error) {
    console.error('Error fetching all image values:', error);
    throw error;
  }
};

const updateImageValue = async (
  id: number,
  data: {
    companyMeasurementId: number;
    value: string;
    timestamp?: Date;
  }
) => {
  try {
    return await prisma.measurementImageValue.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating image value:', error);
    throw error;
  }
};

const deleteImageValue = async (id: number) => {
  try {
    const imageValue = await prisma.measurementImageValue.delete({
      where: { id },
    });
    return imageValue;
  } catch (error) {
    console.error('Error deleting image value:', error);
    throw error;
  }
};

export { createImageValue, getImageValueByID, getAllImageValues, updateImageValue, deleteImageValue };

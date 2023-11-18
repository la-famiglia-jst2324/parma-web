import { Frequency, HealthStatus } from '@prisma/client';
import { prisma } from '../prismaClient';

const createDataSource = async (data: {
  source_name: string;
  is_active: boolean;
  default_frequency: Frequency;
  health_status: HealthStatus;

}) => {
  try {
    return await prisma.dataSource.create({
      data: {
        source_name: data.source_name,
        is_active: data.is_active,
        default_frequency: data.default_frequency,
        health_status: data.health_status,
      },
    });
  } catch (error) {
    console.error('Error creating data source:', error);
    throw new Error('Unable to create data source');
  }
}

const getDataSourceByID = async (id: string) => {
  try {
    const datasource = await prisma.dataSource.findUnique({
      where: { id },
      include: {
        companyDataSource: true,
        notifications: true,
        sourceMeasurements: true,
        userImportantMeasurementPreference: true,
      },
    });
    if (datasource) {
      return datasource;
    } else {
      throw new Error(`Data source with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error getting a data source by ID:', error);
    throw error;
  }
};

// if name is unique 
// const getDataSourceByName = async (source_name: string) => {
//   try {
//     const datasource = await prisma.dataSource.findUnique({
//       where: { source_name },
//     });
//     if (datasource) {
//       return datasource;
//     } else {
//       throw new Error(`DataSource with name ${source_name} not found.`);
//     }
//   } catch (error) {
//     console.error('Error finding data source by name:', error);
//     throw error;
//   }
// };

const getAllDataSources = async () => {
  try {
    const datasources = await prisma.dataSource.findMany();
    return datasources;
  } catch (error) {
    console.error('Error getting all data sources:', error);
    throw error;
  }
};

const updateDataSource = async (id: string, data: {
  source_name?: string;
  isActive?: boolean;
  health_status?: HealthStatus
  frequency?: Frequency;
}) => {
  try {
    return await prisma.dataSource.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating data source:', error);
    throw error;
  }
};


// need also delete all data of this datasource???? 
const deleteDataSource = async (id: string) => {
  try {
    const datasource = await prisma.dataSource.delete({
      where: { id },
    });
    return datasource; // if successful, return the deleted DataSource information
  } catch (error) {
    console.error('Error deleting data source:', error);
    throw error;
  }
};


export default {
  createDataSource,
  getDataSourceByID,
  // getDataSourceByName,
  getAllDataSources,
  updateDataSource,
  deleteDataSource,

};


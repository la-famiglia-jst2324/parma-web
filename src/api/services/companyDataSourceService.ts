import { Frequency, HealthStatus } from '@prisma/client';
import { prisma } from '../prismaClient';
// FR-04 Users add/edit/remove data sources for a company 
// add Datasource To Company 
async function createCompanyDataSource(data: {
  data_source_id: string;
  company_id: string;
  frequency: Frequency;
  is_data_source_active: boolean;
  health_status: HealthStatus;
}) {
  try {
    // check if the data source already in the company
    const existingMembership = await prisma.companyDataSource.findUnique({
      where: {
        data_source_id_company_id: {
          data_source_id: data.data_source_id,
          company_id: data.company_id,
        },
      },
    });
    if (existingMembership) {
      throw new Error(`The data source is already in this company.`);
    }
    const membership = await prisma.companyDataSource.create({
      data: {
        data_source_id: data.data_source_id,
        company_id: data.company_id,
        frequency: data.frequency,
        is_data_source_active: data.is_data_source_active,
        health_status: data.health_status,
      },
    });
    return membership;
  } catch (error) {
    console.error('Error adding a data source to company:', error);
    throw error;
  }
}

async function getDataSourcesByCompanyId(companyId: string) {
  try {
    const memebership = await prisma.companyDataSource.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        dataSources: true,
      },
    });
    if (memebership) {
      return memebership.map(membership => membership.dataSources);
    } else {
      throw new Error(`company${companyId} does not have any data sources.`);
    }
  } catch (error) {
    console.error('Error getting data sources in this company:', error);
    throw error;
  }
};

//maybe dont need
const getCompaniesByDataSourceId = async (datasourceId: string) => {
  try {
    const memebership = await prisma.companyDataSource.findMany({
      where: {
        data_source_id: datasourceId,
      },
      include: {
        companies: true,
      },
    });
    if (memebership) {
      // list all company
      return memebership.map(membership => membership.companies);
    } else {
      throw new Error(`the data source${datasourceId} does not have any company.`);
    }
  } catch (error) {
    console.error('Error retrieving companies from data source:', error);
    throw error;
  }
}


const updateCompanyDataSource = async (data_source_id: string, company_id: string, updateData: {
  frequency?: Frequency;
  is_data_source_active?: boolean;
  health_status?: HealthStatus;
}) => {
  try {
    return await prisma.companyDataSource.update({
      where: {
        data_source_id_company_id: {
          data_source_id,
          company_id,
        },
      },
      data: {
        ...updateData
      },
    });
  } catch (error) {
    console.error('Error updating company data source:', error);
    throw new Error('Unable to update company data source');
  }
};

// remove Datasource from Company 
const deleteCompanyDataSource = async (companyId: string, datasourceId: string) => {
  try {
    const membership = await prisma.companyDataSource.delete({
      where: {
        data_source_id_company_id: {
          company_id: companyId,
          data_source_id: datasourceId,
        },
      },
    });
    return membership;
  } catch (error) {
    console.error('Error deleting data source from the company:', error);
    throw error;
  }
};


export default {
  createCompanyDataSource,
  getDataSourcesByCompanyId,
  getCompaniesByDataSourceId,
  updateCompanyDataSource,
  deleteCompanyDataSource,
}
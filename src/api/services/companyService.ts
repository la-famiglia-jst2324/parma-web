import { prisma } from '../prismaClient';

// check if the company already exists??? use name 
const createCompany = async function createCompany(data: {
  name: string;
  description?: string;
  added_by: string;
}) {
  try {
    return await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        added_by: data.added_by,   // created_at and modified_at automatically
      },
    });
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Unable to create company');
  }
}

const getCompanyByID = async (id: string) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
    });
    if (company) {
      return company; //find the company by id 
    } else {
      throw new Error(`Company with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error getting a company by ID:', error);
    throw error;
  }
};

// const getCompanyByName = async (name: string) => {
//   try {
//     const company = await prisma.Company.findUnique({
//       where: { name },
//     });
//     if (company) {
//       return company; //find the company 
//     } else {
//       throw new Error(`Company with name ${name} not found.`);
//     }
//   } catch (error) {
//     console.error('Error finding company by name:', error);
//     throw error;
//   }
// };

const getAllCompanies = async () => {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    console.error('Error fetching all companies:', error);
    throw error;
  }
};

// who can update the info?  only the company creator? the addBy field can not be modified?
const updateCompany = async (id: string, data: {
  name?: string;
  description?: string;
}) => {
  return await prisma.company.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

//NEED: FR-06 when deleting a company from the system, should also delete its data (notification and reports
const deleteCompany = async (id: string) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      //  delete its relationship with bucket
      await prisma.companyBucketMembership.deleteMany({
        where: {
          company_id: id,
        },
      });

      //delete company record 
      return await prisma.company.delete({
        where: { id },
      });
    });
    return result;
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};

export default {
  createCompany,
  getCompanyByID,
  getAllCompanies,
  updateCompany,
  deleteCompany,

};
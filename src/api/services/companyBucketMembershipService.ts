import { prisma } from '../prismaClient';


// FR-13  user add a company to a bucket, update the lists in both company and bucket 
const addCompanyToBucket = async (companyId: string, bucketId: string) => {
  try {
    //can not add the same company repeatedly
    // check if a company with the same name already exists
    const existingMembership = await prisma.companyBucketMembership.findUnique({
      where: {
        company_id_bucket_id: {
          company_id: companyId,
          bucket_id: bucketId,
        },
      },
    });
    if (existingMembership) {
      throw new Error(`The company is already added to this bucket.`);
    }
    //not exists
    const membership = await prisma.companyBucketMembership.create({
      data: {
        company: {
          connect: { id: companyId },
        },
        bucket: {
          connect: { id: bucketId },
        },
      },
    });
    return membership;
  } catch (error) {
    console.error('Error adding a company to a bucket:', error);
    throw error;
  }
};

const getCompaniesByBucketId = async (bucketId: string) => {
  try {
    const memebership = await prisma.companyBucketMembership.findMany({
      where: {
        bucket_id: bucketId,
      },
      include: {
        company: true,
        //map list company，not CompanyBucketMembership  
      },
    });
    if (memebership) {
      return memebership.map(membership => membership.company);
    } else {
      throw new Error(`bucket${bucketId} does not have any company.`);
    }
  } catch (error) {
    console.error('Error retrieving companies from bucket:', error);
    throw error;
  }
}

// show all buckets that the company belongs to 
const getBucketsByCompanyId = async (companyId: string) => {
  try {
    const memebership = await prisma.companyBucketMembership.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        bucket: true,
      },
    });
    if (memebership) {
      return memebership.map(membership => membership.bucket);
    } else {
      throw new Error(`company${companyId} does not belong to any buckets.`);
    }
  } catch (error) {
    console.error('Error getting buckets in this company:', error);
    throw error;
  }
};

const getCompanyBucketByID = async (bucketId: string, companyId: string) => {
  try {
    const companyBucket = await prisma.companyBucketMembership.findUnique({
      where: {
        company_id_bucket_id: {
          bucket_id: bucketId,
          company_id: companyId,
        },
      },
    });
    if (companyBucket) {
      return companyBucket;
    } else {
      throw new Error(`not found.`);
    }
  } catch (error) {
    console.error('Error getting by ID:', error);
    throw error;
  }
};

//FR-13 user remove a company from a bucket
const removeCompanyFromBucket = async (companyId: string, bucketId: string) => {
  try {
    const membership = await prisma.companyBucketMembership.delete({
      where: {
        company_id_bucket_id: {
          company_id: companyId,
          bucket_id: bucketId,
        },
      },
    });
    return membership;
  } catch (error) {
    console.error('Error deleting company from the bucket:', error);
    throw error;
  }
};

export default {
  addCompanyToBucket,
  getCompaniesByBucketId,
  getBucketsByCompanyId,
  getCompanyBucketByID,
  removeCompanyFromBucket,
};
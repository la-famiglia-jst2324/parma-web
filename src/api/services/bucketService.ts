import { prisma } from '../prismaClient';

// can create a new bucket with the same name??  skip for now 
const createBucket = async (data: {
  title: string;
  description?: string;
  owner_id: string;
  is_public: boolean;
}) => {
  try {
    return await prisma.bucket.create({
      data: {
        title: data.title,
        description: data.description,
        owner_id: data.owner_id,
        is_public: data.is_public,
      },
    });
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw new Error('Unable to create bucket');
  }
}

const getBucketById = async (id: string) => {
  try {
    const bucket = await prisma.bucket.findUnique({
      where: { id },
      include: {
        user: true,
        companyBucketMember: true,
      },
    });
    if (!bucket) {
      throw new Error(`Bucket with ID ${id} not found`);
    }
    return bucket;
  } catch (error) {
    console.error('Error retrieving bucket:', error);
    throw new Error('Unable to retrieve bucket');
  }
}

// FR-30 search a bucket 
const getBucketByName = async (title: string) => {
  try {
    // if name unique, use findunique 
    const bucket = await prisma.bucket.findMany({
      where: { title },
    });
    if (bucket) {
      return bucket;
    } else {
      throw new Error(`Bucket with name ${title} not found.`);
    }
  } catch (error) {
    console.error('Error finding bucket by name:', error);
    throw error;
  }
};


async function getAllBuckets() {
  try {
    return await prisma.bucket.findMany();
  } catch (error) {
    console.error('Error retrieving all buckets:', error);
    throw new Error('Unable to retrieve buckets');
  }
}

// a user find all buckets of his own. should use filter （by ownerID）
const getOwnBuckets = async (ownerId: string) => {
  try {
    const buckets = await prisma.bucket.findMany({
      where: {
        owner_id: ownerId,
      },
    })
    return buckets;
  } catch (error) {
    console.error('Error fetching your buckets:', error);
    throw error;
  }
};

// difference between Moderator and Viewer (all invited？ )


// who? only the Bucket creator?  onwer cant be modified? 
const updateBucket = async (id: string, data: {
  title?: string;
  description?: string;
  is_public?: boolean;
}) => {
  try {
    return await prisma.bucket.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating bucket:', error);
    throw new Error('Unable to update bucket');
  }
};


const deleteBucket = async (id: string) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      //  delete its relationship with company
      await prisma.companyBucketMembership.deleteMany({
        where: {
          bucket_id: id,
        },
      });
      //delete bucket  
      return await prisma.bucket.delete({
        where: { id },
      });
    });
    return result;
  } catch (error) {
    console.error('Error deleting bucket:', error);
    throw error;
  }
};

export default {
  createBucket,
  getBucketById,
  getBucketByName,
  getAllBuckets,
  getOwnBuckets,
  updateBucket,
  deleteBucket,

};
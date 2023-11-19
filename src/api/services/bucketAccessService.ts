import { BucketPermission, FileType } from '@prisma/client';
import { prisma } from '../prismaClient';

const createBucketAccess = async (data: {
  bucket_id: string;
  invitee_id: string;
  permission: BucketPermission;
}) => {
  try {
    return await prisma.bucketAccess.create({
      data: {
        bucket_id: data.bucket_id,
        invitee_id: data.invitee_id,
        permission: data.permission,
      },
    });
  } catch (error) {
    console.error('Error creating bucket access:', error);
    throw new Error('Unable to create bucket access');
  }
}

const getBucketAccessByID = async (bucketId: string, inviteeId: string) => {
  try {
    const bucketAccess = await prisma.bucketAccess.findUnique({
      where: {
        bucket_id_invitee_id: {
          bucket_id: bucketId,
          invitee_id: inviteeId,
        },
      },
    });
    if (bucketAccess) {
      return bucketAccess;
    } else {
      throw new Error(`not found.`);
    }
  } catch (error) {
    console.error('Error getting by ID:', error);
    throw error;
  }
};

const updateBucketAccess = async (bucketId: string, inviteeId: string, data: {
  permission: BucketPermission;
}) => {
  try {
    return await prisma.bucketAccess.update({
      where: {
        bucket_id_invitee_id: {
          bucket_id: bucketId,
          invitee_id: inviteeId,
        },
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating bucket access:', error);
    throw error;
  }
};

const deleteBucketAccess = async (bucketId: string, inviteeId: string) => {
  try {
    const access = await prisma.bucketAccess.delete({
      where: {
        bucket_id_invitee_id: {
          bucket_id: bucketId,
          invitee_id: inviteeId,
        },
      },
    });
    return access;
  } catch (error) {
    console.error('Error deleting bucket access:', error);
    throw error;
  }
};

export default {
  createBucketAccess,
  getBucketAccessByID,
  updateBucketAccess,
  deleteBucketAccess,

};
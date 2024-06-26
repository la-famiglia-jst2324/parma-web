import type { BucketPermission } from '@prisma/client'
import { prisma } from '../prisma/prismaClient'

const createBucketAccess = async (data: { bucketId: number; inviteeId: number; permission: BucketPermission }) => {
  try {
    return await prisma.bucketAccess.create({
      data: {
        bucketId: data.bucketId,
        inviteeId: data.inviteeId,
        permission: data.permission
      }
    })
  } catch (error) {
    console.error('Error creating bucket access:', error)
    throw new Error('Unable to create bucket access')
  }
}

const getBucketAccessByID = async (bucketId: number, inviteeId: number) => {
  try {
    const bucketAccess = await prisma.bucketAccess.findUnique({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      }
    })
    return bucketAccess
  } catch (error) {
    console.error('Error getting by ID:', error)
    throw error
  }
}

const getInviteesByBucketId = async (bucketId: number) => {
  try {
    const membership = await prisma.bucketAccess.findMany({
      where: {
        bucketId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    })
    return membership
  } catch (error) {
    console.error('Error getting by ID:', error)
    throw error
  }
}

const getInviteesIdsByBucketId = async (bucketId: number) => {
  try {
    const membership = await prisma.bucketAccess.findMany({
      where: {
        bucketId
      }
    })
    return membership
  } catch (error) {
    console.error('Error getting by ID:', error)
    throw error
  }
}

const updateBucketAccess = async (
  bucketId: number,
  inviteeId: number,
  data: {
    permission: BucketPermission
  }
) => {
  try {
    return await prisma.bucketAccess.update({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating bucket access:', error)
    throw error
  }
}

const deleteBucketAccess = async (bucketId: number, inviteeId: number) => {
  try {
    const access = await prisma.bucketAccess.delete({
      where: {
        bucketId_inviteeId: {
          bucketId,
          inviteeId
        }
      }
    })
    return access
  } catch (error) {
    console.error('Error deleting bucket access:', error)
    throw error
  }
}

export {
  createBucketAccess,
  getBucketAccessByID,
  getInviteesByBucketId,
  updateBucketAccess,
  deleteBucketAccess,
  getInviteesIdsByBucketId
}

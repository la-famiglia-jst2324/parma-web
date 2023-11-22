import type { Role } from '@prisma/client'
import { prisma } from '../prismaClient'

const createUser = async (data: { name: string; role: Role }) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        role: data.role
        // created_at  modified_at automatically
      }
    })
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Unable to create user')
  }
}
const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        ownedBuckets: true,
        notificationSubscriptions: true,
        reportSubscriptions: true,
        permissions: true
      }
    })
    if (!user) {
      throw new Error(`User with ID ${id} not found`)
    }
    return user
  } catch (error) {
    console.error('Error retrieving user:', error)
    throw new Error('Unable to retrieve user')
  }
}

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}
// who can update
const updateUser = async (
  id: number,
  data: {
    name?: string
    role?: Role
  }
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data
      }
    })
    return user
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Unable to update user')
  }
}

// ???also delete his own buckets, attachments,subscriptions,permissions,userImportantMeasurementPreference?
const deleteUser = async (id: number) => {
  try {
    const user = await prisma.user.delete({
      where: { id }
    })
    return user // if successful, return the deleted user information
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
}

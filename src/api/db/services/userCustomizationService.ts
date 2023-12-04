import { prisma } from '../prisma/prismaClient'

const createUserCustomization = async (data: { name: string; userId: number }) => {
  try {
    const userCustomization = await prisma.userCustomization.create({
      data: {
        name: data.name,
        userId: data.userId
      }
    })
    return userCustomization
  } catch (error) {
    console.error('Error creating user customization:', error)
    throw new Error('Unable to create user customization')
  }
}

const getUserCustomizations = async (userId: number) => {
  try {
    return await prisma.userCustomization.findMany({ where: { userId } })
  } catch (error) {
    throw new Error('Unable to retrieve user customizations')
  }
}

const getUserCustomizationById = async (customizationId: number) => {
  try {
    return await prisma.userCustomization.findUnique({ where: { id: customizationId } })
  } catch (error) {
    throw new Error(`Unable to retrieve user customization with id ${customizationId}`)
  }
}

const deleteUserCustomization = async (customizationId: number) => {
  try {
    await prisma.userCustomization.delete({
      where: {
        id: customizationId
      }
    })

    console.log(`UserCustomization with id ${customizationId} deleted successfully.`)
  } catch (error) {
    throw new Error(`Error deleting UserCustomization with id ${customizationId}:`)
  }
}

export { createUserCustomization, getUserCustomizations, getUserCustomizationById, deleteUserCustomization }

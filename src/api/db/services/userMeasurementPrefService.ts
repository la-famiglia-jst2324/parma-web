import { prisma } from '../prisma/prismaClient'

const createUserPref = async (data: { dataSourceId: number; userId: number; importantFieldName: string }) => {
  try {
    return await prisma.userImportantMeasurementPreference.create({
      data: {
        dataSourceId: data.dataSourceId,
        userId: data.userId,
        importantFieldName: data.importantFieldName
      }
    })
  } catch (error) {
    console.error('Error creating user preference :', error)
    throw new Error('Unable to create user preference')
  }
}

const getUserPrefByID = async (dataSourceId: number, userId: number, importantFieldName: string) => {
  try {
    const pref = await prisma.userImportantMeasurementPreference.findUnique({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      }
    })
    if (!pref) {
      throw new Error(`user preference with ID not found.`)
    }
    return pref
  } catch (error) {
    console.error('Error getting the user preference by ID:', error)
    throw error
  }
}

const getPrefsByUserId = async (userId: number) => {
  try {
    const prefs = await prisma.userImportantMeasurementPreference.findMany({
      where: {
        userId
      }
    })
    return prefs
  } catch (error) {
    console.error('Error fetching your prefs:', error)
    throw error
  }
}

const updateUserPref = async (
  dataSourceId: number,
  userId: number,
  importantFieldName: string,
  data: {
    importantFieldName: string
  }
) => {
  try {
    return await prisma.userImportantMeasurementPreference.update({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      },
      data: {
        ...data
      }
    })
  } catch (error) {
    console.error('Error updating your prefs:', error)
    throw error
  }
}

const deleteUserPref = async (dataSourceId: number, userId: number, importantFieldName: string) => {
  try {
    const pref = await prisma.userImportantMeasurementPreference.delete({
      where: {
        dataSourceId_userId_importantFieldName: {
          dataSourceId,
          userId,
          importantFieldName
        }
      }
    })
    return pref
  } catch (error) {
    console.error('Error deleting your pref:', error)
    throw error
  }
}

export { createUserPref, getUserPrefByID, getPrefsByUserId, updateUserPref, deleteUserPref }

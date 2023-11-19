import { prisma } from '../prismaClient';

const createUserPref = async (data: {
  data_source_id: string;
  user_id: string;
  important_field_name: string;
}) => {
  try {
    return await prisma.userImportantMeasurementPreference.create({
      data: {
        data_source_id: data.data_source_id,
        user_id: data.user_id,
        important_field_name: data.important_field_name,
      },
    });
  } catch (error) {
    console.error('Error creating user preference :', error);
    throw new Error('Unable to create user preference');
  }
}

const getUserPrefByID = async (data_source_id: string, user_id: string) => {
  try {
    const pref = await prisma.userImportantMeasurementPreference.findUnique({
      where: {
        data_source_id_user_id: {
          data_source_id,
          user_id,
        },
      },
    });
    if (pref) {
      return pref;
    } else {
      throw new Error(`user preference with ID not found.`);
    }
  } catch (error) {
    console.error('Error getting the user preference by ID:', error);
    throw error;
  }
};

const getPrefsByUserId = async (user_id: string) => {
  try {
    const prefs = await prisma.userImportantMeasurementPreference.findMany({
      where: {
        user_id
      },
    })
    return prefs;
  } catch (error) {
    console.error('Error fetching your prefs:', error);
    throw error;
  }
};

const updateUserPref = async (data_source_id: string, user_id: string, data: {
  important_field_name: string;
}) => {
  try {
    return await prisma.userImportantMeasurementPreference.update({
      where: {
        data_source_id_user_id: {
          data_source_id,
          user_id,
        },
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating your prefs:', error);
    throw error;
  }
};

const deleteUserPref = async (data_source_id: string, user_id: string) => {
  try {
    const pref = await prisma.userImportantMeasurementPreference.delete({
      where: {
        data_source_id_user_id: {
          data_source_id,
          user_id,
        },
      },
    });
    return pref;
  } catch (error) {
    console.error('Error deleting your pref:', error);
    throw error;
  }
};

export default {
  createUserPref,
  getUserPrefByID,
  getPrefsByUserId,
  updateUserPref,
  deleteUserPref,

};
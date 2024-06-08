import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserProfile = async (username) => {
  try {
    const userProfileJSON = await AsyncStorage.getItem(username);
    if (userProfileJSON !== null) {
      return JSON.parse(userProfileJSON);
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    throw error;
  }
};

export default getUserProfile;

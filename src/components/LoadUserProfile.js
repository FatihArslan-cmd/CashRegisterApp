import AsyncStorage from '@react-native-async-storage/async-storage';

const loadUserProfile = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    if (!username) {
      throw new Error('No username found');
    }

    const userProfileJSON = await AsyncStorage.getItem(username);
    if (!userProfileJSON) {
      throw new Error('User profile not found');
    }

    return JSON.parse(userProfileJSON);
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

export default loadUserProfile;

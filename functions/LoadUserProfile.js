import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserProfile from './GetUserProfile';

const loadUserProfile = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      const profile = await getUserProfile(username);
      return profile;
    } else {
      throw new Error('No username found');
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

export default loadUserProfile;

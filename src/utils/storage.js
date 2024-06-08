import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  }
  
  
  
  export async function setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item:', error);
      throw error;
    }
  }
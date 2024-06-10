import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(key);
        if (savedValue !== null) {
          setStoredValue(JSON.parse(savedValue));
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      }
    };

    loadStoredValue();
  }, [key]);

  const saveStoredValue = async (value) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  return [storedValue, saveStoredValue];
};

export default useAsyncStorage;

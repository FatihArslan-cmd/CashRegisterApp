import React, { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from React Native
import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../assets/lang/en.json';
import tr from '../assets/lang/tr.json';
import ar from '../assets/lang/ar.json';
import az from '../assets/lang/az.json';
import de from '../assets/lang/de.json';
import el from '../assets/lang/el.json';
import es from '../assets/lang/es.json';
import fr from '../assets/lang/fr.json';
import ru from '../assets/lang/ru.json';
import zh from '../assets/lang/zh.json';

// Load language files into i18next
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    // Available languages
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      ar: { translation: ar },
      az: { translation: az },
      de: { translation: de },
      el: { translation: el },
      es: { translation: es },
      fr: { translation: fr },
      ru: { translation: ru },
      zh: { translation: zh }
    },
    // Set the default language
    lng: Localization.locale || 'en',
    // Enable fallback mechanism
    fallbackLng: 'en',
    // Enable debug mode (optional)
    debug: true,
    // Prevent warning messages when using keys in fallback language
    keySeparator: false,
    // Set interpolation method (optional)
    interpolation: {
      escapeValue: false // To escape HTML entities
    }
  });

// Create language context
const LanguageContext = createContext();

// Create a component containing the function to change language
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(Localization.locale);

  useEffect(() => {
    // Async function to fetch the selected language from local storage
    const fetchSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          setCurrentLanguage(selectedLanguage);
          i18next.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Error fetching selected language:', error);
      }
    };

    fetchSelectedLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    if (lang === currentLanguage) {
      return;
    }
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      i18next.changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error setting selected language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContext;

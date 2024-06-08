import React, { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from '../../assets/lang/en.json';
import tr from '../../assets/lang/tr.json';
import ar from '../../assets/lang/ar.json';
import az from '../../assets/lang/az.json';
import de from '../../assets/lang/de.json';
import el from '../../assets/lang/el.json';
import es from '../../assets/lang/es.json';
import fr from '../../assets/lang/fr.json';
import ru from '../../assets/lang/ru.json';
import zh from '../../assets/lang/zh.json';

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
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
    // Detect the default language from the device
    fallbackLng: 'en',
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

// Create language context
const LanguageContext = createContext();

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

  useEffect(() => {
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

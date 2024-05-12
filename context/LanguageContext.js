import React, { useState, createContext, useContext } from 'react';
import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import dil dosyalarınızı
import en from './en.json';
import tr from './tr.json';

// Dil dosyalarınızı i18next'e yükleme
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    // Kullanılabilir diller
    resources: {
      en: { translation: en },
      tr: { translation: tr }
    },
    // Başlangıç dilini ayarlama
    lng: Localization.locale || 'en',
    // Fallback mekanizmasını etkinleştirme
    fallbackLng: 'en',
    // debug modunu etkinleştirme (isteğe bağlı)
    debug: true,
    // Fallback dilinde belirtilen anahtarlar kullanılırken uyarı mesajlarını engellemek için
    keySeparator: false,
    // Dil dosyası yükleme yöntemini belirleme (isteğe bağlı)
    interpolation: {
      escapeValue: false // HTML öğelerini kapatmak için
    }
  });

// Dil context'i oluşturma
const LanguageContext = createContext();

// Dil değiştirme fonksiyonunu içeren bir bileşen oluşturma
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(Localization.locale);

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContext;
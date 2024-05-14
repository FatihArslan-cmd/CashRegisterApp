import React, { useState, createContext, useContext } from 'react';
import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import dil dosyalarınızı
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

// Dil dosyalarınızı i18next'e yükleme
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    // Kullanılabilir diller
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
    if (lang === currentLanguage) {
      return;
    }
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
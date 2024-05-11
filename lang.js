import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
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
    // Kullanılabilir diller
    resources: {
      en: { translation: en },
      tr: { translation: tr }
    },
    // Başlangıç dilini ayarlama
    lng: Localization.locale,
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

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(Localization.locale);

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18next.t('welcome')} {i18next.t('name')}
      </Text>
      <Text>Current localge: {i18next.language}</Text>
      <Text>Device lotcale: {Localization.getLocales()[0].languageCode}</Text>
      <Button title="Switch Language" onPress={() => changeLanguage(currentLanguage === 'en' ? 'tr' : 'en')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
});

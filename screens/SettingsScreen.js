import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LanguageContext from '../context/LanguageContext'; // Import LanguageContext
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider, Center, Modal, Button, Box } from 'native-base'; // Import required NativeBase components

const buttonImage = require('../assets/planet-earth_921490.png');
const Turkey = require('../assets/turkey.png');
const Spain = require('../assets/spain (1).png');
const UnitedKingdom = require('../assets/united-kingdom.png');
const France = require('../assets/france.png');
const Germany = require('../assets/germany.png');
const Azerbaijan = require('../assets/azerbaijan.png');
const Russia = require('../assets/russia.png');
const China = require('../assets/china.png');
const Arabia = require('../assets/saudi-arabia.png');
const Greece = require('../assets/greece.png');

const LanguageComponent = ({ onPress, image }) => (
  <TouchableOpacity style={{marginHorizontal:10}} onPress={onPress}>
    <Image source={image} style={{ width: 50, height: 50 }} />
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
  };

  const languages = [
    { lang: 'fr', image: France },
    { lang: 'de', image: Germany },
    { lang: 'tr', image: Turkey },
    { lang: 'en', image: UnitedKingdom },
    { lang: 'es', image: Spain },
    { lang: 'ar', image: Arabia },
    { lang: 'zh', image: China },
    { lang: 'az', image: Azerbaijan },
    { lang: 'ru', image: Russia },
    { lang: 'el', image: Greece },
  ];

  return (
    <NativeBaseProvider>
      <Center>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image source={buttonImage} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  size="full"
  _backdrop={{ _dark: { bg: "coolGray.800" }, bg: "warmGray.50" }}
>
  <Modal.Content maxWidth="350" maxH="212">
    <Modal.CloseButton />
    <Modal.Header>{t('languages')}</Modal.Header>
    <Box flexDirection={'column'} marginY={0}>
      {[...Array(Math.ceil(languages.length / 5))].map((_, rowIndex) => (
        <Box key={rowIndex} flexDirection={'row'}>
          {languages.slice(rowIndex * 5, (rowIndex + 1) * 5).map(({ lang, image }) => (
            <LanguageComponent key={lang} onPress={() => handleChangeLanguage(lang)} image={image} />
          ))}
        </Box>
      ))}
    </Box>
    <Modal.Footer>
      <Button.Group space={2}>
        <Button colorScheme="red" onPress={() => setShowModal(false)}>
          {t('Close')}
        </Button>
      </Button.Group>
    </Modal.Footer>
  </Modal.Content>
</Modal>

      </Center>
    </NativeBaseProvider>
  );
};

export default SettingsScreen;

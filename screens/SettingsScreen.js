import React from 'react';
import { View, StyleSheet } from 'react-native';
import LanguageButton from '../functions/LanguageButton';
import ShareEg from '../functions/ShareButton';
import ContactMe from '../functions/ContactButton'; 
import { Box,NativeBaseProvider } from 'native-base';
import OnlineStatusToggle from '../functions/OnlineStatusToggle';
import DarkThemeButton from '../functions/DarkThemeButton';
const SettingsScreen = () => {
  return (
    <NativeBaseProvider>
    <Box flexDirection={'row'}>
    <ShareEg/>
    <LanguageButton/>
    <ContactMe/>
    <OnlineStatusToggle/>
    <DarkThemeButton/>
    </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 20,
  },
});

export default SettingsScreen;

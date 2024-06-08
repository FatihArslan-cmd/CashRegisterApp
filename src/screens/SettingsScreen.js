import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import LanguageButton from '../components/LanguageButton';
import ShareEg from '../components/ShareButton';
import ContactMe from '../components/ContactButton';
import {  NativeBaseProvider } from 'native-base';
import OnlineStatusToggle from '../components/OnlineStatusToggle';
import DarkThemeButton from '../components/DarkThemeButton';
import OnlineStatusInformer from '../components/OnlineStatusInformer';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <NativeBaseProvider>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.row}>
          <DarkThemeButton />
          <ContactMe />
        </View>
        <View style={styles.row}>
          <ShareEg />
          <LanguageButton />
        </View>
        <OnlineStatusToggle />
        <OnlineStatusInformer />
      </View>
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
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});

export default SettingsScreen;
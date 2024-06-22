import React, { useContext } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import LanguageButton from './LanguageButton';
import ShareEg from './ShareButton';
import ContactMe from './ContactButton';
import {  NativeBaseProvider } from 'native-base';
import OnlineStatusToggle from './OnlineStatusToggle';
import DarkThemeButton from './DarkThemeButton';
import OnlineStatusInformer from '../../components/OnlineStatusInformer';
import { ThemeContext } from '../../context/ThemeContext';

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

      <View style={styles.ImageContainer}>
      <Image
        style={styles.image}
        source={require("../../../assets/image/ayı.png")}
      />
      </View>
      </View>

    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  ImageContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    width: 200,
    height: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});

export default SettingsScreen;

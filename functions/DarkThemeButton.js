// MainScreen.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const DarkThemeButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Uygulama Tema Değişimi</Text>
      <Button title="Tema Değiştir" onPress={toggleTheme} />
    </View>
  );
};

export default DarkThemeButton;

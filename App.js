import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import MainDrawer from './src/navigation/DrawerNavigation';
import { OnlineStatusProvider } from './src/context/OnlineStatusContext';
import { LanguageProvider } from './src/context/LanguageContext'; 
import { ThemeProvider } from './src/context/ThemeContext';
import { ProductProvider } from './src/context/ProductContext';
import { LogBox } from 'react-native';
export default function App() {
  const userLoggedIn = false;
  LogBox.ignoreAllLogs();

  return (
    <ProductProvider>
    <ThemeProvider>
    <OnlineStatusProvider>
      <NavigationContainer>
        <LanguageProvider>
          {userLoggedIn ? <MainDrawer /> : <AuthStack />}
        </LanguageProvider>
      </NavigationContainer>
    </OnlineStatusProvider>
    </ThemeProvider>
    </ProductProvider>
  );
}

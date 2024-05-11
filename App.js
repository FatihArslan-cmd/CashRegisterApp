import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainDrawer from './DrawerNavigation';
import { OnlineStatusProvider } from './context/OnlineStatusContext';
import LanguageContext, { LanguageProvider } from './context/LanguageContext'; 
export default function App() {
  const userLoggedIn = false;
  
  return (
    <OnlineStatusProvider>
      <NavigationContainer>
        <LanguageProvider>
          {userLoggedIn ? <MainDrawer /> : <AuthStack />}
        </LanguageProvider>
      </NavigationContainer>
    </OnlineStatusProvider>
  );
}

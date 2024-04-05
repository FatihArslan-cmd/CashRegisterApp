import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoaderProvider } from './context/LoaderContext';
import AppLoader from './functions/AppLoader';
import AuthStack from './AuthStack';
import MainDrawer from './DrawerNavigation';
import { OnlineStatusProvider } from './context/OnlineStatusContext';
export default function App() {
  
  const userLoggedIn = false; 
  return (
    <OnlineStatusProvider>
      <NavigationContainer>
        {userLoggedIn ? <MainDrawer /> : <AuthStack />}
      </NavigationContainer>
      </OnlineStatusProvider>
  );
}

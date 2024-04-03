import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoaderProvider } from './context/LoaderContext';
import AppLoader from './functions/AppLoader';
import AuthStack from './AuthStack';
import MainDrawer from './DrawerNavigation';

export default function App() {
  
  const userLoggedIn = false; 
  return (
    <LoaderProvider>
      <NavigationContainer>
        {userLoggedIn ? <MainDrawer /> : <AuthStack />}
        <AppLoader />
      </NavigationContainer>
    </LoaderProvider>
  );
}

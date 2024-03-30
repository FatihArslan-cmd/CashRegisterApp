import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoaderProvider } from './context/LoaderContext'; // LoaderProvider'ı ekledik
import AppLoader from './functions/AppLoader'; // AppLoader bileşenini ekledik
import HomeScreen from './screens/HomeScreen';
import Application from './screens/Application';
import FingerprintScreen from './screens/FingerPrint';
import FaceIDScreen from './screens/FaceId';
import SettingsScreen from './screens/SettingsScreen';
import SignUpScreen from './screens/SignUpScreen';
import Swiper5 from './screens/LoginMethodsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoaderProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Application"
            component={Application}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Finger"
            component={FingerprintScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Face"
            component={FaceIDScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="LoginMethods"
            component={Swiper5}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <AppLoader /> 
      </NavigationContainer>
    </LoaderProvider>
  );
}

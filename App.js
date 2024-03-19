import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Application from './screens/Application';
import FingerprintScreen from './screens/FingerPrint';
import FaceIDScreen from './screens/FaceId';
import Swiper5 from './screens/LoginMethods';
import RegisterScreen from './screens/RegisterScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

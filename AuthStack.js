import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FingerprintScreen from './screens/FingerPrint';
import FaceIDScreen from './screens/FaceId';
import SignUpScreen from './screens/SignUpScreen';
import Swiper5 from './screens/LoginMethodsScreen';
import MainDrawer from './DrawerNavigation';
const Stack = createStackNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
        name="MainDrawer"
        component={MainDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoaderProvider } from './context/LoaderContext';
import AppLoader from './functions/AppLoader';
import HomeScreen from './screens/HomeScreen';
import FingerprintScreen from './screens/FingerPrint';
import FaceIDScreen from './screens/FaceId';
import SignUpScreen from './screens/SignUpScreen';
import Swiper5 from './screens/LoginMethodsScreen';
import MenuScreen from './screens/MenuScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
    </Stack.Navigator>
  );
};

const MainDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const userLoggedIn = true; // Örnek olarak kullanıcı oturum açmış gibi varsayalım, gerçek bir duruma göre bu değişkeni ayarlayın
  return (
    <LoaderProvider>
      <NavigationContainer>
        {userLoggedIn ? <MainDrawer /> : <AuthStack />}
        <AppLoader />
      </NavigationContainer>
    </LoaderProvider>
  );
}

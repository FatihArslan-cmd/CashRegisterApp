import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FingerprintScreen from '../screens/FingerPrint';
import HomeScreen from '../screens/HomeScreen';
import FaceIDScreen from '../screens/FaceId';
import SignUpScreen from '../screens/SignUpScreen';
import Swiper5 from '../screens/LoginMethodsScreen';
import MainDrawer from './DrawerNavigation';
import Application from '../screens/menu/SalesScreen';
import SeeProductScreen from '../screens/menu/SeeProductsScreen/SeeProductsScreen';
import FavoriteProductsScreen from '../screens/menu/DirectProductEntryScreen';
import CalculatorApp from '../components/NumberButtons';
import CollectionsScreen from '../screens/menu/CollectionsScreen';
import ReportsScreen from '../screens/menu/ReportsScreen';
import Barcode from '../screens/BarCode';
import BarcodeScanner from '../screens/menu/BarcodeScanner';
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
        name="BarcodeScreen"
        component={BarcodeScanner}
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
        name="Collections"
        component={CollectionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Barcode"
        component={Barcode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Application"
        component={Application}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculatorApp"
        component={CalculatorApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DirectProductEntry"
        component={FavoriteProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeeProducts"
        component={SeeProductScreen}
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
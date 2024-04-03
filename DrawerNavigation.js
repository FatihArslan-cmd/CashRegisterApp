import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuScreen from './screens/MenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './Navigations/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
   
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Menu" component={MenuScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
   
  );
};

export default MainDrawer;

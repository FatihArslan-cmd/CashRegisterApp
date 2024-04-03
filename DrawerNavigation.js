import React, { useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import MenuScreen from './screens/MenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import BackPressHandle from './functions/HandleBackPress';
const Drawer = createDrawerNavigator();



const MainDrawer = () => {

  <BackPressHandle/>

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

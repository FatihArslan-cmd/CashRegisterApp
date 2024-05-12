import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next'; // Dil çevirisi için
import MenuScreen from './screens/MenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './Navigations/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const { t } = useTranslation(); // Dil çevirisi için kullanım

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={t('Menu')} component={MenuScreen} />
      <Drawer.Screen name={t('Settings')} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

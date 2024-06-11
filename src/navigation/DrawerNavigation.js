import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next'; // For language translation
import MenuScreen from '../screens/menu/MenuScreen/MenuScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import CustomDrawerContent from '../screens/menu/CustomDrawer/CustomDrawerContent';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const { t } = useTranslation(); // Usage for language translation
  const { isDarkMode } = useContext(ThemeContext);

    const headerStyle = {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', // Dark mode background
      };
    
      const headerTintColor = isDarkMode ? '#FFFFFF' : '#000000'; 
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen 
         name={t('Menu')}
        component={MenuScreen} 
        options={{
          title: t('Menu'),
          headerStyle: headerStyle,
          headerTintColor: headerTintColor
        }}
      />
      <Drawer.Screen 
        name={t('Settings')}
        component={SettingsScreen}
        options={{
          title: t('Settings'),
          headerStyle: headerStyle,
          headerTintColor: headerTintColor
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

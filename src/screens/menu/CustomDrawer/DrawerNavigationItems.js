import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const DrawerNavigationItems = ({ navigation, isDarkMode }) => {
  const { t } = useTranslation();

//style of menu setting buttons in drawer

  return (
    <View style={isDarkMode ? styles.darkDrawerSection : styles.drawerSection}>
      <DrawerItem
        label={t('Menu')}
        icon={({ color, size }) => <AntDesign name="menu-fold" size={size} color={isDarkMode ? 'white' : color} />}
        labelStyle={isDarkMode && styles.darkText}
        onPress={() => navigation.navigate(t('Menu'))}
      />
      <DrawerItem
        label={t('Settings')}
        icon={({ color, size }) => <AntDesign name="setting" size={size} color={isDarkMode ? 'white' : color} />}
        labelStyle={isDarkMode && styles.darkText}
        onPress={() => navigation.navigate(t('Settings'))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  darkDrawerSection: {
    borderColor: '#333',
  },
  darkText: {
    color: 'white',
  },
});

export default DrawerNavigationItems;

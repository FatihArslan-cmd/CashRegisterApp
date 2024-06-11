import React, { useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import MenuList from './MenuList'; // MenuList bileşeninin yolu

const MenuScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const menuItems = [
    { icon: 'shopping-cart', color: 'black', label: t('sales'), navigation: 'Application' },
    { icon: 'money', color: 'green', label: t('products'), navigation: 'SeeProducts' },
    { icon: 'file-text-o', color: 'gray', label: t('reports'), navigation: 'Reports' },
    { icon: 'credit-card', color: 'orange', label: t('collections'), navigation: 'Collections' },
    { icon: 'ellipsis-h', color: 'black', label: t('otheroperations') },
    { icon: 'undo', color: 'red', label: t('refund') },
    { icon: 'plus-square', color: 'blue', label: t('productentry') },
    { icon: 'external-link', color: 'black', label: 'www', url: 'https://32bit.com.tr/' },
  ];

  const handleItemPress = (item) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.navigation) {
      navigation.navigate(item.navigation);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <MenuList
        menuItems={menuItems}
        handleItemPress={handleItemPress}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
  },
});

export default MenuScreen;

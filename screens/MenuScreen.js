import { React, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../functions/CustomText'; // Burada CustomText bileşenini import ediyoruz.
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

const MenuScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const { t } = useTranslation();
  const menuItems = [
    { icon: 'shopping-cart', color: 'black', label: t('sales'), navigation: 'Application' },
    { icon: 'money', color: 'green', label: t('products'), navigation: 'SeeProducts' },
    { icon: 'file-text-o', color: 'gray', label: t('reports'), navigation: 'Reports' },
    { icon: 'credit-card', color: 'orange', label: t('collections'), navigation: 'Collections' },
    { icon: 'ellipsis-h', color: 'black', label: t('otheroperations') },
    { icon: 'undo', color: 'red', label: t('refund') },
    { icon: 'plus-square', color: 'blue', label: t('productentry'), navigation: 'DirectProductEntry' },
    { icon: 'external-link', color: 'black', label: 'www', url: 'https://32bit.com.tr/' }, // Add URL to www item
  ];
  const navigation = useNavigation();

  const handle32bit = (item) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (!item.navigation) {
      // Do nothing for buttons without navigation defined
    } else {
      navigation.navigate(item.navigation);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Animatable.View
        animation="fadeInUp"
        delay={250}
        useNativeDriver
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.buttonContainer, { borderColor: item.color }]}
            onPress={() => handle32bit(item)}
          >
            <Icon name={item.icon} size={24} color={item.color} />
            <CustomText style={styles.buttonText}>{item.label}</CustomText>
          </TouchableOpacity>
        ))}
      </Animatable.View>
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
    margin: 30,
  },
  darkContainer: {
    backgroundColor: 'black', // Background color when dark mode is enabled
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    width: 250,
    margin: 15,
    height: 40
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default MenuScreen;
